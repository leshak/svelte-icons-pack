import cheerio from "cheerio";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import rimraf from "rimraf";
import { stringify } from "javascript-stringify";
import { promisify } from "util";
import iconManifest from "../manifest.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// папка для сохранения .svelte файлов
const outDir = path.resolve(__dirname, "../");
const manifestFile = path.resolve(outDir, "manifest.js");
const gitignoreFile = path.resolve(outDir, ".gitignore");
const tsconfigFile = path.resolve(outDir, "tsconfig.json");
const tsIndexFile = path.resolve(outDir, "index.ts");

const manifestInfo = {};

const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);
const appendFile = promisify(fs.appendFile);
const rimrafFolder = promisify(rimraf);

function capitalizeFirstLetter(_string) {
  const fixName = {
    filled: "fill",
    outlined: "outline",
    regular: "",
    logos: "logo",
  };
  const string = fixName[_string] !== undefined ? fixName[_string] : _string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function loadSvgFilesList({ svgPath, prefix }, iconPack) {
  const list = await readdir(svgPath);
  const outList = [];

  for (const f of list) {
    const [_fileName, fileExt] = f.split(".");
    if (fileExt && fileExt.toLowerCase() === "svg") {
      let fileName = _fileName;
      if (
        Array.isArray(iconPack.removeFilePrefixes) &&
        iconPack.removeFilePrefixes.length > 0
      ) {
        for (const pfix of iconPack.removeFilePrefixes) {
          if (pfix && fileName.indexOf(pfix) === 0) {
            fileName = fileName.substring(pfix.length);
          }
        }
      }

      if (iconPack.removeFirtsCharsFromFile > 0) {
        fileName = fileName.substring(iconPack.removeFirtsCharsFromFile);
      }

      outList.push({
        filePath: path.resolve(svgPath, f),
        svgName:
          prefix +
          fileName
            .split("-")
            .map((x) => capitalizeFirstLetter(x))
            .join(""),
      });
    }
  }

  return outList;
}

function filterFolders(dir) {
  if ([".DS_Store"].includes(dir)) return false;
  return true;
}

function filterAttr(attr) {
  if (["p-id", "t", "style", "id"].includes(attr)) return false;
  return true;
}

function tagTreeToString(tagData) {
  if (["defs"].includes(tagData.tag)) return "";

  return `<${tagData.tag}${Object.keys(tagData.attr)
    .filter(filterAttr)
    .map((k) => ` ${k}="${tagData.attr[k]}"`)
    .join("")}>${(tagData.child || [])
    .map((t) => tagTreeToString(t))
    .filter((x) => !!x)
    .join("\n")}</${tagData.tag}>`;
}

function generateSvgIconInfo(fileName, iconData) {
  const comressed = {
    a: iconData.attr,
    c: (iconData.child || [])
      .map((t) => tagTreeToString(t))
      .filter((x) => !!x)
      .join(""),
  };
  return `// ${fileName}\nexport default ${stringify(comressed, null, 2)};`;
}

async function convertIconData(svg, multiColor) {
  const $svg = cheerio.load(svg, { xmlMode: true })("svg");

  // filter/convert attributes
  // 1. remove class attr
  // 2. convert to camelcase ex: fill-opacity => fillOpacity
  const attrConverter = (
    /** @type {{[key: string]: string}} */ attribs,
    /** @type string */ tagName
  ) =>
    attribs &&
    Object.keys(attribs)
      .filter(
        (name) =>
          ![
            "class",
            ...(tagName === "svg"
              ? ["xmlns", "xmlns:xlink", "xml:space", "width", "height"]
              : []), // if tagName is svg remove size attributes
          ].includes(name)
      )
      .reduce((obj, name) => {
        const newName = name; //camelcase(name);
        switch (newName) {
          case "fill":
            if (
              attribs[name] === "none" ||
              attribs[name] === "currentColor" ||
              multiColor
            ) {
              obj[newName] = attribs[name];
            }
            break;
          default:
            obj[newName] = attribs[name];
            break;
        }
        return obj;
      }, {});

  // convert to [ { tag: 'path', attr: { d: 'M436 160c6.6 ...', ... }, child: { ... } } ]
  const elementToTree = (/** @type {Cheerio} */ element) =>
    element
      .filter((_, e) => e.tagName && !["style"].includes(e.tagName))
      .map((_, e) => ({
        tag: e.tagName,
        attr: attrConverter(e.attribs, e.tagName),
        child:
          e.children && e.children.length
            ? elementToTree(cheerio(e.children))
            : undefined,
      }))
      .get();

  const tree = elementToTree($svg);
  return tree[0]; // like: [ { tag: 'path', attr: { d: 'M436 160c6.6 ...', ... }, child: { ... } } ]
}

async function generateSvg(iconPack, svgItem) {
  const svgStr = await promisify(fs.readFile)(svgItem.filePath, "utf8");
  const iconData = await convertIconData(svgStr, true);
  return iconData;
}

async function loadPack(iconPack) {
  console.log(" ...load:", iconPack.packName);
  console.log(" ...create folder:", iconPack.shortName);

  appendFile(gitignoreFile, `${iconPack.shortName}\n`);

  manifestInfo[iconPack.shortName] = {
    iconsList: [],
    name: iconPack.packName,
    path: iconPack.shortName,
    license: iconPack.license,
    sourceUrl: iconPack.url,
  };

  const packFolder = path.resolve(outDir, iconPack.shortName);
  await mkdir(packFolder);

  const baseFolder = path.resolve(__dirname, "../", iconPack.iconsPath);

  const folders = [];
  if (iconPack.subFolders) {
    // load subfolders
    const list = await readdir(baseFolder);
    for (const li of list.filter(filterFolders)) {
      folders.push({
        prefix:
          capitalizeFirstLetter(
            iconPack.removeMainPrefix ? "" : iconPack.shortName
          ) + capitalizeFirstLetter(li.toLowerCase()),
        svgPath: path.resolve(baseFolder, li),
      });
    }
  } else {
    folders.push({
      prefix: capitalizeFirstLetter(
        iconPack.removeMainPrefix ? "" : iconPack.shortName
      ),
      svgPath: baseFolder,
    });
  }

  console.log(` ...generate svelte components for: "${iconPack.packName}"`);

  // const svgIndexFile = path.resolve(packFolder, "index.js");
  // console.log(" ...file: ", svgIndexFile);

  for (const item of folders) {
    const svgList = await loadSvgFilesList(item, iconPack);

    for (const svgFile of svgList) {
      manifestInfo[iconPack.shortName].iconsList.push(svgFile.svgName);

      const iconData = await generateSvg(iconPack, svgFile);
      const svgAsJs = generateSvgIconInfo(svgFile.svgName, iconData);

      writeFile(path.resolve(packFolder, `${svgFile.svgName}.js`), svgAsJs);

      await appendFile(
        manifestFile,
        `import ${svgFile.svgName} from './${iconPack.shortName}/${svgFile.svgName}';\n`
      );
    }
  }
}

async function init() {
  // manifest.js
  writeFile(manifestFile, "// manifest.js file\n");

  // .gitignore
  writeFile(
    gitignoreFile,
    "node_modules\n.vscode\n.DS_Store\n*.log\n\n# Icons\nIcon.svelte\nmanifest.js\n\n# Packs\n"
  );

  // clean folders from manifest
  console.log("Clean icons pack folders");
  for (const iconPack of iconManifest) {
    console.log(" ...remove:", iconPack.shortName);
    await rimrafFolder(iconPack.shortName);
  }
}

async function generateSvelteIconComponent() {
  writeFile(
    path.resolve(outDir, "Icon.svelte"),
    `<script>
export let src;
export let size = "1em";
export let color = undefined;
export let title = undefined;
export let className = "";

let innerHtml;
let attr;
$: {
  attr = {};
  if (color) {
    if (src.a.stroke !== "none") {
      attr.stroke = color;
    }
    if (src.a.fill !== "none") {
      attr.fill = color;
    }
  }
}

$: {
  innerHtml = (title ? \`<title>\${title}</title>\` : "") + src.c;
}
</script>

<svg
width={size}
height={size}
stroke-width="0"
class={className}
{...src.a}
{...attr}
xmlns="http://www.w3.org/2000/svg">
{@html innerHtml}
</svg>
`
  );
}
//   stroke={color || 'currentColor'} fill={color || 'currentColor'}

async function generateIconsManifest() {
  await appendFile(manifestFile, "\n\nexport default [\n");

  for (const pk of Object.keys(manifestInfo)) {
    const pack = manifestInfo[pk];
    await appendFile(manifestFile, "  {\n");

    for (const prop of Object.keys(pack)) {
      if (prop === "iconsList") {
        await appendFile(
          manifestFile,
          `    icons: {${pack.iconsList.join(", ")}},\n`
        );
      } else {
        await appendFile(manifestFile, `    ${prop}: '${pack[prop]}',\n`);
      }
    }

    await appendFile(manifestFile, "  },\n");
  }

  await appendFile(manifestFile, "];\n");
}

async function generateTSConfig() {
  console.log("Generating tsconfig.json ...");
  const paths = Object.values(manifestInfo).map(pack => `"./${pack.path}/*.js"`).join(", ");
  writeFile(tsconfigFile,
    `{
  "include": [${paths}],
  "exclude": ["./im/ImPagebreak.js"],
  "compilerOptions": {
    "allowJs": true,
    "declaration": true,
    "emitDeclarationOnly": true,
  }
}
`
  );
}

async function generateIndexFiles() {
  console.log("Generating index.ts ...");
  await writeFile(
    tsIndexFile,
    `
export { default as Icon } from "./Icon.svelte";
`
  );
  for (const pack of Object.values(manifestInfo)) {
    for (const iconName of pack.iconsList) {
      await appendFile(
        tsIndexFile,
        `export { default as ${iconName} } from "./${pack.path}/${iconName}";\n`
      );
    }
  }
}

async function main() {
  console.log("Init...");
  await init();

  console.log("Start loading SVG icons...");
  for (const iconPack of iconManifest.sort((x1, x2) => {
    if (x1.packName > x2.packName) return 1;
    if (x1.packName < x2.packName) return -1;
    return 0;
  })) {
    await loadPack(iconPack);
  }

  await generateIconsManifest();
  await generateSvelteIconComponent();
  await generateTSConfig();
  await generateIndexFiles();

  console.log("Done!");
}
main();

const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const camelcase = require("camelcase");
const rimraf = require("rimraf");
const { stringify } = require("javascript-stringify");
const { promisify } = require("util");

const iconManifest = require("../manifest.json");

// папка для сохранения .svelte файлов
const outDir = path.resolve(__dirname, "../");

const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);
const copyFile = promisify(fs.copyFile);
const appendFile = promisify(fs.appendFile);
const rimrafFolder = promisify(rimraf);

function capitalizeFirstLetter(_string) {
  const fixName = {
    filled: "fill",
    outlined: "outline",
  };
  const string = fixName[_string] || _string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function loadSvgFilesList({ svgPath, prefix }) {
  const list = await readdir(svgPath);
  const outList = [];

  for (const f of list) {
    const fp = f.split(".");
    if (fp.length === 2 && fp[1].toLowerCase() === "svg") {
      outList.push({
        filePath: path.resolve(svgPath, f),
        svgName:
          prefix +
          fp[0]
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

  console.log(` ...generate svelte componets for: "${iconPack.packName}"`);

  // const svgIndexFile = path.resolve(packFolder, "index.js");
  // console.log(" ...file: ", svgIndexFile);

  const iconsList = [];
  for (const item of folders) {
    const svgList = await loadSvgFilesList(item);

    for (const svgFile of svgList) {
      iconsList.push(svgFile.svgName);

      const iconData = await generateSvg(iconPack, svgFile);
      const svgAsJs = generateSvgIconInfo(svgFile.svgName, iconData);

      writeFile(path.resolve(packFolder, `${svgFile.svgName}.js`), svgAsJs);

      // appendFile(svgIndexFile, svgAsJs);
      // appendFile(svgIndexFile, "\n\n");
    }
  }

  // appendFile(svgIndexFile, `module.exports = {${iconsList.join(", ")}}`);
}

async function init() {
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
  export let className = '';
</script>

<svg
  width={size}
  height={size}
  stroke-width="0"
  class={className}
  {...src.a, ...attr}
  xmlns="http://www.w3.org/2000/svg">
  {#if title}
    <title>{title}</title>
  {/if}
  <g stroke={color || 'currentColor'} fill={color || 'currentColor'}>
    {@html src.c}
  </g>
</svg>`
  );
}

async function main() {
  console.log("Init...");
  await init();

  console.log("Start loading SVG icons...");
  for (const iconPack of iconManifest) {
    await loadPack(iconPack);
  }

  await generateSvelteIconComponent();

  console.log("Done!");
}
main();

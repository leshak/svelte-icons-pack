const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const camelcase = require("camelcase");
const { promisify } = require("util");

const iconManifest = require("../manifest.json");

// папка для сохранения .svelte файлов
const outDir = path.resolve(__dirname, "../dist");

const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);
const copyFile = promisify(fs.copyFile);
const appendFile = promisify(fs.appendFile);

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

function filterAttr(attr) {
  if (["p-id", "t"].includes(attr)) return false;
  return true;
}

function tagTreeToString(tagData, prefixSize = 4) {
  if (["defs"].includes(tagData.tag)) return "";

  return `${" ".repeat(prefixSize)}<${tagData.tag}${Object.keys(tagData.attr)
    .filter(filterAttr)
    .map((k) => ` ${k}="${tagData.attr[k]}"`)
    .join("")}>${(tagData.child || [])
    .map((t) => tagTreeToString(t, prefixSize * 2))
    .filter((x) => !!x)
    .join("\n")}</${tagData.tag}>`;
}

async function generateSvelteComponent(fileName, iconData) {
  if (iconData.tag !== "svg") return null;

  return `<script>
  // ${fileName}
  export let color;
  export let className;
  export let size = "1em";
  export let attr;
  export let title;
</script>

<svg
  stroke={color || 'currentColor'}
  fill={color || 'currentColor'}
  stroke-width="0"
  width="{size}"
  height="{size}"
  class="{className}"
  ${Object.keys(iconData.attr)
    .filter(filterAttr)
    .map((k) => `${k}="${iconData.attr[k]}"`)
    .join(" ")} xmlns="http://www.w3.org/2000/svg" {...attr}>
    {#if title}<title>{title}</title>{/if}
${iconData.child
  .map((t) => tagTreeToString(t))
  .filter((x) => !!x)
  .join("\n")}
</svg>
  `;
}

async function generateSvelteFile(outDir, fileName, iconData) {
  const fileText = await generateSvelteComponent(fileName, iconData);
  await writeFile(path.resolve(outDir, `${fileName}.svelte`), fileText);
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
  console.log(baseFolder);

  const folders = [];
  if (iconPack.subFolders) {
    // load subfolders
    const list = await readdir(baseFolder);
    for (const li of list) {
      folders.push({
        prefix:
          capitalizeFirstLetter(iconPack.shortName) +
          capitalizeFirstLetter(li.toLowerCase()),
        svgPath: path.resolve(baseFolder, li),
      });
    }
  } else {
    folders.push({
      prefix: capitalizeFirstLetter(iconPack.shortName),
      svgPath: baseFolder,
    });
  }

  for (const item of folders) {
    const svgList = await loadSvgFilesList(item);
    // console.log(svgList);
    for (const svgFile of svgList) {
      const iconData = await generateSvg(iconPack, svgFile);
      await generateSvelteFile(packFolder, svgFile.svgName, iconData);
    }
  }
}

async function init() {
  await mkdir(outDir);
}

async function main() {
  console.log("Init...");
  await init();

  console.log("Start loading SVG icons...");
  for (const iconPack of iconManifest) {
    await loadPack(iconPack);
  }
}
main();

import { mkdir } from 'node:fs/promises';

import { FileSink } from 'bun';
import { stringify } from 'javascript-stringify';

import { SvgPart } from './types';

const DEFAULT_PACK = {
	sideEffects: false,
	module: './index.js',
};

export const generateIconLib = async (manifestFile: FileSink, work: SvgPart) => {
	// create folder
	await mkdir(`src/lib/${work.source.shortName}`, { recursive: true });

	// package.json
	await Bun.write(
		`src/lib/${work.source.shortName}/package.json`,
		JSON.stringify(DEFAULT_PACK, null, 2),
	);

	// TS file
	const file = Bun.file(`src/lib/${work.source.shortName}/index.ts`);
	const indexFile = file.writer();

	// index header
	createIndexHeader(indexFile, work);

	// icons
	const iconNamesList: string[] = [];
	for (const icon of work.icons) {
		if (!icon.svgObject) continue;
		indexFile.write(`export const ${icon.iconName}: IconType = ${stringify(icon.svgObject)};\n`);
		iconNamesList.push(icon.iconName);
	}
	work.inamesList = iconNamesList.sort();

	// add manifest
	manifestFile.write(
		`import { ${work.inamesList.join(', ')} } from './lib/${work.source.shortName}/index.js';\n`,
	);

	// close file
	await indexFile.end();
};

const createIndexHeader = (indexFile: FileSink, work: SvgPart) => {
	indexFile.write('// THIS FILE IS AUTO GENERATED\n');
	indexFile.write(`// ${work.source.packName}\n`);
	indexFile.write(`import type { IconType } from '../index.js';`);
};

export const createManifestFile = async () => {
	const file = Bun.file('src/manifest.ts');
	const manifestFile = file.writer();
	manifestFile.write('// THIS FILE IS AUTO GENERATED\n');
	manifestFile.write('// manifest.js file\n');
	manifestFile.write(`import type { IconType } from './lib/index.js';\n\n`);
	return manifestFile;
};

export const generateManifestSummaryAndClose = async (
	manifestFile: FileSink,
	worksList: SvgPart[],
) => {
	manifestFile.write(`
export type IconRec = {
	n: string;
	i: IconType;
	p?: string;
};

export type ManifestItem = {
	// icons: Record<string, IconType>;
	icons: IconRec[];
	name: string;
	path: string;
	version?: string;
	license: string;
	sourceUrl: string;
};\n`);

	manifestFile.write(`\nexport const manifest: ManifestItem[] = [\n`);

	for (const work of worksList) {
		manifestFile.write(`  {\n`);
		manifestFile.write(
			`    icons: [ ${work.inamesList.map((name) => `{n: '${name}', i: ${name}}`).join(', ')} ],\n`,
		);
		manifestFile.write(`    name: '${work.source.packName}',\n`);
		manifestFile.write(`    path: '${work.source.shortName}',\n`);
		if (work.source.version) manifestFile.write(`    version: '${work.source.version}',\n`);
		manifestFile.write(`    license: '${work.source.license}',\n`);
		manifestFile.write(`    sourceUrl: '${work.source.url}',\n`);
		manifestFile.write(`  },\n`);
	}

	manifestFile.write(`];\n`);
	manifestFile.end();
};

export const generateGitignore = async (worksList: SvgPart[]) => {
	const file = Bun.file('./scripts/templates/gitignore');
	let gitignore = await file.text();

	gitignore += '\n// THIS PART IS AUTO GENERATED\n';
	gitignore += worksList.map((w) => `src/lib/${w.source.shortName}/**`).join('\n');
	gitignore += '\n';

	await Bun.write('./.gitignore', gitignore);
};

export const updatePackageJson = async (worksList: SvgPart[]) => {
	const file = Bun.file('./package.json');
	const packageJson = await file.json();

	packageJson.exports = {
		'.': {
			types: './dist/index.d.ts',
			svelte: './dist/index.js',
		},
	};

	for (const work of worksList) {
		packageJson.exports[`./${work.source.shortName}`] = {
			types: `./dist/${work.source.shortName}/index.d.ts`,
			svelte: `./dist/${work.source.shortName}/index.js`,
		};
	}

	await Bun.write('./package.json', JSON.stringify(packageJson, null, 2));
};

export const generateReadme = async (worksList: SvgPart[]) => {
	const file = Bun.file('./scripts/templates/README.md');
	let readme = await file.text();

	let packsTable = '';
	for (const work of worksList) {
		packsTable += `| [${work.source.packName}](${work.source.url}) | [${work.source.license}](${work.source.licenseUrl}) | ${work.source.version || ''} | ${work.icons.length} | \n`;
	}

	readme = readme.replace(/####ICONS-PACKS-TABLE####/g, packsTable);
	await Bun.write('./README.md', readme);
};

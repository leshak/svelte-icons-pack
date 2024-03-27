import color from 'chalk';
import { rimraf } from 'rimraf';

import iconsSources from '../manifest.json';
import {
	createManifestFile,
	generateGitignore,
	generateIconLib,
	generateManifestSummaryAndClose,
	generateReadme,
	updatePackageJson,
} from './generator';
import { loadFilesList } from './scan-files';
import { loadSvgAndDecode } from './svg-decode';
import { log } from './utils';

async function main() {
	console.clear();
	log(color.green('Building icons...\n\n'));

	// sort sources
	const sortedSources = iconsSources.sort((a, b) => {
		if (a.packName < b.packName) return -1;
		if (a.packName > b.packName) return 1;
		return 0;
	});

	log(color.white(`  ${color.gray('┌')} Loading files list...\n`));
	log(color.white(`  ${color.gray('│')}\n`));
	const worksList = await loadFilesList(sortedSources);

	log(color.white(`  ${color.gray('│')}\n`));
	log(color.white(`  ${color.gray('│')}\n`));

	log(color.white(`  ${color.gray('├')} Loading svg files...\n`));
	log(color.white(`  ${color.gray('│')}\n`));
	for (const work of worksList) {
		log(color.gray(`  ├─ ${color.yellow(work.source.shortName)}: [${work.source.packName}]\n`));
		await loadSvgAndDecode(work);
	}

	log(color.white(`  ${color.gray('│')}\n`));
	log(color.white(`  ${color.gray('│')}\n`));

	log(color.white(`  ${color.gray('├')} Cleaning...\n`));
	log(color.white(`  ${color.gray('│')}\n`));

	for (const work of worksList) {
		await rimraf(`src/lib/${work.source.shortName}`);
	}
	await rimraf(`src/manifest.ts`);

	log(color.white(`  ${color.gray('├')} Generating...\n`));
	log(color.white(`  ${color.gray('│')}\n`));

	// create manifest file
	const manifestFile = await createManifestFile();
	for (const work of worksList) {
		log(color.gray(`  ├─ ${color.yellow(work.source.shortName)}: [${work.source.packName}]\n`));
		await generateIconLib(manifestFile, work);
	}
	// close manifest file
	await generateManifestSummaryAndClose(manifestFile, worksList);

	log(color.white(`  ${color.gray('│')}\n`));
	log(color.white(`  ${color.gray('│')}\n`));

	// fix gitignore
	log(color.white(`  ${color.gray('├')} .gitignore\n`));
	log(color.white(`  ${color.gray('│')}\n`));
	await generateGitignore(worksList);

	// generate readme.md
	log(color.white(`  ${color.gray('├')} README.md\n`));
	log(color.white(`  ${color.gray('│')}\n`));
	await generateReadme(worksList);

	// update package.json
	log(color.white(`  ${color.gray('└')} package.json\n`));
	await updatePackageJson(worksList);
}

main();

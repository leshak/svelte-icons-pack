import { readdir } from 'node:fs/promises';

import color from 'chalk';

import { IconSource, SvgIcon, SvgPart } from './types';
import { log } from './utils';

export const loadFilesList = async (iconsSources: IconSource[]): Promise<SvgPart[]> => {
	const result: SvgPart[] = [];
	for (let i = 0; i < iconsSources.length; i++) {
		const isrc = iconsSources[i];
		if (isrc.skip) continue;

		log(
			color.gray(
				`  ├─ ${color.yellow(isrc.shortName)}: ${color.white(isrc.packName)} [${isrc.iconsPath}]\n`,
			),
		);

		const svgPart = await loadFileList(isrc);
		if (svgPart !== null) {
			log(color.gray(`  │   └─ found: ${color.green(svgPart.icons.length)} svgs\n`));
			if (i !== iconsSources.length - 1) log(color.gray(`  │\n`));

			// clean abd rename icons names
			svgPart.icons = cleanAndRenameIcons(isrc, svgPart.icons);

			// save
			result.push(svgPart);
		}
	}
	return result;
};

const cleanAndRenameIcons = (isrc: IconSource, list: SvgIcon[]) => {
	const svgs: SvgIcon[] = [];

	for (const icon of list) {
		const it = {
			...icon,
		};
		let iconName = it.iconName;

		if (isrc.removeFilePrefixes) {
			for (const prefix of isrc.removeFilePrefixes) {
				iconName = iconName.replace(prefix, '');
			}
		}

		const removeFirtsCharsFromFile = isrc.removeFirtsCharsFromFile ?? 0;
		if (removeFirtsCharsFromFile > 0) {
			iconName = iconName.substring(removeFirtsCharsFromFile);
		}

		// clean iconName
		iconName = iconName.replace(/[\s&_]/gi, '-');

		it.iconName = `${isrc.shortName}-${iconName}`
			.split('-')
			.map((x) => capitalizeFirstLetter(x))
			.join('');
		svgs.push(it);
	}
	return svgs;
};

const loadFileList = async (isrc: IconSource): Promise<SvgPart | null> => {
	const svgPart: SvgPart = {
		source: isrc,
		icons: [],
		inamesList: [],
	};

	try {
		const files = await readdir(isrc.iconsPath);
		svgPart.icons = await addSvgFiles(isrc, files);
	} catch (error) {
		return null;
	}
	return svgPart;
};

const addSvgFiles = async (isrc: IconSource, files: string[]): Promise<SvgIcon[]> => {
	if (!isrc.subFolders) {
		// no sub folders
		return files
			.filter((file) => file.endsWith('.svg'))
			.map(
				(file) =>
					({
						filePath: `${isrc.iconsPath}/${file}`,
						iconName: file.replace('.svg', ''),
					}) as SvgIcon,
			);
	}

	// sub folders
	let fullList: SvgIcon[] = [];
	for (const file of files) {
		try {
			const svgs = await readdir(isrc.iconsPath + '/' + file);
			fullList = [
				...fullList,
				...svgs
					.filter((svg) => svg.endsWith('.svg'))
					.map((svg) => ({
						filePath: `${isrc.iconsPath}/${file}/${svg}`,
						iconName: `${file}-${svg.replace('.svg', '')}`,
					})),
			];
		} catch (error) {
			console.error(error);
		}
	}
	return fullList;
};

const capitalizeFirstLetter = (_string: string): string => {
	const fixName = {
		filled: 'fill',
		outlined: 'outline',
		regular: '',
		logos: 'logo',
	};
	const string = fixName[_string] !== undefined ? fixName[_string] : _string;
	return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
};

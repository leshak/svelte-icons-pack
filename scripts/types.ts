export type IconSource = {
	shortName: string;
	packName: string;
	version?: string;
	license: string;
	licenseUrl: string;
	url: string;
	iconsPath: string;
	subFolders?: boolean;
	removeFilePrefixes?: string[];
	removeFirtsCharsFromFile?: number;
	skip?: boolean;
};

export type SvgIconObject = {
	svg: object;
};

export type IconObject = {
	a: object;
	c: string;
};

export type SvgIcon = {
	filePath: string;
	iconName: string;
	svgData?: SvgIconObject;
	svgObject?: IconObject | null;
};

export type SvgPart = {
	source: IconSource;
	icons: SvgIcon[];
	inamesList: string[];
};

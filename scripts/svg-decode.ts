import { XMLBuilder, XMLParser } from 'fast-xml-parser';

import { IconObject, SvgIconObject, SvgPart } from './types';

const parser = new XMLParser({ ignoreAttributes: false });
const builder = new XMLBuilder({ ignoreAttributes: false });

const REMOVE_ATTRIBUTES = ['@_class', '@_style', '@_id', '@_width', '@_height', '@_xmlns'];

export const loadSvgAndDecode = async (svgPart: SvgPart): Promise<SvgPart> => {
	for (const icon of svgPart.icons /* .slice(0, 25) */) {
		// load XML (svg) file
		icon.svgData = await svgLoadAndDecode(icon.filePath);

		// if loaded -> convert to object
		if (icon.svgData) icon.svgObject = generateSvgObject(icon.svgData);
	}

	return svgPart;
};

const svgLoadAndDecode = async (svgFilePath: string) => {
	const svgFile = Bun.file(svgFilePath);
	const svgData = await svgFile.text();
	return parser.parse(svgData);
};

const generateSvgObject = (svg: SvgIconObject): IconObject | null => {
	if (!svg.svg) return null;
	const svgData = svg.svg;

	return {
		a: Object.keys(svgData)
			.filter((key) => key.indexOf('@_') === 0) // works with attributes
			.filter((key) => !REMOVE_ATTRIBUTES.includes(key)) // filter out attributes
			.map((key) => ({ [key.slice(2)]: svgData[key] }))
			.reduce((acc, x) => ({ ...acc, ...x }), {}),
		c: builder.build(svgData),
	};
};

/* const collectDrawTags = (result: string, tagName: string, tag: object | object[]): string => {
	let res = result;

	if (Array.isArray(tag)) {
		for (const subTag of tag) {
			res += collectDrawTags(res, tagName, subTag);
		}
	} else {
		res += createTagWithAttrs(tagName, tag);
	}

	return res;
};

const createTagWithAttrs = (tagName: string, attrs: object): string => {
	const sattr = Object.keys(attrs)
		.filter((key) => key.indexOf('@_') === 0)
		.map((key) => `${key.slice(2)}="${attrs[key]}"`)
		.join(' ');

	return `<${tagName} ${sattr}></${tagName}>`;
};
 */

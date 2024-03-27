<script lang="ts">
	import type { IconType } from './index.js';

	export let src: IconType;
	export let size: string | number = '1em';
	export let viewBox: string = undefined;
	export let color: string = 'currentColor';
	export let title: string = undefined;
	export let className: string = '';

	let innerHtml: string;
	let attr: any = {};
	$: {
		attr = {};
		if (color) {
			if (src.a.stroke !== 'none') {
				attr.stroke = 'currentColor';
			}
			if (src.a.fill !== 'none') {
				attr.fill = 'currentColor';
			}
		}
	}

	$: {
		innerHtml = (title ? `<title>${title}</title>` : '') + src.c;
	}
</script>

<svg
	width={size}
	height={size}
	{viewBox}
	style={color ? 'color: ' + color + ';' : ''}
	stroke-width="0"
	class={className}
	{...src.a}
	{...attr}
	xmlns="http://www.w3.org/2000/svg"
>
	{@html innerHtml}
</svg>

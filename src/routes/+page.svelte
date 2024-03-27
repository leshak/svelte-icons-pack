<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';

	import { manifest, type ManifestItem } from '../manifest.js';

	import SvelteLogo from '../demo/SvelteLogo.svelte';
	import IconPack from '../demo/IconPack.svelte';
	import Readme from '../demo/Readme.svelte';

	let pageType = '';
	let pageParam = '';
	let pageData: ManifestItem | null = null;

	$: {
		const [, type, param] = $page.url.hash.split('/');
		pageType = type;
		pageParam = param;

		if (pageType === 'pack') {
			pageData = manifest.find((item) => item.path === pageParam) || null;
		} else if (pageType === 'search') {
			const pd: ManifestItem = {
				name: 'Searching',
				icons: [],
				license: '',
				path: '',
				sourceUrl: '',
			};

			for (const item of manifest) {
				item.icons.forEach((icon) => {
					if (icon.n.toLowerCase().includes(pageParam)) {
						pd.icons.push({
							...icon,
							p: item.path,
						});
					}
				});
			}

			pageData = {
				...pd,
				name: `Found ${pd.icons.length} icons`,
			};
		}
	}

	function debounce(func, wait, immediate) {
		var timeout;
		return function executedFunction() {
			var context = this;
			var args = arguments;
			var later = function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}

	const onChanged = debounce(function (ev) {
		const searchVal = ev.target.value;
		location.hash = '#/search/' + searchVal;
	}, 500);
</script>

<sip-main class="h-screen flex flex-row items-stretch">
	<sip-left-menu class="flex flex-col flex-start w-[250px] shrink-0">
		<sip-logo class="flex justify-center pt-8 pb-4">
			<a href="#/">
				<SvelteLogo />
			</a>
		</sip-logo>
		<a href="#/" class="block text-center text-[#ff3e00] text-2xl hover:underline"
			>svelte-icon-pack</a
		>
		<sip-search class="block px-3 pt-4 pb-5">
			<input
				type="text"
				placeholder="Search icons"
				class="w-full text-sm px-3 py-2 border rounded-lg outline-[#ff3e00]"
				on:input={onChanged}
			/>
		</sip-search>
		<nav class="w-full flex flex-col gap-1">
			{#each manifest as item}
				<div class="px-3 text-sm">
					<a
						href="#/pack/{item.path}"
						class="block w-full px-3 py-2 border border-transparent rounded-lg hover:border-[#ff3e00]/10
            hover:bg-[#ff3e00]/5 hover:text-[ff3e00] hover:underline {pageType === 'pack' &&
						pageParam === item.path
							? '!border-[#ff3e00] text-[#ff3e00] bg-[#ff3e00]/5'
							: ''}">{item.name}</a
					>
				</div>
			{/each}
		</nav>
	</sip-left-menu>
	<sip-page class="block bg-slate-100 shrink grow overflow-auto">
		{#if pageType === 'pack'}
			<IconPack {pageData} />
		{:else if pageType === 'search'}
			<IconPack {pageData} />
		{:else}
			<Readme />
		{/if}
	</sip-page>
</sip-main>

<script lang="ts">
	import Icon from '../lib/Icon.svelte';
	import { AiOutlineCopy } from '../lib/ai/index.js';
	import type { ManifestItem } from '../manifest.js';

	export let pageData: ManifestItem | null = null;

	const sizes = [8, 16, 24, 32, 48];

	let notifyActive: boolean = false;
	let notifyText: string = '';
	let hideNotify: Timer;

	let size = 32;
	let activeIcon: string | undefined = '';
	let activeIconPath: string | undefined = '';
	$: {
		activeIcon = pageData?.icons[0]?.n;
		activeIconPath = pageData?.icons[0]?.p || pageData?.path;
	}

	function onSelelectIcon(name: string) {
		activeIcon = name;
		copyToClipboard(name);
		onNotify(`Copied ${name} to clipboard`);
	}

	function setSize(s: number) {
		size = s;
	}

	function onCopyImport() {
		copyToClipboard(`import { ${activeIcon} } from "svelte-icons-pack/${activeIconPath}";`);
		onNotify(`Copied import statement to clipboard`);
	}

	function copyToClipboard(txt: string) {
		const copyText: HTMLInputElement = document.getElementById('copy-input') as HTMLInputElement;
		if (copyText) {
			copyText.value = txt;
			copyText.select();
			copyText.setSelectionRange(0, 99999); /*For mobile devices*/

			/* Copy the text inside the text field */
			document.execCommand('copy');
		}
	}

	function onNotify(txt: string) {
		notifyText = txt;
		notifyActive = true;

		clearTimeout(hideNotify);
		hideNotify = setTimeout(() => {
			notifyActive = false;
		}, 5000);
	}
</script>

{#if pageData}
	<main class="bg-white py-6 px-8 min-h-full">
		<h1 class="text-3xl">{pageData.name}</h1>
		{#if pageData.license}
			<table class="mt-4 text-base">
				<tbody>
					{#if pageData.version}
						<tr>
							<td>Version</td>
							<td>{pageData.version}</td>
						</tr>
					{/if}
					<tr>
						<td>License</td>
						<td>{pageData.license}</td>
					</tr>
					<tr>
						<td>URL</td>
						<td
							><a href={pageData.sourceUrl} target="_blank" rel="noreferrer" class="underline"
								>{pageData.sourceUrl}</a
							></td
						>
					</tr>
					<tr>
						<td>Icons</td>
						<td>{pageData.icons.length}</td>
					</tr>
				</tbody>
			</table>
		{/if}

		{#if activeIcon}
			<div>
				<h2 class="text-2xl mt-8 mb-4">Import</h2>
				<code
					class="block w-full relative py-2 px-6 border rounded-lg bg-black text-md text-[#c586c0]"
				>
					import
					<span style="color:#9cdcfe">{`{ ${activeIcon} }`}</span>
					from
					<span style="color:#ce9178">"svelte-icons-pack/{activeIconPath}"</span>;
					<button
						type="button"
						title="Copy to clipboard"
						on:click={onCopyImport}
						class="absolute top-[8px] right-[8px] bg-slate-900 active:top-[9px] active:right-[9px]"
					>
						<Icon src={AiOutlineCopy} size={16} color="#ffffff" />
					</button>
				</code>
			</div>
		{/if}

		{#if pageData?.icons?.length > 0}
			<div>
				<h2 class="text-2xl mt-8 mb-4 flex gap-8">
					<span>List</span>
					<div class="flex gap-4">
						{#each sizes as s}
							<button
								on:click={() => setSize(s)}
								class="text-sm text-gray-600 border rounded-md px-2 py-1 {size === s
									? '!text-[#ff3e00] border-[#ff3e00]'
									: ''}">{s}px</button
							>
						{/each}
					</div>
				</h2>
				<div class="flex flex-wrap gap-4">
					{#each pageData.icons as it}
						<button class="w-[88px] overflow-hidden" on:click={() => onSelelectIcon(it.n)}>
							<div
								class="w-[88px] h-[68px] flex justify-center border rounded-lg hover:border-[#ff3e00]/10
            hover:bg-[#ff3e00]/5 hover:text-[ff3e00] {it.n === activeIcon
									? '!border-[#ff3e00]'
									: ''}"
							>
								<span class="content-center">
									<Icon src={it.i} {size} />
								</span>
							</div>
							<div class="px-1 mt-1 w-full text-[10px] truncate">{it.n}</div>
						</button>
					{/each}
				</div>
			</div>
		{/if}
	</main>
{/if}

<input id="copy-input" />
<div class="notify border rounded-lg shadow-lg text-[#ff3e00]" class:notifyActive>{notifyText}</div>

<style>
	#copy-input {
		opacity: 0;
		font-size: 2px;
		padding: 0;
		margin: 0;
	}

	.notify {
		position: fixed;
		left: 0;
		right: 0;
		top: -90px;
		margin: 0 auto;
		width: 300px;
		text-align: center;
		padding: 7px 12px;
		background-color: #ffffff;
		/* border: 1px solid rgb(255, 62, 0, 0.4);
		border-radius: 5px;
		box-shadow:
			0 3px 6px -4px rgba(0, 0, 0, 0.12),
			0 6px 16px 0 rgba(0, 0, 0, 0.08),
			0 9px 28px 8px rgba(0, 0, 0, 0.05); */
		transition: top 0.3s;
		font-size: 14px;
	}

	.notifyActive {
		top: 25px;
	}

	table td {
		padding: 4px 7px;
	}
</style>

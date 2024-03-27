<script lang="ts">
	import Icon from '$lib/Icon.svelte';
	import { AiOutlineLink } from '$lib/ai/index.js';
</script>

<main class="bg-white py-6 px-8 h-full">
	<h1 class="text-3xl">Svelte Icons Pack</h1>
	<div class="mt-8">
		<img src="https://img.shields.io/npm/v/svelte-icons-pack.svg" alt="npm" />
	</div>
	<div class="mt-8">
		<a href="https://github.com/leshak/svelte-icons-pack" target="_blank" class="flex items-center text-lg">
			<span>README</span>
			<span class="ml-2"><Icon src={AiOutlineLink} /></span>
		</a>
	</div>
</main>

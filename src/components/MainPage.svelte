<script>
  import IconsPackPage from "../pages/IconsPackPage.svelte";
  import Home from "./../pages/Home.svelte";
  import { appState, PAGE } from "./../state.js";

  // $: console.log($appState);
</script>

<style>
  div {
    padding: 8px 24px;
  }
</style>

<div>
  {#if $appState.page === PAGE.HOME}
    <Home />
  {:else if $appState.page === PAGE.PACK}
    <IconsPackPage />
  {/if}
</div>

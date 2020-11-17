<script>
  import { onMount, onDestroy } from "svelte";

  import { appState, PAGE } from "./state";
  import LeftMenu from "./components/LeftMenu.svelte";
  import MainPage from "./components/MainPage.svelte";

  function urlHashChanged() {
    const urlHash = location.hash;
    // console.log("hash", urlHash);

    const [isPash, pageId, pageParams] = urlHash.split("/");
    if (isPash && pageId === "pack") {
      // Pack
      appState.setPage(PAGE.PACK, pageParams);
    } else if (isPash && pageId === "search") {
      appState.setPage(PAGE.SEARCH, pageParams);
    } else {
      // Home
      appState.setPage(PAGE.HOME);
    }
  }

  onMount(() => {
    window.addEventListener("hashchange", urlHashChanged, false);
  });

  onDestroy(() => {
    window.removeEventListener("hashchange", urlHashChanged);
  });

  urlHashChanged();
</script>

<style>
  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: stretch;
    align-items: flex-start;
  }
  .left {
    order: 0;
    flex: 0 1 250px;
    align-self: auto;
    padding: 24px 8px;
  }
  .right {
    order: 0;
    flex: 1 1 auto;
    align-self: auto;
  }
</style>

<div class="container">
  <div class="left">
    <LeftMenu />
  </div>
  <div class="right">
    <MainPage />
  </div>
</div>

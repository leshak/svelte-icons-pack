<script>
  import { Router, Link, Route } from "svelte-routing";
  import Home from "../pages/Home.svelte";
  import IconsPackPage from "../pages/IconsPackPage.svelte";
</script>

<style>
  main {
    padding: 8px 24px;
  }
</style>

<main>
  <Route path="/" component={Home} />
  <Route path="pack/:packId" component={IconsPackPage} />
</main>

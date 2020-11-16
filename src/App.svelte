<script>
  import { Router, Link, Route } from "svelte-routing";

  import LeftMenu from "./components/LeftMenu.svelte";
  import MainPage from "./components/MainPage.svelte";
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

<Router>
  <div class="container">
    <div class="left">
      <LeftMenu />
    </div>
    <div class="right">
      <MainPage />
    </div>
  </div>
</Router>

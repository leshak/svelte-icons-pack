<script>
  import { appState } from "./../state.js";
  import SvelteLogo from "./SvelteLogo.svelte";
  import IconsManifest from "svelte-icons-pack/manifest";

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

  var onChanged = debounce(function (ev) {
    const searchVal = ev.target.value;
    location.hash = "#/search/" + searchVal;
  }, 500);
</script>

<style>
  nav {
    width: 250px;
  }
  .top {
    text-align: center;
    color: #444444;
  }
  .title {
    font-weight: 400;
    font-size: 25px;
    margin: 8px 0 16px;
    color: #ff3e00;
  }
  input {
    width: 100%;
    margin: 16px 0;
    border-radius: 5px;
    padding: 7px 12px;
  }
  input:focus {
    outline-color: #ff3e00;
    outline-width: 1px;
  }
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .liActive {
    border-color: #ff3e00 !important;
  }
  a.icon-pack {
    color: #444444;
    display: block;
    font-size: 16px;
    padding: 12px 14px;
    border: 1px solid transparent;
    border-radius: 5px;
  }
  a.icon-pack:hover {
    background-color: rgb(255, 62, 0, 0.03);
    border-color: rgb(255, 62, 0, 0.2);
  }
</style>

<nav>
  <a href="#/">
    <div class="top">
      <SvelteLogo />
      <div class="title">svelte-icons-pack</div>
    </div>
  </a>
  <div>
    <input type="text" placeholder="Search icons" on:input={onChanged} />
  </div>
  <ul>
    {#each IconsManifest as item}
      <li>
        <a
          href="#/pack/{item.path}"
          class="icon-pack"
          class:liActive={item.path === $appState.param}>{item.name}</a>
      </li>
    {/each}
  </ul>
</nav>
<!-- This png 1x1 is used to count the number of site visitors -->
<img
  src="https://xyz.fishbla.com/pixel.png?app_key=65a84ba9ffa23aaf5f6d2ba339949dfc1c9b8de8&begin_session=1"
  alt="analytics" />

<script>
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
  }
  input {
    width: 100%;
    margin: 16px 0;
  }
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  li {
    font-size: 16px;
    padding: 7px 14px;
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
      <li><a href="#/pack/{item.path}">{item.name}</a></li>
    {/each}
  </ul>
</nav>

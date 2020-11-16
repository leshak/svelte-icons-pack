<script>
  import { Router, Link, Route } from "svelte-routing";

  import SvelteLogo from "./SvelteLogo.svelte";
</script>

<style>
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
</style>

<nav>
  <Link to="/">
    <div class="top">
      <SvelteLogo />
      <div class="title">svelte-icons-pack</div>
    </div>
  </Link>
  <div><input type="text" placeholder="Search icons" /></div>
  <ul>
    <li>
      <Link to="pack/ai">Ant Design Icons</Link>
    </li>
  </ul>
</nav>

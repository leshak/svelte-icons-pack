<script>
  import SvelteIcon from "svelte-icons-pack/Icon.svelte";
  import IconsManifest from "svelte-icons-pack/manifest";
  import { appState } from "../state";

  import AiOutlineBulb from "svelte-icons-pack/ai/AiOutlineBulb";

  // import IconsList from "svelte-icons-pack/ai";
  // console.log(IconsList);

  let ipack;
  let iconsList;
  let notifyActive;
  let copiedIconName;
  let hideNotify;

  $: {
    ipack = IconsManifest.find((x) => x.path === $appState.param);
  }

  function onClickIcon(iconName) {
    const copyText = document.getElementById("copy-input");
    if (copyText) {
      copyText.value = iconName;
      copyText.select();
      copyText.setSelectionRange(0, 99999); /*For mobile devices*/

      /* Copy the text inside the text field */
      document.execCommand("copy");

      notifyActive = true;
      copiedIconName = iconName;

      clearTimeout(hideNotify);
      hideNotify = setTimeout(() => {
        notifyActive = false;
      }, 5000);
    }
  }
</script>

<style>
  h1 {
    font-weight: 500;
  }
  h2 {
    font-weight: 400;
    margin: 32px 0 0;
  }
  td {
    padding: 4px 12px 4px 0;
  }

  #copy-input {
    opacity: 0;
    font-size: 2px;
    padding: 0;
    margin: 0;
  }

  .icons-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: stretch;
    align-items: flex-start;
  }
  .icon-blk {
    order: 0;
    flex: 0 1 80px;
    align-self: auto;
    margin: 8px 8px 24px 8px;
    position: relative;
    height: 70px;
    width: 80px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
  }
  .icon-blk:hover {
    cursor: pointer;
    background-color: #f7f7f7;
  }

  .icon {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 30px;
    height: 30px;
  }
  .icon-name {
    position: absolute;
    font-size: 11px;
    text-align: center;
    width: 100%;
    bottom: -16px;
    overflow: hidden;
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
    border: 1px solid green;
    border-radius: 5px;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    transition: top 0.3s;
    font-size: 14px;
  }

  .notifyActive {
    top: 25px;
  }
</style>

{#if !!ipack}
  <main>
    <div>
      <h1>{ipack.name}</h1>
      <table>
        <tbody>
          <tr>
            <td>License</td>
            <td>{ipack.license}</td>
          </tr>
          <tr>
            <td>Project</td>
            <td>
              <a href={ipack.sourceUrl} target="_blank">{ipack.sourceUrl}</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>Icons</h2>
    <input id="copy-input" />
    <div class="icons-list">
      {#each Object.keys(ipack.icons) as ic}
        <div class="icon-blk" on:click={() => onClickIcon(ic)}>
          <div class="icon">
            <SvelteIcon src={ipack.icons[ic]} size={30} />
          </div>
          <div class="icon-name">{ic}</div>
        </div>
      {/each}
    </div>
  </main>

  <div class="notify" class:notifyActive>
    Copied '{copiedIconName}' to clipboard
  </div>
{/if}

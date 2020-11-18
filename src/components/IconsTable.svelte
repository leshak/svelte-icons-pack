<script>
  import SvelteIcon from "svelte-icons-pack/Icon.svelte";
  import HiOutlineClipboardCopy from "svelte-icons-pack/hi/HiOutlineClipboardCopy";
  import IconsManifest from "svelte-icons-pack/manifest";

  export let iconsList;
  export let title = "Icons";

  let notifyActive;
  let notifyText;
  let copiedIconName;
  let copiedIconNamePath;
  let hideNotify;

  let icons = {};
  for (const ic of IconsManifest) {
    icons = {
      ...icons,
      ...ic.icons,
    };
  }

  function getPackPath(iconName) {
    for (const ic of IconsManifest) {
      if (Object.keys(ic.icons).indexOf(iconName) >= 0) {
        return ic.path;
      }
    }
    return "Unknown";
  }

  function onClickIcon(iconName) {
    const copyText = document.getElementById("copy-input");
    if (copyText) {
      copyText.value = iconName;
      copyText.select();
      copyText.setSelectionRange(0, 99999); /*For mobile devices*/

      /* Copy the text inside the text field */
      document.execCommand("copy");

      copiedIconName = iconName;
      notifyText = `Copied '${copiedIconName}' to clipboard`;
      notifyActive = true;

      clearTimeout(hideNotify);
      hideNotify = setTimeout(() => {
        notifyActive = false;
      }, 5000);
    }
  }

  function onCopyImport() {
    const copyText = document.getElementById("copy-input");
    if (copyText) {
      copyText.value = `import ${copiedIconName} from "svelte-icons-pack/${copiedIconNamePath}/${copiedIconName}";`;
      copyText.select();
      copyText.setSelectionRange(0, 99999); /*For mobile devices*/

      /* Copy the text inside the text field */
      document.execCommand("copy");

      notifyText = `Copied import to clipboard`;
      notifyActive = true;

      clearTimeout(hideNotify);
      hideNotify = setTimeout(() => {
        notifyActive = false;
      }, 5000);
    }
  }

  $: {
    if ((iconsList || []).indexOf(copiedIconName) === -1) {
      if (Array.isArray(iconsList) && iconsList.length > 0) {
        copiedIconName = iconsList[0];
      } else {
        copiedIconName = "";
      }
    }
  }

  $: copiedIconNamePath = getPackPath(copiedIconName);
</script>

<style>
  h2 {
    font-weight: 400;
    margin: 32px 0 0;
    font-size: 25px;
  }
  h3 {
    font-weight: 400;
    font-size: 25px;
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
    flex: 0 1 90px;
    align-self: auto;
    margin: 8px 8px 24px 8px;
    position: relative;
    height: 70px;
    width: 90px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
  }

  .iconActive {
    border-color: #ff3e00 !important;
  }
  .icon-blk:hover {
    cursor: pointer;
    background-color: rgb(255, 62, 0, 0.03);
    border-color: rgb(255, 62, 0, 0.2);
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
    border: 1px solid rgb(255, 62, 0, 0.4);
    border-radius: 5px;
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    transition: top 0.3s;
    font-size: 14px;
  }

  .notifyActive {
    top: 25px;
  }

  code {
    background-color: #000000;
    font-size: 16px;
    padding: 16px 64px 16px 32px;
    color: #c586c0;
    border-radius: 5px;
    position: relative;
    display: block;
  }

  button {
    padding: 1px 5px 0px;
    border: 0 solid #d0d0d0;
    background-color: #f0f0f0;
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 4px;
  }
</style>

{#if !!copiedIconName}
  <h3>Import</h3>
  <code>
    import
    <span style="color:#9cdcfe">{copiedIconName}</span>
    from
    <span
      style="color:#ce9178">"svelte-icons-pack/{copiedIconNamePath}/{copiedIconName}"</span>;
    <button type="button" title="Copy to clipboard" on:click={onCopyImport}>
      <SvelteIcon src={HiOutlineClipboardCopy} size={16} />
    </button>
  </code>
{/if}

<h2>{title}</h2>
<input id="copy-input" />
<div class="icons-list">
  {#each iconsList.sort() as ic}
    <div
      class="icon-blk"
      on:click={() => onClickIcon(ic)}
      class:iconActive={ic === copiedIconName}>
      <div class="icon">
        <SvelteIcon src={icons[ic]} size={30} />
      </div>
      <div class="icon-name">{ic}</div>
    </div>
  {/each}
</div>

<div class="notify" class:notifyActive>{notifyText}</div>

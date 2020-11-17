<script>
  import SvelteIcon from "svelte-icons-pack/Icon.svelte";
  import IconsManifest from "svelte-icons-pack/manifest";
  import { appState } from "../state";

  import IconsTable from "../components/IconsTable.svelte";


  let ipack;
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
  td {
    padding: 4px 12px 4px 0;
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

    <IconsTable iconsList={Object.keys(ipack.icons)} />
  </main>
{/if}

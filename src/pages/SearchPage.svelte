<script>
  import IconsManifest from "svelte-icons-pack/manifest";
  import IconsTable from "../components/IconsTable.svelte";
  import { appState } from "../state";

  let foundList = [];
  let iconsNameList = [];
  for (const ic of IconsManifest) {
    iconsNameList = [...iconsNameList, ...Object.keys(ic.icons)];
  }

  $: {
    foundList = iconsNameList.filter((x) => {
      return x.toLowerCase().indexOf($appState.param.toLowerCase()) >= 0;
    });
  }
</script>

<IconsTable title="Found" iconsList={foundList} />

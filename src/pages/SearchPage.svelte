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
    if ($appState.param) {
      foundList = iconsNameList.filter((x) => {
        return x.toLowerCase().indexOf($appState.param.toLowerCase()) >= 0;
      });
    } else {
      foundList = [];
    }
  }
</script>

<IconsTable title="Found {foundList.length} icons" iconsList={foundList.sort()} />

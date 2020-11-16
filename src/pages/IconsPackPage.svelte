<script>
  import Icon from "svelte-icons-pack/Icon.svelte";
  import Icons from "../components/icons";

  export let location;
  export let packId;

  console.log(Icons);
</script>

<div>IconsPack</div>
<div>
  {#each Object.keys(Icons) as iconName}
    <div>
      <Icon src={Icons[iconName]} />
    </div>
  {/each}
</div>

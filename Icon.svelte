<script>
  export let icon;
  export let size = "1em";
  export let color = undefined;
  export let title = undefined;
  export let className = '';
</script>

<svg
  width={size}
  height={size}
  stroke-width="0"
  class={className}
  {...icon.a}
  xmlns="http://www.w3.org/2000/svg">
  {#if title}
    <title>{title}</title>
  {/if}
  <g stroke={color || 'currentColor'} fill={color || 'currentColor'}>
    {@html icon.c}
  </g>
</svg>
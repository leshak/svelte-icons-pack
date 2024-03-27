# Svelte Icons Pack

[![npm][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/svelte-icons-pack.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/svelte-icons-pack


Based on https://github.com/react-icons/react-icons

## Demo page
https://leshak.github.io/svelte-icons-pack/

## Installation

### Bun

```bash
bun add svelte-icons-pack
```

### Yarn

```bash
yarn add svelte-icons-pack
```

### NPM

```bash
npm install svelte-icons-pack --save
```

## Usage v3.x

```svelte
<script>
  import { Icon } from 'svelte-icons-pack';
  import { AiOutlineNodeExpand } from 'svelte-icons-pack/ai';
</script>

<Icon src={AiOutlineNodeExpand} />
```

## Icons


| Icon Library                                                       | License                                    | Version | Count |
| ------------------------------------------------------------------ | ------------------------------------------ | ------- | ----- |
####ICONS-PACKS-TABLE####


You can add more icons by submitting pull requests or creating issues.

## Configuration

You can configure icons props using

```svelte
<script>
  import { Icon } from 'svelte-icons-pack';
  import { AiOutlineNodeExpand } from 'svelte-icons-pack/ai';
</script>

<Icon src={AiOutlineNodeExpand} color="red" size="64" viewBox="0 0 1024 1024" className="custom-icon" title="Custom icon params" />

<style>
  :global(.custom-icon) {
    margin: 100px;
  }
</style>
```

| Key         | Default               | Notes                              |
| ----------- | --------------------- | ---------------------------------- |
| `src`       | `SvgIcon`             |                                    |
| `color`     | `undefined` (inherit) |                                    |
| `size`      | `1em`                 |                                    |
| `viewBox`   | `undefined`           | SVG [`viewBox`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox) attribute used if the underlying icon set does nots specify a `viewBox` per SVG. |
| `className` | `undefined`           |                                    |
| `title`     | `undefined`           | Icon description for accessibility. |



## Migrating from v2.x -> v3.x

Import path has changed. You need to rewrite from the old style.

```svelte
<script>
  // Old import style
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import AiOutlineNodeExpand from 'svelte-icons-pack/ai/AiOutlineNodeExpand';
</script>

<Icon src={AiOutlineNodeExpand} />
```

```svelte
<script>
  // New import style
  import { Icon } from 'svelte-icons-pack';
  import { AiOutlineNodeExpand } from 'svelte-icons-pack/ai';
</script>

<Icon src={AiOutlineNodeExpand} />
```



## Licence

MIT

- Icons are taken from the other projects so please check each project licences accordingly.

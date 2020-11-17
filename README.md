# Svelte Icons Pack

Based on https://github.com/react-icons/react-icons)

## Demo page
https://leshak.github.io/svelte-icons-pack/#/

## Installation

### Yarn

```bash
yarn add svelte-icons-pack
```

### NPM

```bash
npm install svelte-icons-pack --save
```

## Usage

```svelte
<script>
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import AiOutlineNodeExpand from 'svelte-icons-pack/ai/AiOutlineNodeExpand';
</script>

<Icon src={AiOutlineNodeExpand} />
```

## Icons

| Icon Library                                                       | License                                    | Version |
| ------------------------------------------------------------------ | ------------------------------------------ | ------- |
| [Font Awesome](https://fontawesome.com/)|[CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)|5.12.1
| [Ant Design Icons](https://github.com/ant-design/ant-design-icons) | [MIT](https://opensource.org/licenses/MIT) | 4.1.0   |
| [Weather Icons](https://erikflowers.github.io/weather-icons/)|[SIL OFL 1.1](http://scripts.sil.org/OFL)|2.0.11
| [Feather](https://feathericons.com/)|[MIT](https://github.com/feathericons/feather/blob/master/LICENSE)|
| [VS Code Icons](https://github.com/microsoft/vscode-codicons)|[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)|0.0.1

You can add more icons by submitting pull requests or creating issues.

## Configuration

You can configure icons props using

```svelte
<script>
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import AiOutlineNodeExpand from 'svelte-icons-pack/ai/AiOutlineNodeExpand';
</script>

<style>
  :global(.custom-icon) {
    margin: 100px;
  }
</style>

<Icon src={AiOutlineNodeExpand} color="red" size="64" className="custom-icon" title="Custom icon params" />
```

| Key         | Default               | Notes                              |
| ----------- | --------------------- | ---------------------------------- |
| `src`       | `SvgIcon`             |                                    |
| `color`     | `undefined` (inherit) |                                    |
| `size`      | `1em`                 |                                    |
| `className` | `undefined`           |                                    |
| `title`     | `undefined`           | Icon description for accessibility |

## Licence

MIT

- Icons are taken from the other projects so please check each project licences accordingly.

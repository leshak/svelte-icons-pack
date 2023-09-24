# Svelte Icons Pack

Based on https://github.com/react-icons/react-icons

## Demo page
https://leshak.github.io/svelte-icons-pack/

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
[Ant Design Icons](https://github.com/ant-design/ant-design-icons)|[MIT](https://opensource.org/licenses/MIT)|4.2.1
[Bootstrap Icons](https://github.com/twbs/icons)|[MIT](https://opensource.org/licenses/MIT)|1.8.3
[BoxIcons](https://github.com/atisawd/boxicons)|[CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)|2.1.2
[Feather](https://feathericons.com/)|[MIT](https://github.com/feathericons/feather/blob/master/LICENSE)|4.21.0
[Font Awesome](https://fontawesome.com/)|[CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)|5.15.4
[Heroicons](https://github.com/refactoringui/heroicons)|[MIT](https://github.com/tailwindlabs/heroicons/blob/master/LICENSE)|1.0.6
[IcoMoon Free](https://github.com/Keyamoon/IcoMoon-Free)|[CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)|1.0.0
[Ionicons](https://ionicons.com/)|[MIT](https://github.com/ionic-team/ionicons/blob/master/LICENSE)|5.2.3
[Remix Icon](https://github.com/Remix-Design/RemixIcon)|[Apache License Version 2.0](http://www.apache.org/licenses/)|2.5.0
[Simple Icons](https://simpleicons.org/)|[CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)|7.4.0
[Typicons](http://s-ings.com/typicons/)|[CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)|2.1.2
[VS Code Icons](https://github.com/microsoft/vscode-codicons)|[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)|0.0.12
[Weather Icons](https://erikflowers.github.io/weather-icons/)|[SIL OFL 1.1](http://scripts.sil.org/OFL)|2.0.12
[css.gg](https://github.com/astrit/css.gg)|[MIT](https://opensource.org/licenses/MIT)|2.0.0

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

<Icon src={AiOutlineNodeExpand} color="red" size="64" viewBox="0 0 1024 1024" className="custom-icon" title="Custom icon params" />
```

| Key         | Default               | Notes                              |
| ----------- | --------------------- | ---------------------------------- |
| `src`       | `SvgIcon`             |                                    |
| `color`     | `undefined` (inherit) |                                    |
| `size`      | `1em`                 |                                    |
| `viewBox`   | `undefined`           | SVG [`viewBox`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox) attribute used if the underlying icon set does nots specify a `viewBox` per SVG. |
| `className` | `undefined`           |                                    |
| `title`     | `undefined`           | Icon description for accessibility. |

## Licence

MIT

- Icons are taken from the other projects so please check each project licences accordingly.

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
| [Ant Design SVG icons](https://github.com/ant-design/ant-design-icons) | [MIT](https://github.com/ant-design/ant-design-icons/blob/master/LICENSE) | 4.4.2 | 831 | 
| [Bootstrap Icons](https://github.com/twbs/icons) | [MIT](https://github.com/twbs/icons/blob/master/LICENSE) | 1.11.3 | 2050 | 
| [BoxIcons](https://github.com/atisawd/boxicons) | [CC BY 4.0 License](https://github.com/atisawd/boxicons/blob/master/LICENSE) | 2.1.4 | 1634 | 
| [Circum Icons](https://github.com/Klarr-Agency/Circum-icons) | [MPL-2.0 license](https://github.com/Klarr-Agency/Circum-Icons/blob/main/LICENSE) | 1.0.0 | 288 | 
| [Feather](https://feathericons.com/) | [MIT](https://github.com/feathericons/feather/blob/master/LICENSE) | 4.29.1 | 287 | 
| [Font Awesome](https://fontawesome.com/) | [CC BY 4.0 License](https://github.com/FortAwesome/Font-Awesome/blob/master/LICENSE.txt) | 6.5.1 | 2037 | 
| [Github Octicons icons](https://github.com/primer/octicons) | [MIT](https://github.com/primer/octicons/blob/main/LICENSE) | 19.9.0 | 604 | 
| [Heroicons](https://github.com/refactoringui/heroicons) | [MIT](https://github.com/refactoringui/heroicons/blob/master/LICENSE) | 2.1.3 | 592 | 
| [IcoMoon Free](https://github.com/Keyamoon/IcoMoon-Free) | [CC BY 4.0 License](https://github.com/Keyamoon/IcoMoon-Free/blob/master/License.txt) |  | 491 | 
| [Ionicons](https://ionicons.com/) | [MIT](https://github.com/ionic-team/ionicons/blob/master/LICENSE) | 7.3.0 | 1355 | 
| [Lucide](https://github.com/lucide-icons/lucide) | [ISC](https://github.com/lucide-icons/lucide/blob/main/LICENSE) | 0.363.0 | 1447 | 
| [Remix Icon](https://github.com/Remix-Design/RemixIcon) | [Apache License Version 2.0](https://github.com/Remix-Design/RemixIcon/blob/master/License) | 4.2.0 | 2860 | 
| [Simple Icons](https://simpleicons.org/) | [CC0 1.0 Universal](https://github.com/simple-icons/simple-icons/blob/master/LICENSE.md) | 11.10.0 | 3095 | 
| [Simple Line Icons](https://github.com/thesabbir/simple-line-icons) | [MIT](https://github.com/thesabbir/simple-line-icons/blob/master/LICENSE.md) | 2.5.5 | 189 | 
| [Tabler Icons](https://github.com/tabler/tabler-icons) | [MIT](https://github.com/tabler/tabler-icons/blob/main/LICENSE) | 3.1.0 | 5219 | 
| [Typicons](http://s-ings.com/typicons/) | [CC BY-SA 3.0](https://github.com/stephenhutchings/typicons.font/blob/master/LICENCE.md) | 2.1.2 | 336 | 
| [VS Code Icons](https://github.com/microsoft/vscode-codicons) | [CC BY 4.0](https://github.com/microsoft/vscode-codicons/blob/main/LICENSE) | 0.0.35 | 460 | 
| [Weather Icons](https://erikflowers.github.io/weather-icons/) | [SIL OFL 1.1](https://openfontlicense.org/) | 2.0.12 | 219 | 
| [css.gg](https://github.com/astrit/css.gg) | [MIT](https://github.com/astrit/css.gg/blob/master/LICENSE) | 2.1.1 | 704 | 



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

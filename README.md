# Svelte Icons Pack as svelte components

### Based on https://github.com/react-icons/react-icons)

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
  import AiOutlineNodeExpand from 'svelte-icons-pack/ai/AiOutlineNodeExpand';
</script>

<AiOutlineNodeExpand />
```

## Icons

| Icon Library                                                       | License                                    | Version |
| ------------------------------------------------------------------ | ------------------------------------------ | ------- |
| [Ant Design Icons](https://github.com/ant-design/ant-design-icons) | [MIT](https://opensource.org/licenses/MIT) | 4.1.0   |

## Configuration

You can configure react-icons props using [React Context API](https://reactjs.org/docs/context.html).

_Requires **React 16.3** or higher._

```svelte
<script>
  import AiOutlineNodeExpand from 'svelte-icons-pack/ai/AiOutlineNodeExpand';
</script>

<style>
  :global(.custom-icon) {
    margin: 100px;
  }
</style>

<AiOutlineNodeExpand color="red" size="64" className="custom-icon" title="Custom icon params" />
```

| Key         | Default               | Notes                              |
| ----------- | --------------------- | ---------------------------------- |
| `color`     | `undefined` (inherit) |                                    |
| `size`      | `1em`                 |                                    |
| `className` | `undefined`           |                                    |
| `title`     | `undefined`           | Icon description for accessibility |
| `attr`      | `undefined`           | Overwritten by other attributes    |

## Licence

MIT

- Icons are taken from the other projects so please check each project licences accordingly.

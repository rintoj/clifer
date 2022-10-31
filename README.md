# clifer

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A light weight library for building beautiful command line interfaces for NodeJS applications

## Install

### Yarn

```sh
yarn add clifer
```

### NPM

```sh
npm install clifer
```

## Usage

```tsx
import { runCli, cli, input } from 'clifer'

enum Type {
  api = 'api',
  subscriber = 'subscriber',
}

interface Props {
  service: string
  instances?: number
  type?: Type
  dryRun?: boolean
}

function run(props: Props) {
  // handle the action here
}

void runCli(
  cli('create-model')
    // add an option '--version' to the version of the cli
    .version('1.0')

    // add an option '--help' to see help
    .help()

    // add a position input of type string
    .argument(input('name').string().required())

    // add --service=<string>
    .option(input('service').string().required())

    // add --instances=<number>
    .option(input('instances').number())

    // add --type=[api|subscriber]
    .option(input('type').string().options(['api', 'subscriber']))

    // add --dry-run flag
    .option(input('dry-run').description('Do a dry run'))

    // handle the command
    .handle(run),
)
```

### `useTheme()`

```sh

$ create-model --version
1.0

$ create-model --help

create-model    <name> <--service=[string]> [--instances=[number] [--type=[api|subscriber]]
                [--version] [--help] [--dry-run]

      OPTIONS

      --version              Show version

      --help                 Show help

      --dry-run              Do a dry run

      --sample               Sample input

      --instances=<number>   Number of instances
```

### `useContainerStyle()`

```tsx
import { ContainerStyleProps, useContainerStyle } from '@native-x/theme'

interface Props extends ContainerStyleProps {
  ...
}

function MyComponent({
  backgroundColor,
  border,
  borderBottomColor,
  borderColor,
  borderLeftColor,
  borderRadius,
  borderRightColor,
  borderTopColor,
  opacity,
  padding,
}: Props) {
  const style = useContainerStyle({
    backgroundColor,
    border,
    borderBottomColor,
    borderColor,
    borderLeftColor,
    borderRadius,
    borderRightColor,
    borderTopColor,
    opacity,
    padding,
  })
  return <View style={style}>
    {...}
  </View>
}
```

You can also extend specific style types:

```tsx
interface Props extends BackgroundColorStyleProps,
  BorderColorStyleProps,
  BorderSizeStyleProps,
  OpacityStyleProps,
  ShadowStyleProps,
  PaddingStyleProps {
  ...
}
```

### `useTextStyle()`

```tsx
import { TextStyleProps, useTextStyle } from '@native-x/theme'

interface Props extends TextStyleProps {
  ...
}

function MyComponent({ fontSize, lineHeight, textColor }: Props) {
  const style = useTextStyle({ fontSize, lineHeight, textColor })
  return <Text style={style}>{...}</Text>
}
```

Or use individual styles as below

```tsx
interface Props extends FontSizeStyleProps,
  LineHeightStyleProps,
  TextColorStyleProps {
  ...
}
```

### `useShadowStyle()`

```tsx
import { ShadowProps, useShadowStyle } from '@native-x/theme'

interface Props extends ShadowProps {}

function MyComponent({ shadow, shadowColor }: Props) {
  const style = useShadowStyle({ shadow, shadowColor })
  return <Text style={style}>{...}</Text>
}
```

### `autoSwitchTheme`

`ThemeProvider` will automatically switch between `dark` and `light` theme depending on system
appearance. By default this value is set to `false`. Auto theme switching won't work if you don't
have themes by name `dark` (THEME.DARK) and `light` (THEME.LIGHT).

### `autoSwitchStatusBar`

`ThemeProvider` will automatically switch status bar content to `dark-content` or `light-content`
depending on system appearance. By default this value is set to `false` and works only when both
`autoSwitchStatusBar` and `autoSwitchTheme` is set to true.

## Automatic Release

Here is an example of the release type that will be done based on a commit messages:

| Commit message      | Release type          |
| ------------------- | --------------------- |
| fix: [comment]      | Patch Release         |
| feat: [comment]     | Minor Feature Release |
| perf: [comment]     | Major Feature Release |
| doc: [comment]      | No Release            |
| refactor: [comment] | No Release            |
| chore: [comment]    | No Release            |

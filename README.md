# D13 SassDoc Theme

This is my attempt to build my own vision of the [SassDoc](https://github.com/SassDoc/sassdoc) [theme](https://github.com/SassDoc/sassdoc-theme-default).

## Changing the SassDoc Theme

When you set the `--theme` option of the CLI interface, or the `config.theme` option, the path must be compatible with the `require()` function.

## SassDoc Configuration

There's two sources of configuration options, the standard set from the core of sassdoc and the additional options provided by the theme.

### Core Options

See SassDoc's configuration page: http://sassdoc.com/configuration/

### Theme Options

For now, these options mimic [SassDoc's default theme](http://sassdoc.com/customising-the-view/).

| Option              | Type                        | Default                 |
| ------------------- | --------------------------- | ----------------------- |
| `display.access`    | Array                       | `["public", "private"]` |
| `display.alias`     | Boolean                     | `false`                 |
| `display.watermark` | Boolean                     | `true`                  |
| `basePath`          | String                      | -                       |
| `shortcutIcon`      | String                      | -                       |
| `sort`              | Array                       | -                       |
| `description`       | String (Markdown)           | -                       |
| `descriptionPath`   | String (parsed as Markdown) | -                       |

_Future options:_

| Option            | Type   | Default |
| ----------------- | ------ | ------- |
| `googleAnalytics` | String | -       |
| `trackingCode`    | String | -       |
| `privatePrefix`   | Regex  | `^[_-]` |

## Annotations

### Core Annotations

See SassDoc's annotations: http://sassdoc.com/annotations/

### Theme Annotations

_Coming soon_

| Annotation      | Description                        | Aliases |
| --------------- | ---------------------------------- | ------- |
| `@groupInstall` | Package install command for groups | -       |
| `@groupImport`  | Import statement for groups        | -       |

## Customizing the Theme or Contributing

See the [CONTRIBUTING.md](./CONTRIBUTING.md) for local setup and commands.

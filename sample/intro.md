# D13's Sass Documentation

This provides the specifications for D13's Sass variables, functions and mixins.

## Sass Library

Our style packages are built using [dart-sass >=1.23.0](https://sass-lang.com/dart-sass). This
version is required in order to support the use of SASS modules.

```markup
yarn add sass
```

## Sass Modules

When using modules, the [`@use` rule](https://sass-lang.com/documentation/at-rules/use) replaces the
[`@import` rule](https://sass-lang.com/documentation/at-rules/import), which places all the file's
variables, mixins, and functions inside a namespace.

### Usage

By default, the namespace is created from the end of URL path:

```scss
@use "sass:map";
@use "../utilities";

:root {
    --text-primary: #{map.get(utilities.$neutral, "900")};
    --text-secondary: #{map.get(utilities.$neutral, "600")};
    --text-link-color: #{map.get(utilities.$blue-de-france, "600")};
}
```

The namespace can also be set explicitly using an `as` keyword:

```scss
@use "sass:map";
@use "../utilities" as tokens;

:root {
    --text-primary: #{map.get(tokens.$neutral, "900")};
    --text-secondary: #{map.get(tokens.$neutral, "600")};
    --text-link-color: #{map.get(tokens.$blue-de-france, "600")};
}
```

### Migrating to Modules

For more details on migration support and the motivations for using Sass modules:
https://sass-lang.com/blog/the-module-system-is-launched

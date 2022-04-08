const path = require('path');
const sassdoc = require('sassdoc');

const isDefaultTheme = process.env.THEME_DEFAULT === 'true';

const source = path.join(__dirname, '../sample');
const destination = path.join(__dirname, isDefaultTheme ? '../dist/theme-default' : '../dist/theme-d13');

const config = {
  verbose: true,
  dest: destination,
  package: {
    title: 'D13',
    homepage: 'https://d13.github.io',
    description: "D13's Sass Documentation"
  },
  // shortcutIcon: 'https://d13.github.io/assets/media/branding/logo-tight.png'
  shortcutIcon: './sample/sample-favicon.png'
};

if (!isDefaultTheme) {
  config.theme = path.join(__dirname, '../index');
}

const build = () => {
  return sassdoc(source, config).then(() => {
    console.log(`Sass documentation site generated to: ${destination}`);
  });
};

build();

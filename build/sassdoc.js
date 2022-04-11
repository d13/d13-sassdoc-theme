const path = require('path');
const sassdoc = require('sassdoc');

const isDefaultTheme = process.env.THEME_DEFAULT === 'true';

const sourcePath = path.join(__dirname, '../sample');
const configPath = path.join(sourcePath, 'configs');
const destinationPath = path.join(__dirname, isDefaultTheme ? '../dist/theme-default' : '../dist/theme-d13');

const config = {
  ...require(configPath),
  dest: destinationPath
};

if (!isDefaultTheme) {
  config.theme = path.join(__dirname, '../index');
}

const build = () => {
  return sassdoc(sourcePath, config).then(() => {
    console.log(`Sass documentation site generated to: ${destinationPath}`);
  });
};

build();

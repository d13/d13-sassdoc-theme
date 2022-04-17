const { resolve } = require('path');
const { exec } = require('shelljs');
const { copy, writeJSON } = require('fs-extra');
const { augmentData, nextData } = require('./build/data');

const isOnlyData = process.env.SASSDOC_THEME_DATA === 'true';

/**
 * Actual theme function. It takes the destination directory `dest`
 * and the context variables `ctx`.
 *
 * Here, we will modify the context to have a `view` key defaulting to
 * a literal object, but that can be overriden by the user's
 * configuration.
 */
module.exports = function (dest, ctx) {
  ctx = augmentData(ctx);

  const themeCtx = nextData(ctx);

  const copyAssets = Promise.resolve();
  if (!isOnlyData && ctx.shortcutIcon && ctx.shortcutIcon.type === 'internal' && !ctx.shortcutIcon.default) {
    copyAssets.then(() => copy(ctx.shortcutIcon.path, resolve(dest, ctx.shortcutIcon.url)))
    .then(() => {
      console.log('d13-sassdoc-theme: assets copied');
    });
  }

  const parsePath = resolve(__dirname, 'data/parsed.json');
  const modelPath = resolve(__dirname, 'data/model.json');

  return Promise.all([
    copyAssets,
    Promise.all([
      writeJSON(parsePath, ctx, { spaces: 2 }),
      writeJSON(modelPath, themeCtx, { spaces: 2 })
    ]).then(() => {
      console.log('d13-sassdoc-theme: data generated');
    }),
  ]).then(() => {
    if (isOnlyData) {
      return Promise.all([
        copy(parsePath, resolve(dest, 'parsed.json')),
        copy(modelPath, resolve(dest, 'model.json'))
      ]);
    }

    return new Promise((resolve, reject) => {
      exec('yarn export', (code, stdout, stderr) => {
        if (code !== 0) {
          reject(stderr);
        } else {
          resolve();
        }
      });
    }).then(() => copy(resolve(__dirname, 'dist/next'), dest))
  });
};

module.exports.annotations = [
  () => {
    return {
      name: 'installation',
      parse(text) {
        return text.trim();
      }
    };
  },
  () => {
    return {
      name: 'imports',
      parse(text) {
        return text.trim();
      }
    };
  }
];

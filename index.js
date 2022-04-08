const { resolve } = require('path');
const { copy, writeJSON } = require('fs-extra');
const { augmentData } = require('./build/data');

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

  // const copyAssets = copy(resolve(__dirname, 'assets'), resolve(dest, 'assets'));
  // if (ctx.shortcutIcon && ctx.shortcutIcon.type === 'internal' && !ctx.shortcutIcon.default) {
  //   copyAssets.then(() => copy(ctx.shortcutIcon.path, resolve(dest, ctx.shortcutIcon.url)));
  // }
  const copyAssets = copy(ctx.shortcutIcon.path, resolve(dest, ctx.shortcutIcon.url));

  return Promise.all([
    copyAssets,
    writeJSON(resolve(dest, 'model.json'), ctx, { spaces: 2 })
    // TODO: build the content
  ]);
};

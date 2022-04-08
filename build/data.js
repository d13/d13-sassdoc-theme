const path = require('path');
const extras = require('sassdoc-extras');

const dataDefaults = {
  display: {
    access: ['public', 'private'],
    alias: false,
    watermark: true
  },
  groups: {
    undefined: 'General'
  }
};

function augmentData(ctx) {
  /**
   * Inserts default values
   */
  ctx = {
    ...dataDefaults,
    ...ctx,
    groups: {
      ...dataDefaults.groups,
      ...ctx.groups
    }
  };

  /**
   * These filters add some features to SassDoc by post-processing the data.
   *
   * See documentation <http://sassdoc.com/extra-tools>.
   * See repository <https://github.com/SassDoc/sassdoc-extras>.
   */
  extras(
    ctx,
    'description',
    'markdown',
    'display',
    'groupName',
    'shortcutIcon',
    'sort',
    'resolveVariables'
  );

  if (!ctx.shortcutIcon) {
    ctx.shortcutIcon = {
      type: 'internal',
      url: 'assets/images/favicon.png',
      default: true
    };
  } else if (ctx.shortcutIcon.type === 'internal') {
    ctx.shortcutIcon.url = `assets/images/${ctx.shortcutIcon.url}`;
  }

  /**
   * Use SassDoc indexer to index the data by group and type, so we
   * have the following structure:
   *
   *     {
   *       "group-slug": {
   *         "function": [...],
   *         "mixin": [...],
   *         "variable": [...]
   *       },
   *       "another-group": {
   *         "function": [...],
   *         "mixin": [...],
   *         "variable": [...]
   *       }
   *     }
   *
   * You can then use `data.byGroupAndType` instead of `data` in your
   * templates to manipulate the indexed object.
   */
  ctx.dataByGroupAndType = extras.byGroupAndType(ctx.data);

  /**
   * Inserts default values
   */
  if (ctx.groupDescriptions) {
    Object.entries(ctx.groupDescriptions).forEach(([key, value]) => {
      ctx.dataByGroupAndType[key].description = value;
    });
  }

  return ctx;
}

module.exports = {
  augmentData
};

const path = require('path');
const extras = require('sassdoc-extras');

const dataDefaults = {
  display: {
    access: ['public', 'private'],
    alias: false,
    watermark: true,
    annotations: {
      function: [
        'description',
        'parameter',
        'return',
        'example',
        'throw',
        'require',
        'usedby',
        'since',
        'see',
        'todo',
        'link',
        'author'
      ],
      mixin: [
        'description',
        'parameter',
        'content',
        'example',
        'output',
        'throw',
        'require',
        'usedby',
        'since',
        'see',
        'todo',
        'link',
        'author'
      ],
      placeholder: [
        'description',
        'example',
        'throw',
        'require',
        'usedby',
        'since',
        'see',
        'todo',
        'link',
        'author'
      ],
      variable: [
        'description',
        'type',
        'property',
        'require',
        'example',
        'usedby',
        'since',
        'see',
        'todo',
        'link',
        'author'
      ],
      css: ['description', 'example', 'since', 'see', 'todo', 'link', 'author']
    }
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
   * Group values of 'undefined' throw an error in next.js. To combat this,
   * any instances of 'undefined' will be remapped to 'none', including
   * the name override in the 'groups' option.
   */
  // ctx.groups.none = ctx.groups.undefined;
  // delete ctx.groups.undefined;
  // if (ctx.data) {
  //   ctx.data.forEach((item) => {
  //     const groupIndex = item.group.indexOf('undefined');
  //     if (groupIndex > -1) {
  //       item.group.splice(groupIndex, 1, 'none');
  //     }
  //   });
  // }

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
      url: 'static/images/favicon.png',
      default: true
    };
  } else if (ctx.shortcutIcon.type === 'internal') {
    ctx.shortcutIcon.url = `static/images/${ctx.shortcutIcon.url}`;
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

function nextData(ctx) {
  const newCtx = {
    site: {
      meta: {
        ...ctx.package,
      },
      display: ctx.display,
      isEmpty: ctx.data.length < 1
    }
  };

  if (ctx.shortcutIcon) {
    newCtx.site.meta.favicon = ctx.shortcutIcon.url;
  }

  if (!newCtx.isEmpty && ctx.groups) {
    newCtx.groups = Object.entries(ctx.groups).map(([group, groupName]) => {
      const groupCtx = {
        slug: group,
        name: groupName
      };

      const typeData = ctx.dataByGroupAndType[group];
      if (typeData) {
        if (typeData.description) {
          groupCtx.description = typeData.description;
        }

        groupCtx.types = Object.entries(typeData)
          .filter(([type]) => type !== 'description')
          .map(([type, items]) => {
            const typeCtx = {
              type,
              items
            };

            return typeCtx;
          });
      }

      return groupCtx;
    });
  }

  return newCtx;
}

module.exports = {
  augmentData,
  nextData
};

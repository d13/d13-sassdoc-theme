const path = require('path');
const extras = require('sassdoc-extras');

// const Prism = require('prismjs');
// const loadLanguages = require('prismjs/components/');
// loadLanguages('scss');

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
   * Adds group-level instructions for install and import statements.
   *
   * This depends on sassdoc-extras 'groupName'.
   */
  (function groupInstuctions() {
    ctx.groupInstallation = ctx.groupInstallation || {};
    ctx.groupImports = ctx.groupImports || {};

    ctx.data.forEach(function (item) {
      const { installation, imports } = item;
      const group = item.group && item.group[0];

      if (installation) {
        ctx.groupInstallation[group] = installation[0];
      }

      if (imports) {
        ctx.groupImports[group] = imports[0];
      }
    });

    console.log(ctx.groupInstallation);
    console.log(ctx.groupImports);
  })();

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
   * Inserts group descriptions
   */
  if (ctx.groupDescriptions) {
    Object.entries(ctx.groupDescriptions).forEach(([key, value]) => {
      ctx.dataByGroupAndType[key].description = value;
    });
  }

  /**
   * Inserts group installation
   */
  if (ctx.groupInstallation) {
    Object.entries(ctx.groupInstallation).forEach(([key, value]) => {
      ctx.dataByGroupAndType[key].installation = value;
    });
  }

  /**
   * Inserts group descriptions
   */
  if (ctx.groupImports) {
    Object.entries(ctx.groupImports).forEach(([key, value]) => {
      ctx.dataByGroupAndType[key].imports = value;
    });
  }

  return ctx;
}

const PRISM_LANGAUGES = ['scss', 'css', 'markup', 'javascript', 'bash'];
function prismCode(str) {
  // let newStr = str.replace(/(<code class=\"language-(scss|css|markup|javascript|bash)\">)(.*?)(?=<\/code>)/g, (match, tag, type, code) => {
  //   console.log('[prismCode]:', tag, type, code);

  //   const newCode = Prism.highlight(code, Prism.languages[type], type);

  //   return tag + code;
  // });
  let newStr = str;
  PRISM_LANGAUGES.forEach(language => {
    newStr = newStr.replace(new RegExp(`<pre><code class="language-${language}"`, 'g'), `<pre class="language-${language}"><code class="language-${language}"`);
  });

  return newStr;
}

const GROUP_PROPERTIES = ['description', 'installation', 'imports'];

function nextData(ctx) {
  const newCtx = {
    site: {
      meta: {
        ...ctx.package,
      },
      display: ctx.display,
      isEmpty: ctx.data.length < 1,
      description: ctx.description
    }
  };

  // TODO: much more description items need prism ran
  if (newCtx.site.description) {
    newCtx.site.description = prismCode(newCtx.site.description);
    // console.log(newCtx.site.description);
  }

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
        GROUP_PROPERTIES.forEach(key => {
          const property = typeData[key];
          if (property) {
            groupCtx[key] = key === 'description' ? prismCode(property) : property;
          }
        });

        groupCtx.types = Object.entries(typeData)
          .filter(([type]) => !['description', 'installation', 'imports'].includes(type))
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

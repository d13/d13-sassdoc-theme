import data from '../../data/model.json';

export const description = data.site.description;

export const site = {};
Object.keys(data.site).forEach(key => {
  if (key !== 'description') {
    site[key] = data.site[key];
  }
});

export const groups = (data.groups || []).filter(group => group.types && group.types.length > 0);

export const navigation = groups.map(({ slug, name, types }) => {
  const simpleItem = ({ context }) => ({
    context: {
      name: context.name
    }
  });

  return {
    slug,
    name,
    types: types.map(({ type, items }) => ({
      type,
      items: items.map(simpleItem)
    }))
  };
});

export const paths = groups.map(({ slug }) => ({ params: { slug } }));

export default class StaticData {
  static get description() {
    return description;
  }

  static get site() {
    return site;
  }

  static get groups() {
    return groups;
  }

  static get navigation() {
    return navigation;
  }

  static get paths() {
    return paths;
  }
}

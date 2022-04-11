import data from '../../data/model.json';

export default class StaticData {
  static get site() {
    return data.site;
  }

  static get groups() {
    return data.groups || [];
  }

  static get paths() {
    if (!data.groups) {
      return [];
    }

    return data.groups.map(({ slug }) => ({ params: { slug } }));
  }
}

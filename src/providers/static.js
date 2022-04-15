import data from '../../data/model.json';

export default class StaticData {
  static get site() {
    return data.site;
  }

  static get groups() {
    return (data.groups || []).filter(group => group.types && group.types.length > 0);
  }

  static get paths() {
    if (!this.groups) {
      return [];
    }

    return this.groups.map(({ slug }) => ({ params: { slug } }));
  }
}

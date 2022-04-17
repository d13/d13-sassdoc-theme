import { useEffect, useMemo, useState } from "react";
import classNames from 'classnames';
import Link from "next/link";
/**
 * TODO: refactor search functionality to its own component, something like:
 *  <Search items={[]} keys={[]} empty={ReactNode}><Children {...childProps} /></Search>
 */
export default function SiteSearch({ id, navigation = [] }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const data = useMemo(() => {
    const flattenedData = [];

    navigation.forEach(({ slug, name, types=[] }) => {
      types && types.forEach(({ type, items=[] }) => {
        items.forEach(({ context }) => {
          flattenedData.push({
            group: name,
            type: type,
            name: context.name,
            url: `/group/${slug}#${type}-${context.name}`
          });
        });
      });
    });

    return flattenedData;
  }, [navigation]);

  useEffect(() => {
    if (!query.length) {
      setResults([]);
      return;
    }

    const queryLower = query.toLowerCase();
    setResults(data.filter(item => item.name.indexOf(queryLower) > -1));
  }, [query]);

  return (<div className={classNames('search site-search', !!query.length && 'is-populated', !!results.length && 'has-results')}>
    <label className="search__label" htmlFor={id}>Search</label>
    <input className="search__input" id={id} type="search" placeholder=" " onChange={(e) => setQuery(e.target.value)} />
    <div className="search__results">
      <ul className="search__list">
        {!results.length && <li className="search__info">No results</li>}
        {results.map(({ group, type, name, url }, i) => (
          <li className="search__item" key={'search-' + i}>
            <Link href={url}><a className="site-search__link">(<code>{type}</code>) {group ? `[${group}] ` : ''}{name}</a></Link>
          </li>
        ))}
      </ul>
    </div>
  </div>);
}

import { useMemo } from 'react';
import StaticData from '../../providers/static';
import Snippet from '../../components/snippet';
import Type from '../../templates/parts/type';

export default function GroupPage({ site, page }) {
  const typeList = useMemo(() => {
    if (!site.display.annotations) {
      return page.types;
    }

    return Object.entries(site.display.annotations).map(([key, annotations]) => {
      const type = page.types.find(({ type }) => type === key);

      return {
        type: key,
        items: type ? type.items : [],
        annotations
      };
    }).filter(({items}) => items.length);
  }, [page.types, site.display.annotations]);

  return (<>
    <header className="group">
      <h1>{page.name}</h1>
      {/* description */}
      {page.description && <div dangerouslySetInnerHTML={{ __html: page.description }} />}
      {/* installation */}
      {page.installation && (<>
        <h2 id="install">Installation</h2>
        <Snippet language="bash">{page.installation}</Snippet>
      </>)}
      {/* import */}
      {page.imports && (<>
        <h2 id="import">Import</h2>
        <Snippet>{page.imports}</Snippet>
      </>)}
    </header>

    {typeList.map(typeProps => (
      <Type {...typeProps} key={`page-${page.slug}-${typeProps.type}`} />
    ))}
  </>);
}

export async function getStaticPaths() {
  return {
    paths: StaticData.paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const page = StaticData.groups.find(({ slug }) => slug === params.slug);

  if (!page) {
    return { notfound: true };
  }

  return {
    props: {
      site: StaticData.site,
      navigation: StaticData.navigation,
      page
    }
  };
}

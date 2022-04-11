import Link from 'next/link';
import { useMemo } from 'react';
import PageLayout from '../../layouts/page';
import StaticData from '../../providers/static';
import Preview from '../../templates/annotations/preview';
import Type from '../../templates/parts/type';

export default function GroupPage({ site, groups, page }) {
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

  return (<PageLayout meta={site.meta} display={site.display} groups={groups} title={page.name}>
    <header className="group">
      <h1>{page.name}</h1>
      {/* deprecated */}
      {/* description */}
      {/* installation */}
      {/* import */}
    </header>

    {typeList.map(typeProps => (
      <Type {...typeProps} key={`page-${page.slug}-${typeProps.type}`} />
    ))}
  </PageLayout>);
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
      groups: StaticData.groups,
      page
    }
  };
}

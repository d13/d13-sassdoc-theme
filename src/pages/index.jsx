import Link from 'next/link';
import PageLayout from '../layouts/page';
import StaticData from '../providers/static';

export default function HomePage({ site, groups}) {
  return (<PageLayout meta={site.meta} display={site.display} groups={groups}>
    {site.meta.description ?
      (<div dangerouslySetInnerHTML={{ __html: site.meta.description }}></div>)
      : (<h1>Sass Documentation</h1>)
    }
  </PageLayout>);
}

export async function getStaticProps() {
  return {
    props: {
      site: StaticData.site,
      groups: StaticData.groups
    }
  };
}

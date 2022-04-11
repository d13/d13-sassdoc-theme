import Link from 'next/link';
import PageLayout from '../layouts/page';
import StaticData from '../providers/static';

export default function HomePage({ site, groups}) {
  return (<PageLayout meta={site.meta} display={site.display} groups={groups}>
    <h1>Hello World</h1>
    {site.meta.description && <div className="description" dangerouslySetInnerHTML={{ __html: site.meta.description }}></div>}
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

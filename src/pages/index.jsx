import Link from 'next/link';
import PageLayout from '../layouts/page';
import StaticData from '../providers/static';

export default function HomePage({ site, groups}) {
  return (<PageLayout meta={site.meta} display={site.display} groups={groups}>
    {site.meta.description ?
      (<h1 className="description" dangerouslySetInnerHTML={{ __html: site.meta.description }}></h1>)
      : (<h1>SassDocs</h1>)
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

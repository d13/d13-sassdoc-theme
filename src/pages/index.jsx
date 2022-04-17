import StaticData from '../providers/static';

export default function HomePage({ page, site }) {
  return (<>
    {page ? (<div dangerouslySetInnerHTML={{ __html: page }} />) : site.meta.description ?
      (<div dangerouslySetInnerHTML={{ __html: site.meta.description }} />)
      : (<h1>Sass Documentation</h1>)
    }
  </>);
}

export async function getStaticProps() {
  return {
    props: {
      site: StaticData.site,
      navigation: StaticData.navigation,
      page: StaticData.description
    }
  };
}

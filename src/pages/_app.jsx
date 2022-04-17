import PageLayout from '../layouts/page';
import '../styles/global.scss';

export default function MyApp({ Component, pageProps }) {
  return (
    <PageLayout meta={pageProps.site?.meta} display={pageProps.site?.display} navigation={pageProps.navigation} title={pageProps.page?.name}>
      <Component {...pageProps} />
    </PageLayout>
  );
}

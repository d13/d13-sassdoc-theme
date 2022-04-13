import Head from 'next/head';
import { useMemo } from 'react';

export default function HeadPart({ page, name, title, favicon }) {
  const defaultTitle = 'SassDoc';
  const projectTitle = useMemo(() => `${ page ? `${page} - ` : '' }${title || name || defaultTitle}`, [page, name, title]);

  return (
    <Head>
      <title>{projectTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <meta property="og:title" content={projectTitle} />
      <meta property="og:type" content="website" />

      {favicon && <link href={favicon} rel="shortcut icon" />}
    </Head>
  );
}

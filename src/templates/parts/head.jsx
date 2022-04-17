import Head from 'next/head';
import { useMemo } from 'react';

export default function HeadPart({ page, name, title, favicon, description }) {
  const defaultTitle = 'SassDoc';
  const projectTitle = useMemo(() => `${page ? `${page} - ` : ''}${title || name || defaultTitle}`, [page, name, title]);

  const defaultSubject = 'This provides JSDoc-style specifications for Sass variables, functions, placeholders and mixins as well as CSS selectors.';
  // const projectSubject = useMemo(() => description || defaultSubject, [description]);

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <title>{projectTitle}</title>
      <meta name="description" content={defaultSubject} />

      <meta property="og:title" content={projectTitle} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={defaultSubject} />

      {favicon && <link href={favicon} rel="shortcut icon" />}
    </Head>
  );
}

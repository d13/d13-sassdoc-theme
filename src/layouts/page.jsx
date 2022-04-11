import { useState, useMemo } from 'react';
import Link from 'next/link';
import Head from '../templates/parts/head';
import { SideNav, SideNavGroup, SideNavType, SideNavItem } from '../templates/parts/side-nav';

export default function PageLayout({ title, meta = {}, groups = [], display = {}, children }) {
  const [expanded, setExpanded] = useState(true);
  const defaultTitle = 'SassDoc';
  const projectTitle = useMemo(() => `${meta.title || meta.name || defaultTitle}`, [meta]);

  return (
    <>
      <Head {...meta} page={title} />
      <div className="page">
        <header className="page__header">
          <Link href="/"><a>{projectTitle}{meta.version && ( <span>- v{meta.version}</span>)}<span className="visually-hidden">, back to home</span></a></Link>
        </header>
        <div className="page__container">
          <div className="page__sidebar">
            <button type="button" aria-controls="main-menu" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>toggle sidebar</button>
            <div className="page__menu">
              <SideNav id="main-menu" aria-label="Main Menu">
                {groups.map(({slug, name, types}) => (
                  <SideNavGroup url={`/group/${slug}`} name={name} key={`nav-${slug}`}>
                    {types.map(({type, items}) => (
                      <SideNavType url={`/group/${slug}#${type}`} name={type} key={`nav-${slug}-${type}`}>
                        {items.map(({ context }) => (
                          <SideNavItem url={`/group/${slug}#${type}-${context.name}`} key={`nav-${slug}-${type}-${context.name}`}>{context.name}</SideNavItem>
                        ))}
                      </SideNavType>
                    ))}
                  </SideNavGroup>
                ))}
              </SideNav>
            </div>
          </div>
          <div className="page__canvas">
            <main id="main" className="page__main" role="main">{children}</main>
          </div>
        </div>
        <footer className="page__footer">
          <p>
            &copy;{meta.homepage ? (
              <Link href={meta.homepage}><a>{projectTitle}</a></Link>
            ) : (
              <span>{projectTitle}</span>
            )}
            {meta.version && <span>- v{meta.version}</span>}
            {meta.license && (
              <span>
                , under{' '}
                {meta.license.type ? (
                  <>{meta.license.url ? (<Link href={meta.license.url}>{meta.license.type }</Link>) : (<>{meta.license.type }</>)}</>
                ) : (
                  <>{meta.license}</>
                )}
              </span>
            )}
          </p>

          {display.watermark && (
            <p>
              Documentation generated using <Link href="http://sassdoc.com/">SassDoc</Link>. Theme created by <Link href="https://github.com/d13/d13-sassdoc-theme">Keith Daulton</Link>.
            </p>
          )}
        </footer>
      </div>
    </>
  );
}
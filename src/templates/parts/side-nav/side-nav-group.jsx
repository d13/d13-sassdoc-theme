import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ToggleButton from '../../../components/toggle-button';

export function SideNavGroup({ name, url = '#', className, children, ...props }) {
  const [expanded, setExpanded] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [active, setActive] = useState(false);
  const [related, setRelated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setActive(router.asPath === url);
    setRelated(!active && router.asPath.startsWith(url));
  }, [router.asPath]);

  const activeClass = [active && 'is-active', related && 'is-related'];

  return (
    <li className={classNames('side-nav-group', className)} {...props}>
      {children && <ToggleButton on={expanded} aria-expanded={expanded} emphasis="minimal" className="side-nav-group__toggle" onClick={() => { setInteracted(true); setExpanded(!expanded); }}>toggle {name}</ToggleButton>}
      <Link href={url}><a className={classNames("side-nav-group__name", activeClass)} onClick={() => { setInteracted(true); setExpanded(true); }}>{name}</a></Link>
      {interacted && children && <ul className="side-nav-group__items">{children}</ul>}
    </li>
  );
}

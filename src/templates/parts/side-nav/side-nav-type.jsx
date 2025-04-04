import { useState, useEffect } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ToggleButton from '../../../components/toggle-button';

export function SideNavType({ name, url = '#', className, children, ...props }) {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState(false);
  const [related, setRelated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setActive(router.asPath === url);
    setRelated(!active && router.asPath.startsWith(url));
  }, [router.asPath]);

  const activeClass = [active && 'is-active', related && 'is-related'];

  return (
    <li className={classNames('side-nav-type', className)} {...props}>
      {children && <ToggleButton on={expanded} aria-expanded={expanded} size="sm" emphasis="minimal" className="side-nav-type__toggle" onClick={() => setExpanded(!expanded)}>toggle {name}</ToggleButton>}
      <Link href={url}><a className={classNames("side-nav-type__name", activeClass)} onClick={() => setExpanded(true)}>{name}</a></Link>
      {children && <ul className="side-nav-type__items">{children}</ul>}
    </li>
  );
}

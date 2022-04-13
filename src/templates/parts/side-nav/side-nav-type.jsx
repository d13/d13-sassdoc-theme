import { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import ToggleButton from '../../../components/toggle-button';

export function SideNavType({ name, url = '#', className, children, ...props }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <li className={classNames('side-nav-type', className)} {...props}>
      {children && <ToggleButton on={expanded} aria-expanded={expanded} size="sm" emphasis="minimal" className="side-nav-type__toggle" onClick={() => setExpanded(!expanded)}>toggle {name}</ToggleButton>}
      <Link href={url}><a className="side-nav-type__name" onClick={() => setExpanded(true)}>{name}</a></Link>
      {children && <ul className="side-nav-type__items">{children}</ul>}
    </li>
  );
}

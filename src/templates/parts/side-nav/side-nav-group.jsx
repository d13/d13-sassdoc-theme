import classNames from 'classnames';
import { useState } from 'react';
import Link from 'next/link';
import ToggleButton from '../../../components/toggle-button';

export function SideNavGroup({ name, url = '#', className, children, ...props }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <li className={classNames('side-nav-group', className)} {...props}>
      {children && <ToggleButton on={expanded} aria-expanded={expanded} emphasis="minimal" className="side-nav-group__toggle" onClick={() => setExpanded(!expanded)}>toggle {name}</ToggleButton>}
      <Link href={url}><a className="side-nav-group__name" onClick={() => setExpanded(true)}>{name}</a></Link>
      {children && <ul className="side-nav-group__items">{children}</ul>}
    </li>
  );
}

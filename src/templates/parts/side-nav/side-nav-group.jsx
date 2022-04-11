import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';

export function SideNavGroup({ name, url = '#', className, children, ...props }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <li className={classNames('side-nav-group', className)} {...props}>
      <Link href={url}><a className="side-nav-group__name">{name}</a></Link>
      {children && (<>
        <button aria-expanded={expanded} className="button button--toggle side-nav-group__toggle" type="button" onClick={() => setExpanded(!expanded)}>toggle</button>
        <ul className="side-nav-group__items">{children}</ul>
      </>)}
    </li>
  );
}

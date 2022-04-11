import { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';

export function SideNavType({ name, url = '#', className, children, ...props }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <li className={classNames('side-nav-type', className)} {...props}>
      <Link href={url}><a className="side-nav-type__name">{name}</a></Link>
      {children && (<>
        <button aria-expanded={expanded} className="button button--toggle side-nav-type__toggle" type="button" onClick={() => setExpanded(!expanded)}>toggle</button>
        <ul className="side-nav-type__items">{children}</ul>
      </>)}
    </li>
  );
}

import classNames from 'classnames';
import Link from 'next/link';

export function SideNavType({ name, url = '#', className, children, ...props }) {
  return (
    <li className={classNames('side-nav-type', className)} {...props}>
      <Link href={url} className="side-nav-type__name">{name}</Link>
      {children && <ul>{children}</ul>}
    </li>
  );
}

import classNames from 'classnames';
import Link from 'next/link';

export function SideNavGroup({ name, url = '#', className, children, ...props }) {
  return (
    <li className={classNames('side-nav-group', className)} {...props}>
      <Link href={url} className="side-nav-group__name">{name}</Link>
      {children && <ul>{children}</ul>}
    </li>
  );
}

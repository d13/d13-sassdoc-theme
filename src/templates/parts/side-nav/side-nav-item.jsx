import classNames from 'classnames';
import Link from 'next/link';

export function SideNavItem({ url = '#', className, children, ...props }) {
  return (
    <li className={classNames('side-nav-item', className)} {...props}>
      <Link href={url}><a className="side-nav-item__name">{children}</a></Link>
    </li>
  );
}

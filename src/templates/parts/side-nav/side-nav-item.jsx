import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function SideNavItem({ url = '#', className, children, ...props }) {
  const router = useRouter();

  const activeClass = router.asPath === url && 'is-active';

  return (
    <li className={classNames('side-nav-item', className)} {...props}>
      <Link href={url}><a className={classNames("side-nav-item__name", activeClass)}>{children}</a></Link>
    </li>
  );
}

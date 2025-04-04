import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function SideNavItem({ url = '#', className, children, ...props }) {
  const [active, setActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setActive(router.asPath === url);
  }, [router.asPath]);

  const activeClass = active && 'is-active';

  return (
    <li className={classNames('side-nav-item', className)} {...props}>
      <Link href={url}><a className={classNames("side-nav-item__name", activeClass)}>{children}</a></Link>
    </li>
  );
}

import classNames from 'classnames';

export function SideNav({ className, children, ...props }) {
  return (
    <nav className={classNames('sidenav', className)} {...props}>
      <ul>{ children }</ul>
    </nav>
  );
}

import classNames from 'classnames';

export function SideNav({ className, children, ...props }) {
  return (
    <nav className={classNames('side-nav', className)} {...props}>
      <ul>{ children }</ul>
    </nav>
  );
}

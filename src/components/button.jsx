import classNames from 'classnames';

const useTypes = ['utility', 'primary', 'danger'];
const emphasisTypes = ['high', 'medium', 'low', 'minimal'];
const sizeTypes = ['sm', 'md', 'lg'];

export default function Button({
  use = 'utility',
  emphasis = 'high',
  active = false,
  onlyIcon = false,
  size,
  icon,
  disabled,
  type,
  className,
  children,
  ...props
}) {
  const isLink = disabled !== undefined ? false : 'href' in props;
  const ButtonTag = isLink ? 'a' : 'button';
  const typeAttr = type ? type : !isLink ? 'button' : undefined;
  const disabledAttr = isLink ? undefined : disabled;
  const isOnlyIcon = onlyIcon || (!!icon && !!children);

  const classes = classNames(
    'button',
    use && `button--${use}`,
    emphasis && `button--${emphasis}`,
    size && `button--${size}`,
    active && 'button--active',
    isOnlyIcon && 'button--icon-only',
    className
  );

  return (
    <ButtonTag className={classes} type={typeAttr} disabled={disabledAttr} {...props}>
      {icon && <span className="button__icon">{icon}</span>}
      {children && <span className={classNames('button__label', onlyIcon && 'visually-hidden')}>{children}</span>}
    </ButtonTag>
  );
}

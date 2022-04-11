export default function Annotation({ title, children, dangerouslySetInnerHTML, ...props }) {
  return (
    <div className="annotation" {...props}>
      {title && <h4 className="annotation__title">{title}</h4>}
      {dangerouslySetInnerHTML ?
        (<div className="annotation__description" dangerouslySetInnerHTML={dangerouslySetInnerHTML} />)
        : (<div className="annotation__description">{children}</div>)
      }
    </div>
  );
}

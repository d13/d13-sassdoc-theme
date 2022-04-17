import Preview from "../annotations/preview";
import AnnotationList from "../annotations/annotation-list";

export default function Item({ annotations, item, ...props }) {
  const { deprecated, context, parameter, type, access } = item;

  return (
    <article {...props} id={`${context.type}-${context.name}`} className="item">
      <header className="item__header">
        <h3 className="item__name">
          {access !== 'public' && (<span>[{access}] </span>)}
          {context.name}
        </h3>
        {/* deprecated */}
        {deprecated && (<div className="alert alert--danger">
          <h4 className="alert__title">Deprecated</h4>
          <div className="alert__description" dangerouslySetInnerHTML={{ __html: deprecated }} />
        </div>)}
      </header>
      <Preview context={context} parameter={parameter} type={type} />
      <AnnotationList annotations={annotations} data={item} />
    </article>
  );
}

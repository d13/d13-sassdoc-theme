import Preview from "../annotations/preview";
import AnnotationList from "../annotations/annotation-list";

export default function Item({ annotations, item, ...props }) {
  const { context, parameter, type, access } = item;

  return (
    <article {...props} id={`${context.type}-${context.name}`}>
      <header>
        <h3>
          {access !== 'public' && (<span>[{access}] </span>)}
          {context.name}
        </h3>
      </header>
      <Preview context={context} parameter={parameter} type={type} />
      <AnnotationList annotations={annotations} data={item} />
    </article>
  );
}

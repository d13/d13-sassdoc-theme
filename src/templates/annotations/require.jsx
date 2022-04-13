import Link from "next/link";
import Annotation from "../../components/annotation";

/**
 * @link http://sassdoc.com/annotations/#require
 * @link http://sassdoc.com/data-interface/#require-synonym-requires
 */
export default function Require({ data }) {
  return (
    <Annotation title="Require">
      <ul className="list-unset">
        {/* TODO: need to filter by access and alias */}
        {data.map(({ type, name, url, external = false, description, item }, i) => {
          const path = external ? url : item ? `#${item.context.type}-${item.context.name}` : `#${type}-${name}`;
          const code = (external || !item) ? name : item.context.name;
          return (
            <li key={'require-' + i}>
              <span>[{external ? 'external' : type}]</span>{' '}
              {path ? (<Link href={path}><a><code>{code}</code></a></Link>) : (<code>{code}</code>)}
              {description && <div dangerouslySetInnerHTML={{ __html: description }} />}
            </li>
          );
        })}
      </ul>
    </Annotation>
  );
}

import Link from "next/link";
import Annotation from "../../components/annotation";

/**
 * @link http://sassdoc.com/annotations/#see
 */
export default function See({ data }) {
  return (
    <Annotation title="See">
      <ul className="list-unset">
        {/* TODO: need to filter by access and alias */}
        {data.map(({description, context, access, alias}, i) => (
          <li key={'see-' + i}>
            <span>[{context.type}]</span>
            <Link href={`#${context.type}-${context.name}`}>{context.name}</Link>
            {description && <div dangerouslySetInnerHTML={{ __html: description }} /> }
          </li>
        ))}
      </ul>
    </Annotation>
  );
}

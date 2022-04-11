import Link from "next/link";
import Annotation from "../../components/annotation";

/**
 * @link http://sassdoc.com/data-interface/#require-synonym-requires
 */
export default function UsedBy({ data }) {
  return (
    <Annotation title="Used By">
      <ul>
        {/* TODO: need to filter by access and alias */}
        {/* TODO: add group url to href */}
        {data.map(({ context }, i) => (
          <li key={'usedby-' + i}>
            <span>[{context.type}]</span>{' '}
            <Link href={`#${context.type}-${context.name}`}><a><code>{context.name}</code></a></Link>
          </li>
        ))}
      </ul>
    </Annotation>
  );
}

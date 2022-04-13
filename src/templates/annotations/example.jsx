import Link from "next/link";
import Annotation from "../../components/annotation";
import Snippet from "../../components/snippet";

/**
 * @link http://sassdoc.com/annotations/#example
 * @link http://sassdoc.com/data-interface/#example
 */
export default function Example({ data }) {
  return (
    <Annotation title="Example">
      <ul className="list-unset">
        {/* TODO: need to filter by access and alias */}
        {data.map(({type, description, code}, i) => (
          <li key={'example-' + i}>
            {description && <div dangerouslySetInnerHTML={{ __html: description }} />}
            <Snippet>{code}</Snippet>
          </li>
        ))}
      </ul>
    </Annotation>
  );
}

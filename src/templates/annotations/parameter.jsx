import Link from "next/link";
import Annotation from "../../components/annotation";

/**
 * @link http://sassdoc.com/annotations/#parameter
 * @link http://sassdoc.com/data-interface/#parameter-synonyms-param-arg-argument
 */
export default function Parameter({ data }) {
  return (
    <Annotation title="Parameter">
      <table>
        <thead>
          <tr>
            <th scope="column">Name</th>
            <th scope="column">Type</th>
            <th scope="column">Description</th>
            <th scope="column">Default</th>
          </tr>
        </thead>
        <tbody>
          {/* TODO: need type formatting */}
          {/* TODO: look into resolvedValue */}
          {data.map(({type, name, description='', ...rest}, i) => (
            <tr key={'parameter-' + i}>
              <th scope="row">{name}</th>
              <td>{type}</td>
              <td dangerouslySetInnerHTML={{ __html: description }} />
              <td>{rest.default ? (<code>{rest.default}</code>) : (<>&mdash;<span className="visually-hidden"> none</span></>)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Annotation>
  );
}

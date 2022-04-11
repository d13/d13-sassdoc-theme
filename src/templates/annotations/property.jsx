import Link from "next/link";
import Annotation from "../../components/annotation";

/**
 * @link http://sassdoc.com/annotations/#property
 * @link http://sassdoc.com/data-interface/#property-synonym-prop
 */
export default function Property({ data }) {
  return (
    <Annotation title="Property">
      <table>
        <thead>
          <tr>
            <th scope="column">Name</th>
            <th scope="column">Type</th>
            <th scope="column">Description</th>
            <th scope="column">Value</th>
          </tr>
        </thead>
        <tbody>
          {/* TODO: need type formatting */}
          {/* TODO: look into resolvedValue */}
          {data.map(({type, name, description='', ...rest}, i) => (
            <tr key={'property-' + i}>
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

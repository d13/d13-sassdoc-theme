import Annotation from "../../components/annotation";

export default function Throw({ data }) {
  return (
    <Annotation title="Throw">
      <ul className="list-unset">
        {data.map((value, i) => (
          <li key={'throw-'+i} dangerouslySetInnerHTML={{ __html: value }} />
        ))}
      </ul>
    </Annotation>
  );
}

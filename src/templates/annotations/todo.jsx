import Annotation from "../../components/annotation";

export default function Todo({ data }) {
  return (
    <Annotation title="Todo">
      <ul>
        {data.map((value, i) => (
          <li key={'todo-'+i} dangerouslySetInnerHTML={{ __html: value }} />
        ))}
      </ul>
    </Annotation>
  );
}

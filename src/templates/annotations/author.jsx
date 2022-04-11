import Annotation from "../../components/annotation";

export default function Author({ data }) {
  return (
    <Annotation title="Author">
      <ul>
        {data.map((value, i) => (
          <li key={'author-'+i} dangerouslySetInnerHTML={{ __html: value }} />
        ))}
      </ul>
    </Annotation>
  );
}

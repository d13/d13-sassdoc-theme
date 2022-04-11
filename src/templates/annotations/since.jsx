import Annotation from "../../components/annotation";

export default function Since({ data }) {
  return (
    <Annotation title="Since">
      <ul>
        {data.map(({ version, description='' }, i) => (
          <li key={'since-'+i} dangerouslySetInnerHTML={{ __html: version+description }} />
        ))}
      </ul>
    </Annotation>
  );
}

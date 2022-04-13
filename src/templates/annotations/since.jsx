import Annotation from "../../components/annotation";

export default function Since({ data }) {
  return (
    <Annotation title="Since">
      <ul className="list-unset">
        {data.map(({ version, description='' }, i) => (
          <li key={'since-'+i} dangerouslySetInnerHTML={{ __html: version+description }} />
        ))}
      </ul>
    </Annotation>
  );
}

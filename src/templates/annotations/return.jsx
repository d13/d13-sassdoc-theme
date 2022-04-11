import Annotation from "../../components/annotation";

export default function Return({ data }) {
  const { type, description = '' } = data;
  return (
    <Annotation title="Return" dangerouslySetInnerHTML={{ __html: type + description }} />
  );
}

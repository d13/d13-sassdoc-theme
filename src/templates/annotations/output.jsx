import Annotation from "../../components/annotation";

export default function Output({ data }) {
  return (
    <Annotation title="Output" dangerouslySetInnerHTML={{ __html: data }}></Annotation>
  );
}

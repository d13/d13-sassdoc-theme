import Annotation from "../../components/annotation";

export default function Description({ data }) {
  return (
    <Annotation title="Description" dangerouslySetInnerHTML={{ __html: data }}></Annotation>
  );
}

import Annotation from "../../components/annotation";

export default function Content({ data }) {
  return (
    <Annotation title="Content" dangerouslySetInnerHTML={{ __html: data }}></Annotation>
  );
}

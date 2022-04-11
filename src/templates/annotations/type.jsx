import Annotation from "../../components/annotation";

/**
 * @link http://sassdoc.com/annotations/#type
 * @link http://sassdoc.com/data-interface/#type
 */
export default function Type({ data }) {
  return (
    <Annotation title="Type" dangerouslySetInnerHTML={{ __html: data }}></Annotation>
  );
}

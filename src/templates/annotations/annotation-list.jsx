import { useMemo } from "react";
import Annotation from "../../components/annotation";
import Description from "./description";
import Content from "./content";
import Author from "./author";
import Todo from "./todo";
import Throw from "./throw";
import Since from "./since";
import Output from "./output";
import Link from "./link";
import Return from "./return";
import See from "./see";
import Example from "./example";
import Type from "./type";
import Parameter from "./parameter";
import Property from "./property";
import Require from "./require";
import UsedBy from "./usedby";

const allAnnotations = {
  description: Description,
  type: Type,
  property: Property,
  parameter: Parameter,
  return: Return,
  content: Content,
  example: Example,
  output: Output,
  throw: Throw,
  require: Require,
  usedby: UsedBy,
  since: Since,
  see: See,
  todo: Todo,
  link: Link,
  author: Author
};

const allowedAnnotations = Object.keys(allAnnotations);

const keyHelper = (name) => name === 'usedby' ? 'usedBy' : name;

export default function AnnotationList({ annotations = allowedAnnotations, data }) {
  const orderedList = useMemo(() => {
    return annotations.map(key => {
      const dataByKey = data[keyHelper(key)];

      if (dataByKey === undefined || (Array.isArray(dataByKey) && !dataByKey.length)) {
        return;
      }

      return {
        annotation: key,
        content: dataByKey
      };
    }).filter(entry => entry !== undefined);
  }, [annotations, data]);

  return (<>
    {orderedList.map(({ annotation, content }) => {
      const Component = allAnnotations[annotation];
      const key = `annotation-${annotation}`;

      if (Component) {
        return (<Component key={key} data={content} />);
      }
      return (<Annotation key={key} title={annotation} />);
    })}
  </>);
}

import NextLink from 'next/link';
import Annotation from "../../components/annotation";

export default function Link({ data }) {
  return (
    <Annotation title="Link">
      <ul className="list-unset">
        {data.map(({ url, caption='Link' }, i) => (
          <li key={'link-' + i}>
            <NextLink href={url}>
              <a dangerouslySetInnerHTML={{ __html: caption }} />
            </NextLink>
          </li>
        ))}
      </ul>
    </Annotation>
  );
}

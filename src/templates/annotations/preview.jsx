import { useMemo } from 'react';
import Snippet from '../../components/snippet';

export default function Preview({ context, parameter, type }) {

  const argumentList = list => list && list.map(({name}) => `$${name}`).join(', ') || '';

  const opener = useMemo(() => {
    let prefix = '';
    let glue = ' ';
    let opener = '{';
    switch (context.type) {
      case 'function':
        prefix = '@function ';
        glue = `(${argumentList(parameter)}) `;
        break;
      case 'variable':
        prefix = '$';
        glue = ': ';
        opener = '';
        break;
      case 'placeholder':
        prefix = '%';
        break;
      case 'css':
        prefix = '';
        break;
      case 'mixin':
        prefix = '@mixin ';
        glue = `(${argumentList(parameter)}) `;
        break;
    }

    return `${prefix}${context.name}${glue}${opener}`;
  }, [context]);

  const closer = useMemo(() => {
    let precloser = '';
    let closer = '}';

    if (context.type === 'variable') {
      precloser = context.scope ? ` !${context.scope}` : '';
      closer = ';';
    }

    return `${precloser}${closer}`;
  }, [context]);

  const code = useMemo(() => {
    if (context.type === 'variable') {
      return context.value;
    }

    return context.code;
  }, [context]);

  const preview = useMemo(() => {
    if ((context.line.end - context.line.start) < 1) {
      return;
    }

    if (context.type === 'variable' && type === 'Map') {
      return `${opener}(...)${closer}`;
    }
    return `${opener}...${closer}`;
  }, [context, type, opener, closer]);

  return (<Snippet preview={preview}>{`${opener}${code}${closer}`}</Snippet>);
}

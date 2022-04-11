import { useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss';
SyntaxHighlighter.registerLanguage('scss', scss);

export default function Snippet({ preview, children, ...props }) {
  const [expanded, setExpanded] = useState(true);

  return (<div {...props}>
    {/* TODO: add support for: css, markup, javascript, bash */}
    <SyntaxHighlighter language="scss" className="language-scss" useInlineStyles={false}>{(expanded && preview) ? preview : children}</SyntaxHighlighter>
    {preview && <button type="button" onClick={() => setExpanded(!expanded)}>toggle code block</button>}
  </div>);
}

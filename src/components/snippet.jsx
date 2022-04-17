import { useState } from 'react';
import classNames from 'classnames';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss';
import ToggleButton from './toggle-button';

SyntaxHighlighter.registerLanguage('scss', scss);

export default function Snippet({ language = 'scss', inline = false, className, preview, children, ...props }) {
  const [expanded, setExpanded] = useState(false);

  return (<div {...props} className={classNames('snippet', inline && 'snippet--inline', className)}>
    {preview && <ToggleButton className="snippet__toggle" on={expanded} aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>toggle code block</ToggleButton>}
    <SyntaxHighlighter language={language} className={classNames(`language-${language}`, 'snippet__block')} useInlineStyles={false}>{(!expanded && preview) ? preview : children}</SyntaxHighlighter>
  </div>);
}

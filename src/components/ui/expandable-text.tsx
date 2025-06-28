import React, { useState } from 'react';

interface ExpandableTextProps {
  text: string | React.ReactNode;
  lines?: number;
  className?: string;
  onReadMoreClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({ text, lines = 2, className, onReadMoreClick }) => {
  const [expanded, setExpanded] = useState(false);

  const isString = typeof text === 'string';
  const shouldShowButton = isString ? (text as string).length > 80 : true;

  let preview: React.ReactNode = null;
  if (!isString && !expanded) {
    // If text is an array (e.g., <><p>...</p><ul>...</ul></>), show only the first child
    if (Array.isArray((text as any)?.props?.children)) {
      preview = (text as any).props.children[0];
    } else if ((text as any)?.props?.children) {
      preview = (text as any).props.children;
    } else {
      preview = text;
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!expanded && onReadMoreClick) {
      onReadMoreClick(e);
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  };

  return (
    <div className={className}>
      {isString ? (
        <span
          style={
            expanded
              ? {}
              : {
                  display: '-webkit-box',
                  WebkitLineClamp: lines,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'normal',
                }
          }
        >
          {text}
        </span>
      ) : expanded ? text : preview}
      {shouldShowButton && (
        <button
          type="button"
          className="block mt-2 text-primary underline text-xs focus:outline-none text-left"
          onClick={handleClick}
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
};

export default ExpandableText;

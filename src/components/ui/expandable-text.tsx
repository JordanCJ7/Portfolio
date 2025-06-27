import React, { useState } from 'react';

interface ExpandableTextProps {
  text: string;
  lines?: number;
  className?: string;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({ text, lines = 2, className }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={className}>
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
      {text.length > 80 && (
        <button
          type="button"
          className="ml-2 text-primary underline text-xs focus:outline-none"
          onClick={() => setExpanded((e) => !e)}
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
};

export default ExpandableText;

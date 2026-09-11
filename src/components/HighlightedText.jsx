import React from 'react';

// Common stop words to exclude from individual word highlighting if search query is multi-word
const STOP_WORDS = new Set(['for', 'the', 'and', 'in', 'of', 'to', 'a', 'an', 'on', 'with', 'by', 'at', 'from', 'is', 'are', 'as']);

export default function HighlightedText({ text, query, className = '' }) {
  if (text === undefined || text === null) return null;
  const strText = String(text);

  if (!query || typeof query !== 'string' || !query.trim()) {
    return <span className={className}>{strText}</span>;
  }

  const rawTokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  // Keep meaningful tokens or fallback to tokens with length > 1
  const meaningfulTokens = rawTokens.filter((t) => t.length > 1 && !STOP_WORDS.has(t));
  const activeTokens = meaningfulTokens.length > 0 ? meaningfulTokens : rawTokens.filter((t) => t.length > 1);

  if (activeTokens.length === 0) {
    return <span className={className}>{strText}</span>;
  }

  // Escape special regex characters
  const escapedTokens = activeTokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escapedTokens.join('|')})`, 'gi');

  const parts = strText.split(regex);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        const isMatch = activeTokens.some((t) => t.toLowerCase() === part.toLowerCase());
        if (isMatch) {
          return (
            <mark key={index} className="search-highlight">
              {part}
            </mark>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
}

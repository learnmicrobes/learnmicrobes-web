import React from 'react';
import { splitWords, stemWord } from './textProcessing';

type HighlightProps = {
  text: string;
  /** Index stems from SearchResponse.highlightWords. */
  words: string[];
};

/**
 * Marks the words in `text` that matched the query, the way a results page
 * bolds them in a snippet. Matching runs on stems, so a search for "cocci"
 * also marks "coccus".
 */
export default function Highlight({ text, words }: HighlightProps) {
  if (words.length === 0) return <>{text}</>;

  const wanted = new Set(words);
  const parts = text.split(/([A-Za-z0-9À-ɏα-ω'’]+)/);

  return (
    <>
      {parts.map((part, position) => {
        const isMatch = position % 2 === 1 && splitWords(part).some((word) => wanted.has(stemWord(word)));
        return isMatch ? <mark key={position}>{part}</mark> : <React.Fragment key={position}>{part}</React.Fragment>;
      })}
    </>
  );
}

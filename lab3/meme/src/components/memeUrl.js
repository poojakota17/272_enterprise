import React from 'react';

export default function MemeUrl(props) {
  const fontStyle = {color: props.color};
  return (
      <div className="meme-url rounded">
        Image Link:
        <p className="rounded">{props.link}</p>
      </div>);
}

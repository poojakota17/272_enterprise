import React from 'react';

export default function MemeUrl(props) {
  const fontStyle = {color: props.color};
  return (
      <div className="meme-url rounded">
        <small>Image Link:</small>
        <p className="rounded">{props.link}</p>
      </div>);
}

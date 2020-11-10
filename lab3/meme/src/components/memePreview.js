import React from 'react';
import Image from 'react-bootstrap/Image';


export default function MemePreview(props) {
  const fontStyle = {color: props.color};
  return (
      <div className="preview">
        <Image src={process.env.REACT_APP_CF + `${props.pic}.jpeg`}
    className="preview-pics" rounded />
        <p className={`preview-text preview-text-y-${props.positiony} preview-text-x-${props.positionx} m-0`} style={fontStyle}>{props.text}</p>
      </div>);
}

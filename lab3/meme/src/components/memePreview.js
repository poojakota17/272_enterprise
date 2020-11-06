import React from 'react';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';


export default function MemePreview(props) {
  console.log(props)
  const fontStyle = {color: props.color, fontSize: props.fontSize + 'rem'};
  console.log(fontStyle)
  return (
    <Row className="justify-content-center">
      <div className="preview">
        <Image src={process.env.REACT_APP_CF + `${props.pic}.jpeg`}
    className="preview-pics" rounded />
        <p className={`preview-text-${props.position}`} style={fontStyle}>{props.text}</p>
      </div>
    </Row>);
}

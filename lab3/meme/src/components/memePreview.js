import React, { useRef, useState, useEffect } from 'react';
import bsCustomFileInput from 'bs-custom-file-input';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';


export default function MemePreview(props) {
  console.log(props)
  return (
    <Row className="justify-content-center">
      <div className="preview">
        <Image src={process.env.PUBLIC_URL + `/pics/${props.pic}.jpeg`}
    className="preview-pics" rounded />
        <p className={`preview-text-${props.position}`}>{props.text}</p>
      </div>
    </Row>);
}

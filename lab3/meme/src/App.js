import logo from './logo.svg';
import './App.css';
import React, { useRef, useState, useEffect } from 'react';
import MemeForm from './components/memeForm';
import Header from './components/header';
import TestLambda from './components/testLambda'

function App() {
  return (
    <>
      < Header />
      < MemeForm />
      < TestLambda />
    </>
  );
}

export default App;

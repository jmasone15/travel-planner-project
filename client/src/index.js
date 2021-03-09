import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import gsap from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin'
import "bootstrap/dist/css/bootstrap.min.css"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
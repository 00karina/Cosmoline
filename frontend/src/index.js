import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Globalstate } from "../src/State/provider"
import reducer, { initialstate } from '../src/State/reducer';

ReactDOM.render(
  <Globalstate initialstate={initialstate} reducer={reducer}>
    <App />
  </Globalstate>,
  document.getElementById('root')
);
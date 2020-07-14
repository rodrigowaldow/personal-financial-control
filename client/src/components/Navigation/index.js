import React from 'react';
import style from './index.module.css';

export default function Navigation({ text }) {
  return (
    <button className={`waves-effect waves-light btn ${style.button}`}>
      {text}
    </button>
  );
}

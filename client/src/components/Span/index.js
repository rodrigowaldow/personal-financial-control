import React from 'react';
import style from './index.module.css';

export default function Span({ children }) {
  return (
    <span>
      <strong>{children}</strong>
    </span>
  );
}

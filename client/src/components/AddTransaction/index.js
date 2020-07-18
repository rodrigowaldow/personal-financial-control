import React from 'react';

export default function AddTransaction({ text, setIsModalOpen, setIsAdding }) {
  const handleClickModalOpen = () => {
    console.log('Add New: ' + true);
    setIsAdding(true);
    setIsModalOpen(true);
  };

  return (
    <button
      className={`waves-effect waves-light btn`}
      style={{ zIndex: 0 }}
      onClick={handleClickModalOpen}
    >
      {text}
    </button>
  );
}

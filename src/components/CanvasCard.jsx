import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Note from './Note';
import { v4 as uuidv4 } from 'uuid';

const CanvasCard = ({ title, isSubTitle = false, notes = [], onNotesChange }) => {


  const handlePlus = () => {
    if (notes === undefined) {
      return;
    }
    const newNote = {
      id: uuidv4(),
      content: '',
      color: '',
    }
    onNotesChange([...notes, newNote])
  };

  const handleDelete = id => {
    if (notes === undefined) {
      return;
    }
    onNotesChange(notes.filter(note => note.id !== id))
  };

  const handleUpdateNote = (id, content, color) => {
    if (notes === undefined) {
      return;
    }
    onNotesChange(
      notes.map(note =>
        (note.id === id ? { ...note, content, color } : note)
      ))
  }

  return (
    <div className="row-span-1 bg-white min-h-48 border border-collapse border-gray-300">
      <div
        className={`${isSubTitle === false && `bg-gray-100 border-b border-b-gray-300`} flex items-start justify-between px-3 py-2`}
      >
        <h3 className={`${isSubTitle === false && 'font-bold'}`}>{title}</h3>
        <button
          onClick={handlePlus}
          className="bg-blue-400  text-white p-1.5 text-xs rounded-md"
        >
          <FaPlus />
        </button>
      </div>
      <div className="space-y-3 min-h-32 p-3">
        {notes.map(data => (
          <Note key={data.id} id={data.id} content={data.content} color={data.color} onRemoveNote={handleDelete} onUpdateNote={handleUpdateNote} />
        ))}
      </div>
    </div>
  );
};

export default CanvasCard;

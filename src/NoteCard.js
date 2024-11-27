import React from 'react';

const NoteCard = ({ note, onClick, onPin, onDelete }) => {
  return (
    <div className="note-card" onClick={onClick}>
      <button className={`pin-btn ${note.pinned ? 'pinned' : ''}`} onClick={(e) => { e.stopPropagation(); onPin(note.id); }}>
        {note.pinned ? 'Unpin' : 'Pin'}
      </button>
      <h3>{note.title}</h3>
      <p>{note.tagline}</p>
      <p>{note.body.slice(0, 50)}...</p>
      <button onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}>Delete</button>
    </div>
  );
};

export default NoteCard;

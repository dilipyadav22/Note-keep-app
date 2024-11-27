import React, { useState, useEffect } from 'react';

const NotePopup = ({ note, onSave, onClose }) => {
  const [title, setTitle] = useState(note.title);
  const [tagline, setTagline] = useState(note.tagline);
  const [body, setBody] = useState(note.body);

  useEffect(() => {
    setTitle(note.title);
    setTagline(note.tagline);
    setBody(note.body);
  }, [note]);

  const handleSave = () => {
    const updatedNote = { ...note, title, tagline, body };
    onSave(updatedNote);
  };

  return (
    <div className="note-popup">
      <div className="popup-content">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note Title"
        />
        <input
          type="text"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="Note Tagline"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Note Body"
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default NotePopup;

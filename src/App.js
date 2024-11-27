import React, { useState, useEffect } from "react";
import NoteCard from "./NoteCard";
import NotePopup from "./NotePopup";
import Pagination from "./Pagination";
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage] = useState(6);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  // Fetch notes from localStorage on initial load
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Add new note
  const handleAddNote = () => {
    const newNote = {
      title: "Title", placeholder:"New Notes",
      tagline: "Tagline here",
      body: "Write your note here...",
      pinned: false,
      timestamp: new Date(),
      id: Date.now(),
    };
    setNotes([...notes, newNote]);
  };

  // Open the note popup for editing
  const handleOpenPopup = (note) => {
    setSelectedNote(note);
    setShowPopup(true);
  };

  // Close the note popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedNote(null);
  };

  // Save the updated note
  const handleSaveNote = (updatedNote) => {
    setNotes(notes.map(note => note.id === selectedNote.id ? updatedNote : note));
    setShowPopup(false);
    setSelectedNote(null);
  };

  // Toggle pin status for a note
  const handlePinNote = (noteId) => {
    const updatedNotes = notes.map(note => 
      note.id === noteId ? { ...note, pinned: !note.pinned } : note
    );
    setNotes(updatedNotes);
  };

  // Delete a note
  const handleDeleteNote = (noteId) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
  };

  // Pagination logic
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);
  const totalPages = Math.ceil(notes.length / notesPerPage);

  return (
    <div className="App">
      <header>
        <h1>Notes App</h1>
        <button onClick={handleAddNote}>Add Note</button>
      </header>

      <main>
        <div className="notes-grid">
          {currentNotes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onClick={() => handleOpenPopup(note)}
              onPin={handlePinNote}
              onDelete={handleDeleteNote}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </main>

      {showPopup && (
        <NotePopup
          note={selectedNote}
          onSave={handleSaveNote}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default App;

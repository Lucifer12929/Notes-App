import React, { useState, useEffect } from "react";
import { firebase, firestore } from "./Firebase";
import styles from "./Notes.module.css";
import { v4 as uuidv4 } from "uuid";
import Note from "./Note";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    // Listen for changes to the notes collection in Firebase
    const unsubscribe = firebase
      .firestore()
      .collection("notes")
      .onSnapshot((snapshot) => {
        const newNotes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(newNotes);
      });

    // Unsubscribe from the Firebase listener when the component unmounts
    return unsubscribe;
  }, []);

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleAddNote = (e) => {
    e.preventDefault();

    // Check if the new note's title is unique
    const existingNote = notes.find((note) => note.title === newTitle);
    if (existingNote) {
      alert("A note with this title already exists.");
      return;
    }

    // Create a new note object and add it to Firebase
    const newNote = {
      id: uuidv4(),
      title: newTitle,
      description: newDescription,
    };
    firebase.firestore().collection("notes").doc(newNote.id).set(newNote);

    // Clear the form inputs
    setNewTitle("");
    setNewDescription("");
  };

  const handleDeleteNote = (id) => {
    // Delete the
    const noteRef = firebase.firestore().collection("notes").doc(id);
    noteRef.delete();
  };

  const handleEditNote = (id, updatedTitle, updatedDescription) => {
    // Check if the updated title is unique
    const existingNote = notes.find(
      (note) => note.title === updatedTitle && note.id !== id
    );
    if (existingNote) {
      alert("A note with this title already exists.");
      return;
    }

    // Update the note in Firebase
    const noteRef = firebase.firestore().collection("notes").doc(id);
    noteRef.update({
      title: updatedTitle,
      description: updatedDescription,
    });
  };

  return (
    <div className={styles.Notes}>
      <h1 className={styles.heading}>Notes</h1>
      <div className={styles.head}>
        <form onSubmit={handleAddNote} className={styles.form}>
          <div className={styles.each}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={newTitle}
              onChange={handleTitleChange}
              required
            />
          </div>
          {newTitle.length < 10 ? (
            <>
              <div className={styles.each}>
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  id="description"
                  value={newDescription}
                  onChange={handleDescriptionChange}
                  required
                />
              </div>
            </>
          ) : null}

          <button type="submit" className={styles.submitbutton}>
            Add Note
          </button>
        </form>
      </div>
      <div className={styles.allnotes}>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            onDeleteNote={handleDeleteNote}
            onEditNote={handleEditNote}
          />
        ))}
      </div>
    </div>
  );
};

export default Notes;

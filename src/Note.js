import React, { useState } from "react";
import { firebase, firestore } from "./Firebase";
import styles from "./Note.module.css";

const Note = ({ note, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);

  const handleDelete = () => {
    firebase.firestore().collection("notes").doc(note.id).delete();
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    // Save the updated note to Firebase
    const updatedNote = {
      ...note,
      title,
      description,
    };
    firebase.firestore().collection("notes").doc(note.id).set(updatedNote);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setTitle(note.title);
    setDescription(note.description);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  if (editing) {
    return (
      <div className={styles.notecard}>
        <input value={title} onChange={handleTitleChange} required />
        {title.length < 10 && (
          <input
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        )}
        <div className={styles.buttons}>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.notecard}>
        <h2>{note.title}</h2>
        <p>{note.description}</p>
        <div className={styles.buttons}>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    );
  }
};

export default Note;

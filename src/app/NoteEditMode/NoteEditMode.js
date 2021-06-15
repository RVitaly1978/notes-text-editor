import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote, selectNoteById } from '../../features/notes/notesSlice';
import s from './NoteEditMode.module.scss';

const NoteEditMode = ({ id }) => {
  const dispatch = useDispatch();
  const [noteText, setNoteText] = useState('');
  const note = useSelector((state) => selectNoteById(state, id));

  const { text } = note;
  useEffect(() => {
    setNoteText(text);
  }, [text]);

  const handleCancel = () => {
    dispatch(updateNote({ id, isEditMode: false }));
  };

  const handleSave = () => {
    if (noteText === text) { // -----------------------------------------------
      dispatch(updateNote({ id, isEditMode: false }));
      return;
    }

    dispatch(updateNote({ id, text: noteText, isEditMode: false }));
  };

  const handleChange = (e) => {
    const { innerHTML } = e.target;
    setNoteText(innerHTML);
  };

  return (
    <div className={s.container}>
      <div
        contentEditable={note.isEditMode}
        onInput={handleChange}
        dangerouslySetInnerHTML={{ __html: noteText }}
        suppressContentEditableWarning={true}
      />

      <button
        onClick={handleCancel}
      >Cancel</button>

      <button
        onClick={handleSave}
      >Save</button>
    </div>
  );
};

export default NoteEditMode;

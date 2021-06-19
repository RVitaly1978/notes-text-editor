import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import ContentEditable from 'react-contenteditable';
import { markTagsInText } from '../../helpers/markTags';
import { updateNote, updateNoteThunk, selectNoteById } from '../../features/notes/notesSlice';
import s from './NoteEditMode.module.scss';

const NoteEditMode = ({ id, getFocus }) => {
  const dispatch = useDispatch();
  const note = useSelector((state) => selectNoteById(state, id));
  const contentEditable  = useRef('');
  const [text, setText] = useState('');

  const { content, isEditMode, isViewMode } = note;

  useEffect(() => {
    setText(content);
  }, [content]);

  const handleCancel = () => {
    getFocus();
    setText(content);
    dispatch(updateNote({ id, isEditMode: false }));
  };

  const handleSave = () => {
    getFocus();

    if (text === content) {
      dispatch(updateNote({ id, isEditMode: false }));
      return;
    }

    dispatch(updateNoteThunk({ id, content: text, isEditMode: false }));
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setText(markTagsInText(value));
  };

  return (
    <div>
      <div className={clsx(
        s.container,
        isViewMode && s.viewMode,
        isEditMode && s.editMode,
      )}>
        <ContentEditable
          className={s.contentEditable}
          disabled={!isEditMode}
          innerRef={contentEditable}
          onChange={handleChange}
          html={text}
        />
      </div>

      {isEditMode && (
        <button
          onClick={handleCancel}
        >Cancel</button>
      )}

      {isEditMode && (
        <button
          onClick={handleSave}
        >Save</button>
      )}
    </div>
  );
};

export default NoteEditMode;

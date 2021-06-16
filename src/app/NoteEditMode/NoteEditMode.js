import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import ContentEditable from 'react-contenteditable';
import { updateNote, selectNoteById } from '../../features/notes/notesSlice';
import s from './NoteEditMode.module.scss';

const NoteEditMode = ({ id, getFocus }) => {
  const dispatch = useDispatch();
  const note = useSelector((state) => selectNoteById(state, id));
  const contentEditable  = useRef('');
  const contentRef = useRef('');

  const { content, isEditMode, isViewMode } = note;

  useEffect(() => {
    contentRef.current = content;
    contentEditable.current.innerHTML = content;
  }, [content]);

  const handleCancel = () => {
    getFocus();

    contentRef.current = content;
    contentEditable.current.innerHTML = content;
    dispatch(updateNote({ id, isEditMode: false }));
  };

  const handleSave = () => {
    getFocus();

    if (contentRef.current === content) {
      dispatch(updateNote({ id, isEditMode: false }));
      return;
    }

    dispatch(updateNote({ id, content: contentRef.current, isEditMode: false }));
  };

  const handleChange = (e) => {
    const { value } = e.target;
    contentRef.current = value;
  };

  return (
    <div>
      <div className={clsx(
        s.container,
        isViewMode && s.viewMode,
        isEditMode && s.editMode,
      )}>
        <ContentEditable
          disabled={!isEditMode}
          innerRef={contentEditable}
          onChange={handleChange}
          html={contentRef.current}
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

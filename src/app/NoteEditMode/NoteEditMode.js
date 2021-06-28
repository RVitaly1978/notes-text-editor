import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { markTagsInText } from '../../helpers/markTags';
import { updateNote, updateNoteThunk, selectNoteById } from '../../features/notes/notesSlice';
import ContentEditable from '../ContentEditable/ContentEditable';
import NoteRecordTagsList from '../NoteRecordTagsList/NoteRecordTagsList';
import NoteDate from '../NoteDate/NoteDate';
import { SaveIcon, CancelIcon } from '../Icons';
import s from './NoteEditMode.module.scss';

const NoteEditMode = ({ id, getFocus }) => {
  const dispatch = useDispatch();
  const note = useSelector((state) => selectNoteById(state, id));
  const contentEditable  = useRef('');
  const [text, setText] = useState('');
  const [caretPosition, setCaretPosition] = useState(null);

  const { content, isEditMode, isViewMode } = note;

  useEffect(() => {
    setText(content);
    if (isEditMode) {
      contentEditable.current.focus();
    }
  }, [content, isEditMode]);

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
    const { value, caretPosition } = e.target;
    setText(markTagsInText(value));
    setCaretPosition(caretPosition);
  };

  return (
    <>
      <div className={clsx(
        s.container,
        isViewMode && s.viewMode,
        isEditMode && s.editMode,
      )}>
        <NoteDate id={id} />
        <ContentEditable
          className={s.contentEditable}
          caret={caretPosition}
          disabled={!isEditMode}
          html={text}
          innerRef={contentEditable}
          onChange={handleChange}
        />
        <NoteRecordTagsList id={id} />
      </div>

      {isEditMode && (
        <div className={s.buttonsGroup}>
          <button onClick={handleCancel}><CancelIcon /></button>
          <button onClick={handleSave}><SaveIcon /></button>
        </div>
      )}
    </>
  );
};

export default NoteEditMode;

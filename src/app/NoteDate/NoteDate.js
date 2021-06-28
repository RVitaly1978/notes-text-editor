import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectNoteById } from '../../features/notes/notesSlice';
import formattingDate from '../../helpers/formattingDate';
import s from './NoteDate.module.scss';

const NoteDate = ({ id }) => {
  const { createdAt, editAt } = useSelector((s) => selectNoteById(s, id));

  let dateInfo = `created: ${formattingDate(createdAt)}`;
  if (createdAt !== editAt) {
    dateInfo = `edited: ${formattingDate(editAt)}`;
  }

  return <p className={s.dateInfo}>{dateInfo}</p>;
};

export default memo(NoteDate);

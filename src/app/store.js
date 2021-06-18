import { configureStore } from '@reduxjs/toolkit';
import notesReducer, { name as notes } from '../features/notes/notesSlice';
import tagsReducer, { name as tags } from '../features/tags/tagsSlice';

export default configureStore({
  reducer: {
    [notes]: notesReducer,
    [tags]: tagsReducer,
  },
});

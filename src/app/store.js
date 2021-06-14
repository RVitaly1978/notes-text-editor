import { configureStore } from '@reduxjs/toolkit';
import notesReducer, { name as notes } from '../features/notes/notesSlice';

export default configureStore({
  reducer: {
    [notes]: notesReducer,
  },
});

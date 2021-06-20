import { configureStore } from '@reduxjs/toolkit';
import storageReducer, { name as storage } from '../features/storage/storageSlice';
import notesReducer, { name as notes } from '../features/notes/notesSlice';
import tagsReducer, { name as tags } from '../features/tags/tagsSlice';

export default configureStore({
  reducer: {
    [storage]: storageReducer,
    [notes]: notesReducer,
    [tags]: tagsReducer,
  },
});

import {
  createAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

export const name = 'notes';

const notesAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.editAt.localeCompare(b.editAt),
});

const initialState = {};

const notesSlice = createSlice({
  name,
  initialState: notesAdapter.getInitialState(initialState),
  reducers: {
    noteAdded: notesAdapter.addOne,
  },
  extraReducers: {},
});

export const {
  noteAdded,
} = notesSlice.actions;

export const noteAdd = createAction(
  noteAdded.toString(),
  ({ text, tags }) => {
    const date = new Date().toISOString();
    return {
      payload: {
        text,
        id: uuid(),
        createdAt: date,
        editAt: date,
        tags,
      },
    };
  }
);

export const {
  selectAll: selectAllNotes,
  selectById: selectNoteById,
} = notesAdapter.getSelectors((state) => state[name]);

export default notesSlice.reducer;

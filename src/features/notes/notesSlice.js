import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const name = 'notes';

const notesAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.id.localeCompare(b.id),
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
  selectAll: selectAllNotes,
  selectById: selectNoteById,
} = notesAdapter.getSelectors((state) => state[name]);

export default notesSlice.reducer;

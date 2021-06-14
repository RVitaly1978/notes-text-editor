import {
  createAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

export const name = 'notes';

const notesAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const initialState = {
  current: null,
};

const notesSlice = createSlice({
  name,
  initialState: notesAdapter.getInitialState(initialState),
  reducers: {
    noteAdded: notesAdapter.addOne,
    currentSet: (state, action) => {
      state.current = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  noteAdded,
  currentSet,
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

export const setCurrentNote = createAction(
  currentSet.toString(),
  ({ id }) => ({ payload: id })
);

export const {
  selectIds: selectAllNotesIds,
  selectAll: selectAllNotes,
  selectById: selectNoteById,
} = notesAdapter.getSelectors((state) => state[name]);

export default notesSlice.reducer;

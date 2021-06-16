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
    noteDeleted: notesAdapter.removeOne,
    noteUpdated: notesAdapter.upsertOne,
    currentSet: (state, action) => {
      state.current = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  noteAdded,
  noteDeleted,
  noteUpdated,
  currentSet,
} = notesSlice.actions;

export const addNote = createAction(
  noteAdded.toString(),
  ({ content, tags }) => {
    const date = new Date().toISOString();
    return {
      payload: {
        content,
        id: uuid(),
        createdAt: date,
        editAt: date,
        tags,
        isEditMode: false,
        isViewMode: false,
      },
    };
  }
);

export const updateNote = createAction(
  noteUpdated.toString(),
  (note) => {
    if (note.content) {
      note.editAt = new Date().toISOString();
    }
    return { payload: note };
  }
);

export const deleteNote = createAction(
  noteDeleted.toString(),
  ({ id }) => ({ payload: id })
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

import {
  createAction,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {
  addTagsThunk,
  compareTagsThunk,
  deleteTagsThunk,
  selectFilterTags,
} from '../tags/tagsSlice';
import { getMarkedTagsInText } from '../../helpers/markTags';
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
  ({ id, content, createdAt, tags }) => ({
    payload: {
      content,
      id,
      createdAt,
      editAt: createdAt,
      tags,
      isEditMode: false,
      isViewMode: false,
    },
  })
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

export const selectFilteredNotesIds = createSelector(
  [selectAllNotesIds, selectFilterTags],
  (allNotesIds, filterTags) => {
    let notes = [...allNotesIds];
    if (filterTags.length) {
      notes = [...new Set(filterTags.reduce((acc, tag) => [...acc, ...tag.notes], []))];
    }
    return { notes, tags: filterTags.map(({ id }) => id) };
  }
);

export const createNoteThunk = (note) => (dispatch) => {
  const createdAt = new Date().toISOString();
  const id = uuid();
  let tags = getMarkedTagsInText(note);

  if (!tags.length) {
    dispatch(addNote({ content: note, createdAt, id, tags: [] }));
    return;
  }

  const tagsIds = dispatch(addTagsThunk({ tags: [...new Set(tags)], noteId: id }));
  dispatch(addNote({ content: note, createdAt, id, tags: tagsIds }));
}

export const updateNoteThunk = ({ id, content, isEditMode }) => (dispatch, getState) => {
  const note = selectNoteById(getState(), id);
  const tagsContents = getMarkedTagsInText(content);
  let tags = [...note.tags];

  if (tagsContents.length) {
    tags = dispatch(compareTagsThunk({ tags, tagsContents, noteId: id }));
  }

  dispatch(updateNote({ id, content, isEditMode, tags }));
}

export const deleteNoteThunk = (id) => (dispatch, getState) => {
  const { tags } = selectNoteById(getState(), id);

  if (tags.length) {
    dispatch(deleteTagsThunk({ tags, noteId: id }));
  }

  dispatch(deleteNote({ id }));
}

export default notesSlice.reducer;

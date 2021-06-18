import {
  createAction,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

export const name = 'tags';

const tagsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const initialState = {
  current: null,
};

const tagsSlice = createSlice({
  name,
  initialState: tagsAdapter.getInitialState(initialState),
  reducers: {
    tagAdded: tagsAdapter.addOne,
    tagDeleted: tagsAdapter.removeOne,
    tagUpdated: tagsAdapter.upsertOne,
    // currentSet: (state, action) => {
    //   state.current = action.payload;
    // },
  },
  extraReducers: {},
});

export const {
  tagAdded,
  tagDeleted,
  tagUpdated,
  // currentSet,
} = tagsSlice.actions;

export const addTag = createAction(
  tagAdded.toString(),
  ({ id, content, notes }) => ({
    payload: {
      id,
      content,
      createdAt: new Date().toISOString(),
      notes,
    },
  })
);

export const updateTag = createAction(
  tagUpdated.toString(),
  (tag) => ({ payload: tag })
);

export const deleteTag = createAction(
  tagDeleted.toString(),
  ({ id }) => ({ payload: id })
);

// export const setCurrentNote = createAction(
//   currentSet.toString(),
//   ({ id }) => ({ payload: id })
// );

export const {
  selectIds: selectAllTagsIds,
  selectAll: selectAllTags,
  selectById: selectTagById,
} = tagsAdapter.getSelectors((state) => state[name]);

export const selectTagByContent = createSelector(
  [selectAllTags, (_, tagContent) => tagContent],
  (tags, tagContent) => {
    if (!tags) {
      return null;
    }
    return tags.find(({ content }) => content === tagContent);
  }
);

export const addTagsThunk = ({ tags, noteId }) => (dispatch, getState) => {
  const state = getState();

  const tagsIds = tags.map((content) => {
    const tag = selectTagByContent(state, content);
    if (!tag) {
      const id = uuid();
      dispatch(addTag({ id, content, notes: [noteId] }));
      return id;
    } else {
      dispatch(updateTag({ id: tag.id, notes: [...new Set([...tag.notes, noteId])] }));
      return tag.id;
    }
  });

  return tagsIds;
}

export default tagsSlice.reducer;

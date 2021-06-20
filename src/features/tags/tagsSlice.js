import {
  createAction,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { removeItemFromArray } from '../../helpers/removeItemFromArray';
import { v4 as uuid } from 'uuid';

export const name = 'tags';

const tagsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const initialState = {};

const tagsSlice = createSlice({
  name,
  initialState: tagsAdapter.getInitialState(initialState),
  reducers: {
    tagAdded: tagsAdapter.addOne,
    tagDeleted: tagsAdapter.removeOne,
    tagUpdated: tagsAdapter.upsertOne,
  },
  extraReducers: {},
});

export const {
  tagAdded,
  tagDeleted,
  tagUpdated,
} = tagsSlice.actions;

export const addTag = createAction(
  tagAdded.toString(),
  ({ id, content, notes }) => ({
    payload: {
      id,
      content,
      createdAt: new Date().toISOString(),
      notes,
      filter: false,
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

export const {
  selectIds: selectAllTagsIds,
  selectAll: selectAllTags,
  selectById: selectTagById,
} = tagsAdapter.getSelectors((state) => state[name]);

export const selectFilterTags = createSelector(
  [selectAllTags],
  (tags) => tags ? tags.filter(({ filter }) => filter) : []
);

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
  const tagsIds = tags.map((content) => {
    const tag = selectTagByContent(getState(), content);
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

export const deleteTagsThunk = ({ tags, noteId }) => (dispatch, getState) => {
  tags.forEach((id) => {
    const tag = selectTagById(getState(), id);
    const notes = removeItemFromArray(noteId, tag.notes);
    if (!notes.length) {
      dispatch(deleteTag({ id }));
    } else {
      dispatch(updateTag({ id, notes }));
    }
  });
}

export const compareTagsThunk = ({ tags, tagsContents, noteId }) => (dispatch, getState) => {
  const tagsIds = [];
  tagsContents.forEach((content) => {
    let tag = selectTagByContent(getState(), content);
    if (!tag) {
      const id = uuid();
      dispatch(addTag({ id, content, notes: [noteId] }));
      tag = { id };
    }
    tagsIds.push(tag.id);
  });

  const removedTags = tags.filter((tag) => !tagsIds.includes(tag));
  if (removedTags.length) {
    dispatch(deleteTagsThunk({ tags: removedTags, noteId }));
  }

  return tagsIds;
}

export default tagsSlice.reducer;

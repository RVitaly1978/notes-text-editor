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
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = {
  search: '',
};

const tagsSlice = createSlice({
  name,
  initialState: tagsAdapter.getInitialState(initialState),
  reducers: {
    tagAdded: tagsAdapter.addOne,
    tagDeleted: tagsAdapter.removeOne,
    tagUpdated: tagsAdapter.upsertOne,
    searchUpdated: (state, action) => {
      state.search = action.payload;
    },
    stateUpdated: (state, action) => {
      state.search = action.payload.search;
      tagsAdapter.setAll(state, action.payload.entities);
    },
  },
  extraReducers: {},
});

export const {
  tagAdded,
  tagDeleted,
  tagUpdated,
  searchUpdated,
  stateUpdated,
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

export const updateSearch = createAction(
  searchUpdated.toString(),
  (search) => ({ payload: search })
);

export const setTagsState = createAction(
  stateUpdated.toString(),
  (state) => ({ payload: state })
);

export const {
  selectIds: selectAllTagsIds,
  selectAll: selectAllTags,
  selectById: selectTagById,
} = tagsAdapter.getSelectors((state) => state[name]);

export const selectSearch = (state) => state[name].search;

export const selectFilterTags = createSelector(
  [selectAllTags],
  (tags) => tags.length ? tags.filter(({ filter }) => filter) : []
);

export const selectTagByContent = createSelector(
  [selectAllTags, (_, tagContent) => tagContent],
  (tags, tagContent) => {
    if (!tags.length) {
      return null;
    }
    return tags.find(({ content }) => content === tagContent);
  }
);

export const selectSearchedTagsIds = createSelector(
  [selectAllTagsIds, selectAllTags, selectSearch],
  (tagsIds, tags, search) => {
    if (search.length < 2) {
      return tagsIds;
    }
    return tags.filter(
      ({ content }) => content.toLowerCase().includes(search.toLowerCase())
    ).map(({ id }) => id);
  }
);

export const selectMultipleTagsContentByIds = createSelector(
  [selectAllTags, (_, tagsIds) => tagsIds],
  (tags, tagsIds) => {
    if (!tagsIds.length) {
      return [];
    }
    return tags
      .filter(({ id }) => tagsIds.includes(id))
      .map(({ content }) => content);
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
      dispatch(updateTag({ id: tag.id, notes: [...tag.notes, noteId] }));
      return tag.id;
    }
  });
  return tagsIds;
};

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
};

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

  let removedTags = [];
  if (tags.length) {
    removedTags = tags.filter((id) => !tagsIds.includes(id));
  }

  if (removedTags.length) {
    dispatch(deleteTagsThunk({ tags: removedTags, noteId }));
  }

  return tagsIds;
};

export default tagsSlice.reducer;

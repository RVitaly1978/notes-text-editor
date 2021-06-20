import {
  createAction,
  // createSelector,
  createSlice,
} from '@reduxjs/toolkit';
// import { removeItemFromArray } from '../../helpers/removeItemFromArray';
// import { v4 as uuid } from 'uuid';

export const name = 'storage';

const initialState = {
  isProcess: false,
};

const storageSlice = createSlice({
  name,
  initialState,
  reducers: {
    processSet: (state, action) => {
      state.isProcess = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  processSet,
} = storageSlice.actions;

export const setProcess = createAction(
  processSet.toString(),
  (isProcess) => ({ payload: isProcess })
);

export const selectIsProcess = (state) => state[name].isProcess;

export const selectStateData = (state) => (
 `text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(state))}`
);

// export const selectFilterTags = createSelector(
//   [selectAllTags],
//   (tags) => tags ? tags.filter(({ filter }) => filter) : []
// );

// export const selectTagByContent = createSelector(
//   [selectAllTags, (_, tagContent) => tagContent],
//   (tags, tagContent) => {
//     if (!tags) {
//       return null;
//     }
//     return tags.find(({ content }) => content === tagContent);
//   }
// );

// export const selectSearchedTagsIds = createSelector(
//   [selectAllTagsIds, selectAllTags, selectSearch],
//   (tagsIds, tags, search) => {
//     if (search.length < 2) {
//       return tagsIds;
//     }
//     return tags.filter(({ content }) => content.includes(search)).map(({ id }) => id);
//   }
// );

export const saveDataThunk = () => (dispatch, getState) => {
  const data = `text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(getState()))}`;
  dispatch(setProcess(true));

  const evt = document.createEvent('MouseEvents');
  const anchor = document.createElement('a');
  anchor.download = 'notes.json';
  anchor.href = `data:${data}`;
  anchor.dataset.downloadurl = `text/json:${anchor.download}:${anchor.href}`;
  evt.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  anchor.dispatchEvent(evt);

  dispatch(setProcess(false));
};

export const loadDataThunk = () => (dispatch, getState) => {
  const data = `text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(getState()))}`;
  dispatch(setProcess(true));

  const evt = document.createEvent('MouseEvents');
  const anchor = document.createElement('a');
  anchor.download = 'notes.json';
  anchor.href = `data:${data}`;
  anchor.dataset.downloadurl = `text/json:${anchor.download}:${anchor.href}`;
  evt.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  anchor.dispatchEvent(evt);

  dispatch(setProcess(false));
};

// export const deleteTagsThunk = ({ tags, noteId }) => (dispatch, getState) => {
//   tags.forEach((id) => {
//     const tag = selectTagById(getState(), id);
//     const notes = removeItemFromArray(noteId, tag.notes);
//     if (!notes.length) {
//       dispatch(deleteTag({ id }));
//     } else {
//       dispatch(updateTag({ id, notes }));
//     }
//   });
// };

// export const compareTagsThunk = ({ tags, tagsContents, noteId }) => (dispatch, getState) => {
//   const tagsIds = [];
//   tagsContents.forEach((content) => {
//     let tag = selectTagByContent(getState(), content);
//     if (!tag) {
//       const id = uuid();
//       dispatch(addTag({ id, content, notes: [noteId] }));
//       tag = { id };
//     }
//     tagsIds.push(tag.id);
//   });

//   const removedTags = tags.filter((tag) => !tagsIds.includes(tag));
//   if (removedTags.length) {
//     dispatch(deleteTagsThunk({ tags: removedTags, noteId }));
//   }

//   return tagsIds;
// };

export default storageSlice.reducer;

import { createAction, createSlice } from '@reduxjs/toolkit';
import { setNotesState, name as notes } from '../notes/notesSlice';
import { setTagsState, name as tags } from '../tags/tagsSlice';

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

export const setNewStateThunk = (state) => (dispatch) => {
  dispatch(setNotesState(state[notes]));
  dispatch(setTagsState(state[tags]));
};

export const saveDataThunk = () => (dispatch, getState) => {
  const state = { ...getState() };
  delete state[name];
  const data = `text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(state))}`;
  dispatch(setProcess(true));

  const anchor = document.createElement('a');
  anchor.download = 'notes.json';
  anchor.href = `data:${data}`;
  anchor.dataset.downloadurl = `text/json:${anchor.download}:${anchor.href}`;
  anchor.click();

  dispatch(setProcess(false));
};

export const loadDataThunk = (file) => (dispatch) => {
  dispatch(setProcess(true));

  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    const state = JSON.parse(reader.result);
    dispatch(setNewStateThunk(state));
    dispatch(setProcess(false));
  };
  reader.onerror = () => {
    dispatch(setProcess(false));
  };
};

export const preLoadDataThunk = () => (dispatch) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.onchange = (evt) => {
    const file = evt.target.files[0];
    dispatch(loadDataThunk(file));
  };
  const evt = document.createEvent('MouseEvents');
  evt.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  input.dispatchEvent(evt);
};

export default storageSlice.reducer;

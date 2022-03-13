import { createSlice } from '@reduxjs/toolkit';
import { changeElement } from '../functions/canvas';
import { CanvasElement } from '../type/canvas';

type State = {
  canvasElements: CanvasElement[];
  selectedItem: CanvasElement;
};

const initialState = {
  canvasElements: [],
  selectedItem: { className: '', id: '', styles: { posX: 20, posY: 20 } },
} as State;

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    addElement: (state, { payload }) => {
      state.canvasElements = [...state.canvasElements, payload];
    },
    modifyElement: (state, { payload }) => {
      const changedElements = changeElement(state.canvasElements, state.selectedItem, payload);
      state.canvasElements = changedElements;
    },
    selectItem: (state, { payload }) => {
      state.selectedItem = payload;
    },
    modifySelectedItem: (state, { payload }) => {
      state.selectedItem = { ...state.selectedItem, ...payload };
    },
  },
});

export const { addElement, modifyElement, selectItem, modifySelectedItem } = canvasSlice.actions;
export default canvasSlice.reducer;

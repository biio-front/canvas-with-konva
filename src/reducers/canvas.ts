import { createSlice } from '@reduxjs/toolkit';
import { changeElement } from '../functions/canvas';
import { CanvasElement, Canvas } from '../type/canvas';

type State = {
  canvas: Canvas;
  selectedItem: CanvasElement;
};

const initialState = {
  canvas: { background: { color: '#ffffff' }, items: [] },
  selectedItem: { className: '', id: '', styles: { posX: 20, posY: 20 } },
} as State;

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    modifyBackground: (state, { payload }) => {
      state.canvas.background = { ...state.canvas.background, ...payload };
    },
    addElement: (state, { payload }) => {
      state.canvas.items = [...state.canvas.items, payload];
    },
    modifyElement: (state, { payload }) => {
      const changedElements = changeElement(state.canvas.items, state.selectedItem, payload);
      state.canvas.items = changedElements;
    },
    selectItem: (state, { payload }) => {
      state.selectedItem = payload;
    },
    modifySelectedItem: (state, { payload }) => {
      state.selectedItem.styles = { ...state.selectedItem.styles, ...payload };
    },
  },
});

export const { modifyBackground, addElement, modifyElement, selectItem, modifySelectedItem } =
  canvasSlice.actions;
export default canvasSlice.reducer;

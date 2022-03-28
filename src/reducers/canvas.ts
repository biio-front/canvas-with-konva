import { createSlice } from '@reduxjs/toolkit';
import { changeElementStyle, changeElementText } from '../functions/canvas';
import { CanvasElement, Canvas } from '../type/canvas';

type State = {
  canvas: Canvas;
  selectedItem: CanvasElement;
};

const initialState = {
  canvas: { background: { color: '#ffffff' }, items: [] },
  selectedItem: { className: '', id: '', styles: { posX: 20, posY: 20, width: 100, height: 30 } },
} as State;

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    getCanvas: (state, { payload }) => {
      state.canvas = payload;
    },
    modifyBackground: (state, { payload }) => {
      state.canvas.background = { ...state.canvas.background, ...payload };
    },
    addElement: (state, { payload }) => {
      state.canvas.items = [...state.canvas.items, payload];
    },
    modifyElement: (state, { payload }) => {
      let changedElements = {} as CanvasElement[];

      if (typeof payload === 'string') {
        changedElements = changeElementText(state.canvas.items, state.selectedItem, payload);
      } else {
        changedElements = changeElementStyle(state.canvas.items, state.selectedItem, payload);
      }

      state.canvas.items = changedElements;
    },
    selectItem: (state, { payload }) => {
      state.selectedItem = payload;
    },
    modifySelectedItem: (state, { payload }) => {
      state.selectedItem.styles = { ...state.selectedItem.styles, ...payload };
    },
    modifySelectedItemText: (state, { payload }) => {
      state.selectedItem.text = payload;
    },
  },
});

export const {
  getCanvas,
  modifyBackground,
  addElement,
  modifyElement,
  selectItem,
  modifySelectedItem,
  modifySelectedItemText,
} = canvasSlice.actions;
export default canvasSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { changeElementOrder, changeElementStyle, changeElementText } from '../functions/canvas';
import { CanvasElement, Canvas } from '../type/canvas';

type State = {
  canvas: Canvas;
  selectedItem: CanvasElement;
};

const initialState = {
  canvas: { background: { color: '#ffffff' }, items: [] },
  selectedItem: {
    className: '',
    id: '',
    styles: { posX: 20, posY: 20, width: 100, height: 30, zIndex: 0 },
  },
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
    changeElementOrderUp: (state, { payload: selectedIndex }) => {
      const [changedCanvasItems, changedSelectedItem] = changeElementOrder(
        selectedIndex,
        state.canvas.items,
        state.selectedItem,
        'up',
      );

      state.canvas.items = changedCanvasItems;
      state.selectedItem = changedSelectedItem;
    },
    changeElementOrderDown: (state, { payload: selectedIndex }) => {
      const [changedCanvasItems, changedSelectedItem] = changeElementOrder(
        selectedIndex,
        state.canvas.items,
        state.selectedItem,
        'down',
      );

      state.canvas.items = changedCanvasItems;
      state.selectedItem = changedSelectedItem;
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
  changeElementOrderUp,
  changeElementOrderDown,
} = canvasSlice.actions;
export default canvasSlice.reducer;

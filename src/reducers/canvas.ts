import { createSlice } from '@reduxjs/toolkit';
import {
  changeElementImage,
  changeElementOrder,
  changeElementStyle,
  changeElementText,
  deleteElement,
} from '../functions/canvas';
import { CanvasElement, Canvas } from '../type/canvas';

type State = {
  canvas: Canvas;
  selectedItem: CanvasElement;
  deletedCount: number;
};

const initialState = {
  canvas: { background: { color: '#ffffff' }, items: [] },
  selectedItem: {
    className: '',
    attrs: { id: '', x: 20, y: 20, zIndex: 0 },
  },
  deletedCount: 0,
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
    addCanvasItem: (state, { payload }) => {
      state.canvas.items = [...state.canvas.items, payload];
    },
    selectItem: (state, { payload }) => {
      state.selectedItem = payload;
    },
    modifyCanvasItemStyle: (state, { payload }) => {
      const changedElements = changeElementStyle(state.canvas.items, state.selectedItem, payload);

      state.canvas.items = changedElements;
      state.selectedItem.attrs = { ...state.selectedItem.attrs, ...payload };
    },
    modifyCanvasItemText: (state, { payload }) => {
      const changedElements = changeElementText(state.canvas.items, state.selectedItem, payload);

      state.canvas.items = changedElements;
      state.selectedItem.attrs.text = payload;
    },
    modifyCanvasItemImage: (state, { payload }) => {
      const changedElements = changeElementImage(state.canvas.items, state.selectedItem, payload);

      state.canvas.items = changedElements;
      state.selectedItem.image = payload;
    },
    modifyCanvasItemOrder: (state, { payload }) => {
      const { selectedIndex, direction } = payload;

      const [changedCanvasItems, changedSelectedItem] = changeElementOrder(
        selectedIndex,
        state.canvas.items,
        state.selectedItem,
        direction,
      );

      state.canvas.items = changedCanvasItems;
      state.selectedItem = changedSelectedItem;
    },
    deleteCanvasItem: (state) => {
      const deletedCanvasItems = deleteElement(state.canvas.items, state.selectedItem.attrs.id);

      state.canvas.items = deletedCanvasItems;
      state.selectedItem = initialState.selectedItem;
      state.deletedCount += 1;
    },
  },
});

export const {
  getCanvas,
  modifyBackground,
  addCanvasItem,
  selectItem,
  modifyCanvasItemStyle,
  modifyCanvasItemText,
  modifyCanvasItemImage,
  modifyCanvasItemOrder,
  deleteCanvasItem,
} = canvasSlice.actions;
export default canvasSlice.reducer;

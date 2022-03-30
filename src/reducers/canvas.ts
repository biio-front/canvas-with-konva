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
    type: '',
    className: '',
    id: '',
    styles: { posX: 20, posY: 20, width: 100, height: 30, zIndex: 0 },
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
    modifyCanvasItem: (state, { payload }) => {
      const { type, changedValues } = payload;
      let changedElements = {} as CanvasElement[];

      if (type === 'text') {
        changedElements = changeElementText(state.canvas.items, state.selectedItem, changedValues);
      } else if (type === 'image') {
        changedElements = changeElementImage(state.canvas.items, state.selectedItem, changedValues);
      } else {
        changedElements = changeElementStyle(state.canvas.items, state.selectedItem, changedValues);
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
    modifySelectedItemImage: (state, { payload }) => {
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
      const deletedCanvasItems = deleteElement(state.canvas.items, state.selectedItem.id);

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
  modifyCanvasItem,
  selectItem,
  modifySelectedItem,
  modifySelectedItemText,
  modifySelectedItemImage,
  modifyCanvasItemOrder,
  deleteCanvasItem,
} = canvasSlice.actions;
export default canvasSlice.reducer;

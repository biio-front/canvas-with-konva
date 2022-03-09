import { createSlice } from '@reduxjs/toolkit';
import { changeElement } from '../functions/canvas';
import { CanvasElement } from '../type/canvas';

type State = {
  canvasElements: CanvasElement[];
};

const initialState = { canvasElements: [] } as State;

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    addElement: (state, { payload }) => {
      state.canvasElements = [...state.canvasElements, payload];
    },
    modifyElement: (state, { payload }) => {
      const { selectedItem, changedValues } = payload;
      const changedElements = changeElement(state.canvasElements, selectedItem, changedValues);

      state.canvasElements = changedElements;
    },
  },
});

export const { addElement, modifyElement } = canvasSlice.actions;
export default canvasSlice.reducer;

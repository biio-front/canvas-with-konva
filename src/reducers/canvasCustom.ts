import { createSlice } from '@reduxjs/toolkit';
import { ElementStyle } from '../type/canvas';

const initialState = {
  color: '000000',
  fontSize: '16px',
  fontFamily: 'sans-serif',
  fontWeight: 'normal',
  textAlign: 'left',
} as ElementStyle;

const canvasCustomSlice = createSlice({
  name: 'canvasCustom',
  initialState,
  reducers: {
    setColor: (state, { payload }) => {
      state.color = payload;
    },
    setFontSize: (state, { payload }) => {
      state.fontSize = payload;
    },
    setFontFamily: (state, { payload }) => {
      state.fontFamily = payload;
    },
    setFontWeight: (state, { payload }) => {
      state.fontWeight = payload;
    },
    setTextAlign: (state, { payload }) => {
      state.textAlign = payload;
    },
  },
});

export const { setColor, setFontSize, setFontFamily, setFontWeight, setTextAlign } =
  canvasCustomSlice.actions;
export default canvasCustomSlice.reducer;

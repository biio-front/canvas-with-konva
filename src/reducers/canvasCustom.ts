import { createSlice } from '@reduxjs/toolkit';
import { ElementStyle } from '../type/canvas';

const initialState = {
  color: '000000',
  fontSize: '16px',
  fontFamily: 'sans-serif',
  fontWeight: 'normal',
  textAlign: 'left',
  borderWidth: 'none',
  borderStyle: 'none',
  borderColor: 'none',
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
    setBorderWidth: (state, { payload }) => {
      state.borderWidth = payload;
    },
    setBorderColor: (state, { payload }) => {
      state.borderColor = payload;
    },
    setBorderStyle: (state, { payload }) => {
      state.borderStyle = payload;
    },
  },
});

export const {
  setColor,
  setFontSize,
  setFontFamily,
  setFontWeight,
  setTextAlign,
  setBorderWidth,
  setBorderColor,
  setBorderStyle,
} = canvasCustomSlice.actions;
export default canvasCustomSlice.reducer;

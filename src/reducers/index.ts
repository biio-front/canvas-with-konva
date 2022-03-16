import { combineReducers } from 'redux';
import canvas from './canvas';
import canvasCustom from './canvasCustom';

const reducers = combineReducers({ canvas, canvasCustom });

export type RootState = ReturnType<typeof reducers>;
export default reducers;

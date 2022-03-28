import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../store';

import {
  setBorderColor,
  setBorderStyle,
  setBorderWidth,
  setColor,
} from '../../../reducers/canvasCustom';

import { changeStyle } from '../../../functions/customizing';

function CustomizingRectangle() {
  const dispatch = useAppDispatch();
  const { color, borderWidth, borderColor, borderStyle } = useAppSelector(
    (state) => ({
      color: state.canvasCustom.color,
      borderWidth: state.canvasCustom.borderWidth,
      borderStyle: state.canvasCustom.borderStyle,
      borderColor: state.canvasCustom.borderColor,
    }),
    shallowEqual,
  );

  return (
    <>
      <div className='customizing-title'>
        <span>사각형</span>
      </div>

      <div className='customizing-board'>
        <label htmlFor='color'>
          <div>색상</div>
          <input
            type='color'
            value={color}
            onChange={(event) => changeStyle(event, dispatch, setColor, 'color')}
          />
        </label>

        <label htmlFor='border-color'>
          <div>외곽선</div>
          <select
            value={borderWidth}
            onChange={(event) => changeStyle(event, dispatch, setBorderWidth, 'borderWidth')}
          >
            <option>none</option>
            <option>1px</option>
            <option>2px</option>
            <option>3px</option>
            <option>4px</option>
            <option>5px</option>
          </select>
        </label>

        <label htmlFor='border-width'>
          <div>외곽선 색상</div>
          <input
            type='color'
            value={borderColor}
            onChange={(event) => changeStyle(event, dispatch, setBorderColor, 'borderColor')}
          />
        </label>

        <label htmlFor='border-width'>
          <div>외곽선 종류</div>
          <select
            value={borderStyle}
            onChange={(event) => changeStyle(event, dispatch, setBorderStyle, 'borderStyle')}
          >
            <option>solid</option>
            <option>dashed</option>
            <option>dotted</option>
          </select>
        </label>
      </div>
    </>
  );
}

export default CustomizingRectangle;

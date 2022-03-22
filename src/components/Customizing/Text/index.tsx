import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../store';

import {
  setColor,
  setFontFamily,
  setFontSize,
  setFontWeight,
  setTextAlign,
} from '../../../reducers/canvasCustom';

import useChangeStyle from '../../../hooks/useChangeStyle';

function CustomizingText() {
  const dispatch = useAppDispatch();
  const { color, fontSize, fontFamily, fontWeight, textAlign } = useAppSelector(
    (state) => ({
      color: state.canvasCustom.color,
      fontSize: state.canvasCustom.fontSize,
      fontFamily: state.canvasCustom.fontFamily,
      fontWeight: state.canvasCustom.fontWeight,
      textAlign: state.canvasCustom.textAlign,
    }),
    shallowEqual,
  );

  return (
    <>
      <div className='customizing-title'>
        <span>텍스트</span>
      </div>

      <div className='customizing-board'>
        <div className='content'>
          <label htmlFor='color'>
            <div>텍스트 색상</div>
            <input
              type='color'
              value={color || '000000'}
              onChange={(event) => useChangeStyle(event, dispatch, setColor, 'color')}
            />
          </label>

          <div className='content'>
            <label htmlFor='font-size'>
              <div>텍스트 크기</div>
              <select
                value={fontSize || '16px'}
                onChange={(event) => useChangeStyle(event, dispatch, setFontSize, 'fontSize')}
              >
                <option>10px</option>
                <option>13px</option>
                <option>16px</option>
                <option>19px</option>
                <option>21px</option>
              </select>
            </label>
          </div>
        </div>

        <div className='content'>
          <label htmlFor='font-family'>
            <div>폰트</div>
            <select
              value={fontFamily || 'sans-serif'}
              onChange={(event) => useChangeStyle(event, dispatch, setFontFamily, 'fontFamily')}
            >
              <option>sans-serif</option>
              <option className='Kanit'>Kanit</option>
              <option className='Sansita-Swashed'>Sansita Swashed</option>
              <option className='Ubuntu'>Ubuntu</option>
            </select>
          </label>
        </div>

        <div className='content'>
          <label htmlFor='font-weight'>
            <div>글씨 굵기</div>
            <select
              value={fontWeight || 'normal'}
              onChange={(event) => useChangeStyle(event, dispatch, setFontWeight, 'fontWeight')}
            >
              <option>lighter</option>
              <option>normal</option>
              <option>bolder</option>
            </select>
          </label>
        </div>

        <div className='content'>
          <label htmlFor='text-align'>
            <div>텍스트 정렬</div>
            <select
              value={textAlign || 'left'}
              onChange={(event) => useChangeStyle(event, dispatch, setTextAlign, 'textAlign')}
            >
              <option>left</option>
              <option>center</option>
              <option>right</option>
            </select>
          </label>
        </div>
      </div>
    </>
  );
}

export default CustomizingText;

import { shallowEqual } from 'react-redux';

import { useAppDispatch, useAppSelector } from '../../../store';
import { modifyCanvasItemStyle } from '../../../reducers/canvas';

function CustomizingText() {
  const dispatch = useAppDispatch();
  const { fill, fontSize, fontFamily, fontWeight, textAlign } = useAppSelector(
    (state) => ({
      fill: state.canvas.selectedItem.attrs.fill,
      fontSize: state.canvas.selectedItem.attrs.fontSize,
      fontFamily: state.canvas.selectedItem.attrs.fontFamily,
      fontWeight: state.canvas.selectedItem.attrs.fontWeight,
      textAlign: state.canvas.selectedItem.attrs.textAlign,
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
              value={fill || '000000'}
              onChange={(event) => dispatch(modifyCanvasItemStyle({ fill: event.target.value }))}
            />
          </label>

          <div className='content'>
            <label htmlFor='font-size'>
              <div>텍스트 크기</div>
              <input
                type='range'
                value={fontSize || 16}
                min={1}
                max={200}
                onChange={(event) =>
                  dispatch(modifyCanvasItemStyle({ fontSize: Number(event.target.value) }))
                }
              />
            </label>
          </div>
        </div>

        <div className='content'>
          <label htmlFor='font-family'>
            <div>폰트</div>
            <select
              value={fontFamily || 'sans-serif'}
              onChange={(event) =>
                dispatch(modifyCanvasItemStyle({ fontFamily: event.target.value }))
              }
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
              onChange={(event) =>
                dispatch(modifyCanvasItemStyle({ fontWeight: event.target.value }))
              }
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
              onChange={(event) =>
                dispatch(modifyCanvasItemStyle({ textAlign: event.target.value }))
              }
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

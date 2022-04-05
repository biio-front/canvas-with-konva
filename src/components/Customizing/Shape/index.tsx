import { shallowEqual } from 'react-redux';

import { useAppDispatch, useAppSelector } from '../../../store';
import { modifyCanvasItemStyle } from '../../../reducers/canvas';

function CustomizingShape() {
  const dispatch = useAppDispatch();
  const { className, fill, borderWidth, borderColor, borderStyle } = useAppSelector(
    (state) => ({
      className: state.canvas.selectedItem.className,
      fill: state.canvas.selectedItem.attrs.fill,
      borderWidth: state.canvas.selectedItem.attrs.borderWidth,
      borderStyle: state.canvas.selectedItem.attrs.borderStyle,
      borderColor: state.canvas.selectedItem.attrs.borderColor,
    }),
    shallowEqual,
  );

  return (
    <>
      <div className='customizing-title'>
        <span>
          {className === 'Rect' && '사각형'}
          {className === 'Circle' && '원'}
        </span>
      </div>

      <div className='customizing-board'>
        <label htmlFor='color'>
          <div>색상</div>
          <input
            type='color'
            value={fill}
            onChange={(event) => dispatch(modifyCanvasItemStyle({ fill: event.target.value }))}
          />
        </label>

        <label htmlFor='border-color'>
          <div>외곽선</div>
          <select
            value={borderWidth}
            onChange={(event) =>
              dispatch(modifyCanvasItemStyle({ borderWidth: event.target.value }))
            }
          >
            <option>0px</option>
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
            onChange={(event) =>
              dispatch(modifyCanvasItemStyle({ borderColor: event.target.value }))
            }
          />
        </label>

        <label htmlFor='border-width'>
          <div>외곽선 종류</div>
          <select
            value={borderStyle}
            onChange={(event) =>
              dispatch(modifyCanvasItemStyle({ borderStyle: event.target.value }))
            }
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

export default CustomizingShape;

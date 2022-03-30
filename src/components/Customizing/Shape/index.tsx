import { shallowEqual } from 'react-redux';

import { useAppDispatch, useAppSelector } from '../../../store';
import { modifyCanvasItemStyle } from '../../../reducers/canvas';

function CustomizingShape() {
  const dispatch = useAppDispatch();
  const { className, color, borderWidth, borderColor, borderStyle } = useAppSelector(
    (state) => ({
      className: state.canvas.selectedItem.className,
      color: state.canvas.selectedItem.styles.color,
      borderWidth: state.canvas.selectedItem.styles.borderWidth,
      borderStyle: state.canvas.selectedItem.styles.borderStyle,
      borderColor: state.canvas.selectedItem.styles.borderColor,
    }),
    shallowEqual,
  );

  return (
    <>
      <div className='customizing-title'>
        <span>
          {className === 'rectangle' && '사각형'}
          {className === 'circle' && '원'}
        </span>
      </div>

      <div className='customizing-board'>
        <label htmlFor='color'>
          <div>색상</div>
          <input
            type='color'
            value={color}
            onChange={(event) => dispatch(modifyCanvasItemStyle({ color: event.target.value }))}
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

import { modifyElement } from '../../../reducers/canvas';
import { useAppDispatch } from '../../../store';

import { Input } from '../../../hooks/useInput';

import { CanvasElement } from '../../../type/canvas';

type Props = { selectedItem: CanvasElement; color: Input; fontSize: Input };

function CustomizingText({ selectedItem, color, fontSize }: Props) {
  const dispatch = useAppDispatch();

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
              value={color.value}
              onChange={(event) => {
                const { value: changedValue } = event.target;
                color.onChange(event);

                dispatch(modifyElement({ selectedItem, changedValues: { color: changedValue } }));
              }}
            />
          </label>

          <div className='content'>
            <label htmlFor='font-size'>
              <div>텍스트 크기</div>
              <select
                value={fontSize.value}
                onChange={(event) => {
                  const { value: changedValue } = event.target;

                  fontSize.onChange(event);

                  dispatch(
                    modifyElement({
                      selectedItem,
                      changedValues: { fontSize: changedValue },
                    }),
                  );
                }}
              >
                <option>12px</option>
                <option>14px</option>
                <option>16px</option>
                <option>18px</option>
                <option>20px</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomizingText;

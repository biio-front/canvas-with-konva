import { modifyElement, modifySelectedItem } from '../../../reducers/canvas';
import { useAppDispatch } from '../../../store';

import { Input } from '../../../hooks/useInput';

type Props = {
  color: Input;
  fontSize: Input;
  fontFamily: Input;
  fontWeight: Input;
};

function CustomizingText({ color, fontSize, fontFamily, fontWeight }: Props) {
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
                dispatch(modifyElement({ color: changedValue }));
                dispatch(modifySelectedItem({ color: changedValue }));
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

                  fontFamily.onChange(event);
                  dispatch(modifyElement({ fontSize: changedValue }));
                  dispatch(modifySelectedItem({ fontSize: changedValue }));
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

        <div className='content'>
          <label htmlFor='font-family'>
            <div>폰트</div>
            <select
              value={fontFamily.value}
              onChange={(event) => {
                const { value: changedValue } = event.target;

                fontFamily.onChange(event);
                dispatch(modifyElement({ fontFamily: changedValue }));
                dispatch(modifySelectedItem({ fontFamily: changedValue }));
              }}
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
              value={fontWeight.value}
              onChange={(event) => {
                const { value: changedValue } = event.target;

                fontWeight.onChange(event);
                dispatch(modifyElement({ fontWeight: changedValue }));
                dispatch(modifySelectedItem({ fontWeight: changedValue }));
              }}
            >
              <option>lighter</option>
              <option>normal</option>
              <option>bolder</option>
            </select>
          </label>
        </div>
      </div>
    </>
  );
}

export default CustomizingText;

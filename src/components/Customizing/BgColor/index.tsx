import { modifyBackground } from '../../../reducers/canvas';
import { useAppDispatch } from '../../../store';

import useInput from '../../../hooks/useInput';

import { Background } from '../../../type/canvas';

type Props = {
  background: Background;
};

function CustomizingBgColor({ background }: Props) {
  const dispatch = useAppDispatch();
  const bgColor = useInput(background.color);

  return (
    <>
      <div className='customizing-title'>
        <span>카드 배경 색상</span>
      </div>

      <div className='customizing-board'>
        <div className='content'>
          <label htmlFor='color'>
            <div>배경 색상</div>
            <input
              type='color'
              value={bgColor.value}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                bgColor.onChange(event);
                dispatch(modifyBackground({ color: event.target.value }));
              }}
            />
          </label>
        </div>
      </div>
    </>
  );
}

export default CustomizingBgColor;

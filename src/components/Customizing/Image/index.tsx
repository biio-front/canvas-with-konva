import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../store';

import { changeStyle } from '../../../functions/customizing';

function CustomizingImage() {
  const dispatch = useAppDispatch();
  const { src } = useAppSelector(
    (state) => ({
      src: state.canvas.selectedItem.image?.src || '',
    }),
    shallowEqual,
  );

  return (
    <>
      <div className='customizing-title'>
        <span>사진</span>
      </div>

      <div className='customizing-board'>
        <label htmlFor='color'>
          <div>색상</div>
          <input
            type='color'
            value={src}
            onChange={(event) => changeStyle(event, dispatch, 'color')}
          />
        </label>
      </div>
    </>
  );
}

export default CustomizingImage;

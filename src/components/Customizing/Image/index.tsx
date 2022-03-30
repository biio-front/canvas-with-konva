import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../store';

import { changeStyle } from '../../../functions/customizing';
import { useImageInput } from '../../../hooks/useImageInput';
import { modifyElement, modifySelectedItemImage } from '../../../reducers/canvas';

function CustomizingImage() {
  const dispatch = useAppDispatch();

  const { src, borderWidth, borderColor, borderStyle } = useAppSelector(
    (state) => ({
      src: state.canvas.selectedItem.image?.src || '',
      borderWidth: state.canvas.selectedItem.styles.borderWidth,
      borderColor: state.canvas.selectedItem.styles.borderColor,
      borderStyle: state.canvas.selectedItem.styles.borderStyle,
    }),
    shallowEqual,
  );

  const { onChange } = useImageInput(src);

  return (
    <>
      <div className='customizing-title'>
        <span>사진</span>
      </div>

      <div className='customizing-board'>
        <label htmlFor='border-color'>
          <div>사진 변경</div>
          <input
            type='file'
            accept='image/*'
            onChange={(event) => {
              const targetFile = event.target.files || [];
              const changedFile = targetFile[0];

              if (changedFile) {
                onChange(event);

                const reader = new FileReader();

                reader.readAsDataURL(changedFile);
                reader.onload = (readEvent: any) => {
                  const image = {
                    src: readEvent.target.result,
                    alt: changedFile.name,
                  };

                  dispatch(modifyElement({ type: 'image', changedValues: image }));
                  dispatch(modifySelectedItemImage(image));
                };
              }
            }}
          />
        </label>

        <label htmlFor='border-color'>
          <div>외곽선</div>
          <select
            value={borderWidth}
            onChange={(event) => changeStyle(event, dispatch, 'borderWidth')}
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
            onChange={(event) => changeStyle(event, dispatch, 'borderColor')}
          />
        </label>

        <label htmlFor='border-width'>
          <div>외곽선 종류</div>
          <select
            value={borderStyle}
            onChange={(event) => changeStyle(event, dispatch, 'borderStyle')}
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

export default CustomizingImage;

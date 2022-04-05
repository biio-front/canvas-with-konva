import { shallowEqual } from 'react-redux';

import { modifyCanvasItemImage, modifyCanvasItemStyle } from '../../../reducers/canvas';
import { useAppDispatch, useAppSelector } from '../../../store';

import { useImageInput } from '../../../hooks/useImageInput';

function CustomizingImage() {
  const dispatch = useAppDispatch();

  const { src, borderWidth, borderColor, borderStyle } = useAppSelector(
    (state) => ({
      src: state.canvas.selectedItem.image?.src || '',
      borderWidth: state.canvas.selectedItem.attrs.borderWidth,
      borderColor: state.canvas.selectedItem.attrs.borderColor,
      borderStyle: state.canvas.selectedItem.attrs.borderStyle,
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

                  dispatch(modifyCanvasItemImage(image));
                };
              }
            }}
          />
        </label>

        <label htmlFor='border-width'>
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

        <label htmlFor='border-color'>
          <div>외곽선 색상</div>
          <input
            type='color'
            value={borderColor}
            onChange={(event) =>
              dispatch(modifyCanvasItemStyle({ borderColor: event.target.value }))
            }
          />
        </label>

        <label htmlFor='border-style'>
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

export default CustomizingImage;

import { useRef } from 'react';
import { shallowEqual } from 'react-redux';
import { useImageInput } from '../../hooks/useImageInput';

import { addElement, deleteElement, modifyBackground, selectItem } from '../../reducers/canvas';
import { useAppDispatch, useAppSelector } from '../../store';

import './index.scss';

function AddingBoard() {
  const dispatch = useAppDispatch();
  const { canvasElements, background, deletedCount } = useAppSelector(
    (state) => ({
      canvasElements: state.canvas.canvas.items,
      background: state.canvas.canvas.background,
      deletedCount: state.canvas.deletedCount,
    }),
    shallowEqual,
  );

  const INITIAL_ITEM = {
    type: '',
    className: '',
    id: '',
    styles: { posX: 20, posY: 20, zIndex: 0 },
  };

  const { onChange } = useImageInput('');

  const bgColorRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const onClickHiddenInput = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (!inputRef?.current) {
      return;
    }

    inputRef.current.click();
  };

  const newElementIndex = canvasElements.length + deletedCount;
  const newElementZIndex = canvasElements.length;

  return (
    <div className='adding-board'>
      <div className='adding-buttons'>
        <div className='bg-color-button'>
          <button
            className='paint'
            type='button'
            onClick={() => {
              dispatch(selectItem(INITIAL_ITEM));
              onClickHiddenInput(bgColorRef);
            }}
          >
            <span className='material-icons'>format_color_fill</span>
          </button>
          <input
            className='bg-color-input'
            type='color'
            value={background.color}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(modifyBackground({ color: event.target.value }));
            }}
            ref={bgColorRef}
          />
        </div>

        <button
          className='text'
          type='button'
          onClick={() => {
            const element = {
              type: 'text',
              className: 'text',
              id: `item-${newElementIndex}`,
              styles: { posX: 20, posY: 20, width: 100, height: 30, zIndex: newElementZIndex },
            };

            dispatch(addElement(element));
            dispatch(selectItem(element));
          }}
        >
          <span className='material-icons'>text_fields</span>
        </button>

        <button
          className='rectangle'
          type='button'
          onClick={() => {
            const element = {
              type: 'shape',
              className: 'rectangle',
              id: `item-${newElementIndex}`,
              styles: {
                posX: 20,
                posY: 20,
                width: 100,
                height: 100,
                zIndex: newElementZIndex,
                color: '#888888',
                borderWidth: '0',
                borderStyle: 'solid',
                borderColor: '#000000',
              },
            };

            dispatch(addElement(element));
            dispatch(selectItem(element));
          }}
        >
          <span className='material-icons'>rectangle</span>
        </button>

        <button
          className='circle'
          type='button'
          onClick={() => {
            const element = {
              type: 'shape',
              className: 'circle',
              id: `item-${newElementIndex}`,
              styles: {
                posX: 20,
                posY: 20,
                width: 100,
                height: 100,
                zIndex: newElementZIndex,
                color: '#888888',
                borderWidth: '0',
                borderStyle: 'solid',
                borderColor: '#000000',
              },
            };

            dispatch(addElement(element));
            dispatch(selectItem(element));
          }}
        >
          <span className='material-icons'>lens</span>
        </button>

        <button className='image' type='button' onClick={() => onClickHiddenInput(imageRef)}>
          <span className='material-icons'>image</span>
          <input
            type='file'
            accept='image/*'
            hidden
            ref={imageRef}
            onChange={(event) => {
              const targetFile = event.target.files || [];
              const changedFile = targetFile[0];

              if (changedFile) {
                onChange(event);

                const reader = new FileReader();

                reader.readAsDataURL(changedFile);
                reader.onload = (readEvent: any) => {
                  const element = {
                    type: 'image',
                    className: 'image',
                    id: `item-${newElementIndex}`,
                    styles: {
                      posX: 20,
                      posY: 20,
                      width: 200,
                      height: 200,
                      zIndex: newElementZIndex,
                      borderWidth: '0',
                      borderStyle: 'solid',
                      borderColor: '#000000',
                    },
                    image: {
                      src: readEvent.target.result,
                      alt: changedFile.name,
                    },
                  };

                  dispatch(addElement(element));
                  dispatch(selectItem(element));
                };
              }
            }}
          />
        </button>
      </div>

      <div className='delete-button'>
        <button type='button' onClick={() => dispatch(deleteElement())}>
          <span className='material-icons'>delete</span>
        </button>
      </div>
    </div>
  );
}

export default AddingBoard;

import { useState } from 'react';
import { shallowEqual } from 'react-redux';

import { addElement, modifyBackground, selectItem } from '../../reducers/canvas';
import { useAppDispatch, useAppSelector } from '../../store';

import './index.scss';

function AddingBoard() {
  const dispatch = useAppDispatch();
  const { canvasElements, background } = useAppSelector(
    (state) => ({
      canvasElements: state.canvas.canvas.items,
      background: state.canvas.canvas.background,
    }),
    shallowEqual,
  );

  const INITIAL_ITEM = {
    type: '',
    className: '',
    id: '',
    styles: { posX: 20, posY: 20, zIndex: 0 },
  };

  const [toggle, setToggle] = useState(false);

  return (
    <div className='adding-board'>
      <div className='bg-color-button'>
        <button
          className='paint'
          type='button'
          onClick={() => {
            dispatch(selectItem(INITIAL_ITEM));
            setToggle((prev) => !prev);
          }}
        >
          <span className='material-icons'>format_color_fill</span>
        </button>

        {toggle && (
          <input
            className='bg-color-input'
            type='color'
            value={background.color}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setToggle(false);
              dispatch(modifyBackground({ color: event.target.value }));
            }}
          />
        )}
      </div>

      <button
        className='text'
        type='button'
        onClick={() => {
          const element = {
            type: 'text',
            className: 'text',
            id: `item-${canvasElements.length}`,
            styles: { posX: 20, posY: 20, width: 100, height: 30, zIndex: canvasElements.length },
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
            id: `item-${canvasElements.length}`,
            styles: {
              posX: 20,
              posY: 20,
              width: 100,
              height: 100,
              zIndex: canvasElements.length,
              color: '#888888',
              borderWidth: 'none',
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
            id: `item-${canvasElements.length}`,
            styles: {
              posX: 20,
              posY: 20,
              width: 100,
              height: 100,
              zIndex: canvasElements.length,
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
    </div>
  );
}

export default AddingBoard;

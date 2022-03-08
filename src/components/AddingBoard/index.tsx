import { shallowEqual } from 'react-redux';

import { addElement } from '../../reducers/canvas';
import { useAppDispatch, useAppSelector } from '../../store';

import './index.scss';

type Props = { setMode: Function; selectItem: Function; resetValues: Function };

function AddingBoard({ setMode, selectItem, resetValues }: Props) {
  const dispatch = useAppDispatch();
  const canvasElements = useAppSelector((state) => state.canvas.canvasElements, shallowEqual);

  return (
    <div className='adding-board'>
      <button className='paint' type='button' onClick={() => setMode('bg-color')}>
        <span className='material-icons'>format_color_fill</span>
      </button>

      <button
        className='text'
        type='button'
        onClick={() => {
          setMode('text');

          const element = {
            className: 'text',
            id: canvasElements.length.toString(),
            styles: { posX: 20, posY: 20 },
          };

          resetValues();
          dispatch(addElement(element));
          selectItem(element);
        }}
      >
        <span className='material-icons'>text_fields</span>
      </button>
    </div>
  );
}

export default AddingBoard;

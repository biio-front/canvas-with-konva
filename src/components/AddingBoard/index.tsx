import { shallowEqual } from 'react-redux';

import { addElement, selectItem } from '../../reducers/canvas';
import { useAppDispatch, useAppSelector } from '../../store';

import './index.scss';

type Props = { setMode: Function; resetValues: Function };

function AddingBoard({ setMode, resetValues }: Props) {
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
          dispatch(selectItem(element));
        }}
      >
        <span className='material-icons'>text_fields</span>
      </button>
    </div>
  );
}

export default AddingBoard;

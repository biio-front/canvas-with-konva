import { modifyCanvasItemText } from '../../../reducers/canvas';
import { useAppDispatch } from '../../../store';

import { CanvasElement } from '../../../type/canvas';

import './index.scss';

type Props = {
  onClick: Function;
  element: CanvasElement;
};

function CanvasText({ onClick, element }: Props) {
  const dispatch = useAppDispatch();

  return (
    <textarea
      className='canvas-text'
      id={element.id}
      style={{
        color: element.styles.color || '000000',
        fontWeight: element.styles.fontWeight || 'normal',
        fontSize: element.styles.fontSize || '16px',
        fontFamily: element.styles.fontFamily || 'sans-serif',
        textAlign: element.styles.textAlign || 'left',
      }}
      autoComplete='off'
      value={element.text || ''}
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        dispatch(modifyCanvasItemText(value));
      }}
      onClick={(event) => onClick(event)}
    />
  );
}

export default CanvasText;

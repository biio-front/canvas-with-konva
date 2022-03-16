import { modifyElement, modifySelectedItemText } from '../../../reducers/canvas';
import { useAppDispatch } from '../../../store';
import { ElementStyle } from '../../../type/canvas';
import './index.scss';

type Props = {
  onClickText: Function;
  elementId: string;
  styles: ElementStyle;
  text: string;
};

function CanvasText({ onClickText, elementId, styles, text }: Props) {
  const dispatch = useAppDispatch();

  return (
    <input
      type='textarea'
      className='canvas-text'
      id={elementId}
      style={{
        color: styles?.color || '000000',
        fontWeight: styles?.fontWeight || 'normal',
        fontSize: styles?.fontSize || '16px',
        fontFamily: styles?.fontFamily || 'sans-serif',
        textAlign: styles?.textAlign || 'left',
      }}
      autoComplete='off'
      value={text || ''}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        dispatch(modifyElement(value));
        dispatch(modifySelectedItemText(value));
      }}
      onClick={(event) => onClickText(event)}
    />
  );
}

export default CanvasText;

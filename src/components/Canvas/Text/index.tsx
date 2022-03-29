import { modifyElement, modifySelectedItemText, selectItem } from '../../../reducers/canvas';
import {
  setColor,
  setFontFamily,
  setFontSize,
  setFontWeight,
} from '../../../reducers/canvasCustom';
import { useAppDispatch } from '../../../store';

import { CanvasElement } from '../../../type/canvas';

import './index.scss';

type Props = {
  onClick: Function;
  element: CanvasElement;
};

function CanvasText({ onClick, element }: Props) {
  const dispatch = useAppDispatch();

  const onClickText = (event: React.MouseEvent | React.DragEvent) => {
    onClick(event);

    dispatch(setColor(element.styles.color));
    dispatch(setFontSize(element.styles.fontSize));
    dispatch(setFontFamily(element.styles.fontFamily));
    dispatch(setFontWeight(element.styles.fontWeight || 'normal'));
    dispatch(selectItem(element));
  };
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

        dispatch(modifyElement(value));
        dispatch(modifySelectedItemText(value));
      }}
      onClick={(event) => onClickText(event)}
    />
  );
}

export default CanvasText;

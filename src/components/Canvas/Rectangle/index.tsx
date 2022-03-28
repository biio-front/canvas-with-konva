/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ElementStyle } from '../../../type/canvas';
import './index.scss';

type Props = {
  onClickRectangle: Function;
  elementId: string;
  styles: ElementStyle;
};

function CanvasRectangle({ elementId, styles, onClickRectangle }: Props) {
  return (
    <div
      className='canvas-rectangle'
      id={elementId}
      style={{
        backgroundColor: styles?.color || '#000000',
        borderWidth: styles?.borderWidth || 'none',
        borderStyle: styles?.borderStyle || 'none',
        borderColor: styles?.borderColor || 'none',
      }}
      onClick={(event) => onClickRectangle(event)}
    />
  );
}

export default CanvasRectangle;

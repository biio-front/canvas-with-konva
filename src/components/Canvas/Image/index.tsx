/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { CanvasElement } from '../../../type/canvas';
import './index.scss';

type Props = {
  onClick: Function;
  element: CanvasElement;
};

function CanvasImage({ element, onClick }: Props) {
  return (
    <img
      className={`canvas-${element.className}`}
      id={element.id}
      src={element.image?.src || ''}
      alt={element.image?.alt || ''}
      style={{
        backgroundColor: element.styles.color,
        borderWidth: element.styles.borderWidth,
        borderStyle: element.styles.borderStyle,
        borderColor: element.styles.borderColor,
      }}
      onClick={(event) => onClick(event)}
      draggable={false}
    />
  );
}

export default CanvasImage;

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { CanvasElement } from '../../../type/canvas';
import './index.scss';

type Props = {
  onClickShape: Function;
  element: CanvasElement;
};

function CanvasShape({ element, onClickShape }: Props) {
  return (
    <div
      className={`canvas-${element.className}`}
      id={element.id}
      style={{
        backgroundColor: element.styles.color,
        borderWidth: element.styles.borderWidth,
        borderStyle: element.styles.borderStyle,
        borderColor: element.styles.borderColor,
      }}
      onClick={(event) => onClickShape(event)}
    />
  );
}

export default CanvasShape;

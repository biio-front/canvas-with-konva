/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { selectItem } from '../../../reducers/canvas';
import { setColor } from '../../../reducers/canvasCustom';
import { useAppDispatch } from '../../../store';

import { CanvasElement } from '../../../type/canvas';
import './index.scss';

type Props = {
  onClick: Function;
  element: CanvasElement;
};

function CanvasShape({ element, onClick }: Props) {
  const dispatch = useAppDispatch();

  const onClickShape = (event: React.MouseEvent | React.DragEvent) => {
    onClick(event);

    dispatch(setColor(element.styles.color));
    dispatch(selectItem(element));
  };

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

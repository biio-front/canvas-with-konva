import { shallowEqual } from 'react-redux';
import { Layer, Stage, Text } from 'react-konva';

import { useAppDispatch, useAppSelector } from '../../store';

import './index.scss';
import { selectItem } from '../../reducers/canvas';

type Props = { stageRef: React.MutableRefObject<any> };

function Canvas({ stageRef }: Props) {
  const dispatch = useAppDispatch();

  const { canvasElements } = useAppSelector(
    (state) => ({
      background: state.canvas.canvas.background,
      canvasElements: state.canvas.canvas.items,
      selectedItem: state.canvas.selectedItem,
    }),
    shallowEqual,
  );

  return (
    <Stage width={300} height={500} className='canvas' ref={stageRef}>
      <Layer>
        {canvasElements.map((element) => {
          const onClick = () => {
            dispatch(selectItem(element));
          };

          if (element.className === 'Text') {
            return (
              <Text
                key={element.attrs.id}
                id={element.attrs.id}
                text={element.attrs.text}
                x={element.attrs.x}
                y={element.attrs.y}
                fill={element.attrs.fill}
                fontSize={element.attrs.fontSize}
                fontFamily={element.attrs.fontFamily}
                draggable
                onClick={onClick}
                onDragStart={onClick}
              />
            );
          }

          return <div key={element.attrs.id} />;
        })}
      </Layer>
    </Stage>
  );
}

export default Canvas;

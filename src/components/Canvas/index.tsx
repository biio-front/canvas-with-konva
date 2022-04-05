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

          if (element.type === 'text') {
            return (
              <Text
                key={element.id}
                id={element.id}
                text='canvas'
                x={element.styles.posX}
                y={element.styles.posY}
                width={100}
                fill={element.styles.color}
                fontSize={element.styles.fontSize}
                fontFamily={element.styles.fontFamily}
                draggable
                onClick={onClick}
                onDragStart={onClick}
              />
            );
          }

          return <div key={element.id} />;
        })}
      </Layer>
    </Stage>
  );
}

export default Canvas;

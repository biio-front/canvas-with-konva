import { shallowEqual } from 'react-redux';
import { Layer, Stage } from 'react-konva';

import TextCanvas from './Text/TextCanvas';
import ImageCanvas from './Image';

import { useAppDispatch, useAppSelector } from '../../store';
import { modifyCanvasItemStyle, selectItem } from '../../reducers/canvas';

import './index.scss';

type Props = { stageRef: React.MutableRefObject<any> };

function Canvas({ stageRef }: Props) {
  const dispatch = useAppDispatch();

  const { canvasElements, selectedItem } = useAppSelector(
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
          const isSelected = element.attrs.id === selectedItem.attrs.id;

          const onSelect = () => dispatch(selectItem(element));
          const onChange = (attrs: { [key: string]: string }) =>
            dispatch(modifyCanvasItemStyle(attrs));

          if (element.className === 'Text') {
            return (
              <TextCanvas
                key={element.attrs.id}
                isSelected={isSelected}
                element={element}
                onSelect={onSelect}
                onChange={onChange}
              />
            );
          }

          if (element.className === 'Image') {
            return (
              <ImageCanvas
                key={element.attrs.id}
                isSelected={isSelected}
                element={element}
                onSelect={onSelect}
                onChange={onChange}
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

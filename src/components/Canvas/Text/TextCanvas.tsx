import { useEffect, useRef } from 'react';
import { Text, Transformer } from 'react-konva';
import { CanvasElement } from '../../../type/canvas';

type Props = {
  isSelected: boolean;
  element: CanvasElement;
  onSelect: Function;
  onChange: Function;
};

function TextCanvas({ isSelected, element, onSelect, onChange }: Props) {
  const shapeRef = useRef<any>();
  const trRef = useRef<any>();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const onChangeEnd = () => {
    const node = shapeRef.current;

    const changedAttrs = {
      x: node.x(),
      y: node.y(),
    };

    onChange(changedAttrs);
  };

  return (
    <>
      <Text
        onClick={() => onSelect()}
        onTap={() => onSelect()}
        ref={shapeRef}
        {...element}
        draggable
        onDragStart={() => onSelect()}
        onDragEnd={() => onChangeEnd()}
        onTransformEnd={() => onChangeEnd()}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
}

export default TextCanvas;

import { useEffect, useRef } from 'react';
import { Image, Transformer } from 'react-konva';
import { CanvasElement } from '../../../type/canvas';

type Props = {
  isSelected: boolean;
  element: CanvasElement;
  onSelect: Function;
  onChange: Function;
};

function ImageCanvas({ isSelected, element, onSelect }: Props) {
  const shapeRef = useRef<any>();
  const trRef = useRef<any>();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const image = new window.Image();
  image.src = element.image?.src || '';

  return (
    <>
      <Image
        onClick={() => onSelect()}
        onTap={() => onSelect()}
        ref={shapeRef}
        {...element}
        image={image}
        draggable
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

export default ImageCanvas;

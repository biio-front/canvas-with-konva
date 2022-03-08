import { CanvasElement } from '../type/canvas';

export const getCanvasItemPosition = (event: React.DragEvent<HTMLInputElement>) => {
  const canvasElement = document.querySelector('#canvas')?.getBoundingClientRect();

  const startX = canvasElement?.left || 0;
  const startY = canvasElement?.top || 0;

  const posX = event.clientX;
  const posY = event.clientY;

  return { posX: posX - startX, posY: posY - startY };
};

export const changeElement = (
  elements: CanvasElement[],
  selectedItem: CanvasElement,
  changedValues: { [k in string]: string | number },
) => {
  const selectedIndex = Number(selectedItem.id);
  const changedSelectedElement = {
    ...selectedItem,
    styles: {
      ...selectedItem.styles,
      ...changedValues,
    },
  };

  const changedElements = [...elements];
  changedElements.splice(selectedIndex, 1, changedSelectedElement);

  return changedElements;
};

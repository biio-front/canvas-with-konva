import { CanvasElement } from '../type/canvas';

export const changeElement = (
  elements: CanvasElement[],
  selectedItem: CanvasElement,
  changedValues: { [k in string]: string | number },
) => {
  const selectedIndex = Number(selectedItem.id.split('-')[1]);
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

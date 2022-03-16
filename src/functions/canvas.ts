import { CanvasElement } from '../type/canvas';

export const changeElementStyle = (
  elements: CanvasElement[],
  selectedItem: CanvasElement,
  changedValues: { [k in string]: string | number },
) => {
  const changedSelectedElement = {
    ...selectedItem,
    styles: {
      ...selectedItem.styles,
      ...changedValues,
    },
  };

  const changedElements = changeElement(elements, selectedItem, changedSelectedElement);
  return changedElements;
};

export const changeElementText = (
  elements: CanvasElement[],
  selectedItem: CanvasElement,
  changedText: string,
) => {
  const changedSelectedElement = {
    ...selectedItem,
    text: changedText,
  };

  const changedElements = changeElement(elements, selectedItem, changedSelectedElement);
  return changedElements;
};

export const changeElement = (
  elements: CanvasElement[],
  selectedItem: CanvasElement,
  changedSelectedElement: CanvasElement,
) => {
  const selectedIndex = Number(selectedItem.id.split('-')[1]);
  const changedElements = [...elements];
  changedElements.splice(selectedIndex, 1, changedSelectedElement);

  return changedElements;
};

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

export const changeElementImage = (
  elements: CanvasElement[],
  selectedItem: CanvasElement,
  changedImage: { src: string; alt: string },
) => {
  const changedSelectedElement = {
    ...selectedItem,
    image: changedImage,
  };

  const changedElements = changeElement(elements, selectedItem, changedSelectedElement);
  return changedElements;
};

export const changeElement = (
  elements: CanvasElement[],
  selectedItem: CanvasElement,
  changedSelectedElement: CanvasElement,
) => {
  const selectedIndex = selectedItem.styles.zIndex;
  const changedElements = [...elements];
  changedElements.splice(selectedIndex, 1, changedSelectedElement);

  return changedElements;
};

export const changeElementOrder = (
  selectedIndex: number,
  canvasItems: CanvasElement[],
  selectedItem: CanvasElement,
  direction: 'up' | 'down',
): [CanvasElement[], CanvasElement] => {
  const changedCanvasItems = [...canvasItems];
  const switchedIndex = selectedIndex + (direction === 'up' ? 1 : -1);

  const changedSelectedItem = {
    ...selectedItem,
    styles: { ...selectedItem.styles, zIndex: switchedIndex },
  };
  const changedSwitchedItem = {
    ...changedCanvasItems[switchedIndex],
    styles: { ...changedCanvasItems[switchedIndex].styles, zIndex: selectedIndex },
  };

  changedCanvasItems.splice(switchedIndex, 1, changedSelectedItem);
  changedCanvasItems.splice(selectedIndex, 1, changedSwitchedItem);

  return [changedCanvasItems, changedSelectedItem];
};

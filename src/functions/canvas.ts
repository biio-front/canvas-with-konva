import { CanvasElement } from '../type/canvas';

export const changeElementStyle = (
  elements: CanvasElement[],
  selectedItem: CanvasElement,
  changedValues: { [k in string]: string | number },
) => {
  const changedSelectedElement = {
    ...selectedItem,
    attrs: {
      ...selectedItem.attrs,
      ...changedValues,
    },
  };

  const changedElements = changeElements(elements, selectedItem, changedSelectedElement);
  return changedElements;
};

export const changeElementText = (
  elements: CanvasElement[],
  selectedItem: CanvasElement,
  changedText: string,
) => {
  const changedSelectedElement = {
    ...selectedItem,
    attrs: {
      ...selectedItem.attrs,
      text: changedText,
    },
  };

  const changedElements = changeElements(elements, selectedItem, changedSelectedElement);
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

  const changedElements = changeElements(elements, selectedItem, changedSelectedElement);
  return changedElements;
};

export const changeElements = (
  elements: CanvasElement[],
  selectedItem: CanvasElement,
  changedSelectedElement: CanvasElement,
) => {
  const selectedIndex = selectedItem.attrs.zIndex;
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
    attrs: { ...selectedItem.attrs, zIndex: switchedIndex },
  };
  const changedSwitchedItem = {
    ...changedCanvasItems[switchedIndex],
    attrs: { ...changedCanvasItems[switchedIndex].attrs, zIndex: selectedIndex },
  };

  changedCanvasItems.splice(switchedIndex, 1, changedSelectedItem);
  changedCanvasItems.splice(selectedIndex, 1, changedSwitchedItem);

  return [changedCanvasItems, changedSelectedItem];
};

export const deleteElement = (canvasItems: CanvasElement[], selectedItemId: string) => {
  const changedCanvasItems = [...canvasItems];

  const selectedIndex = changedCanvasItems.findIndex((item) => item.attrs.id === selectedItemId);
  const selectedZIndex = changedCanvasItems[selectedIndex].attrs.zIndex;

  changedCanvasItems.splice(selectedIndex, 1);
  const deletedCanvasItems = changedCanvasItems.map((item) => {
    if (item.attrs.zIndex < selectedZIndex) {
      return item;
    } else {
      return { ...item, attrs: { ...item.attrs, zIndex: item.attrs.zIndex - 1 } };
    }
  });

  return deletedCanvasItems;
};

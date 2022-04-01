/* eslint-disable jsx-a11y/no-static-element-interactions */
import { DragEvent, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { modifyCanvasItemStyle, selectItem } from '../../reducers/canvas';

import CanvasText from './Text';
import CanvasShape from './Shape';

import { useAppDispatch, useAppSelector } from '../../store';

import { CanvasElement } from '../../type/canvas';

import './index.scss';
import CanvasImage from './Image';

function Canvas() {
  const dispatch = useAppDispatch();

  const { background, canvasElements, selectedItem } = useAppSelector(
    (state) => ({
      background: state.canvas.canvas.background,
      canvasElements: state.canvas.canvas.items,
      selectedItem: state.canvas.selectedItem,
    }),
    shallowEqual,
  );

  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [innerMouseX, setInnerMouseX] = useState<number>(0);
  const [innerMouseY, setInnerMouseY] = useState<number>(0);

  const resize = (
    event: DragEvent,
    element: CanvasElement,
    directions: string[],
    kind: 'drag' | 'dragend',
  ) => {
    event.stopPropagation();
    const selectedElement = document.querySelector(
      '.canvas-element.selected',
    ) as HTMLElement | null;

    if (!selectedElement) {
      return;
    }

    if (directions.includes('n')) {
      const moveY = event.clientY - startY;
      const newHeight = element.styles.height - moveY;
      const newPosY = element.styles.posY + moveY;
      selectedElement.style.height = `${newHeight}px`;
      selectedElement.style.top = `${newPosY}px`;

      if (kind === 'dragend') {
        dispatch(modifyCanvasItemStyle({ posY: newPosY, height: newHeight }));
      }
    }

    if (directions.includes('w')) {
      const moveX = event.clientX - startX;
      const newWidth = element.styles.width - moveX;
      const newPosX = element.styles.posX + moveX;
      selectedElement.style.width = `${newWidth}px`;
      selectedElement.style.left = `${newPosX}px`;

      if (kind === 'dragend') {
        dispatch(modifyCanvasItemStyle({ posX: newPosX, width: newWidth }));
      }
    }

    if (directions.includes('e')) {
      const moveX = event.clientX - startX;
      const newWidth = element.styles.width + moveX;
      selectedElement.style.width = `${newWidth}px`;

      if (kind === 'dragend') {
        dispatch(modifyCanvasItemStyle({ width: newWidth }));
      }
    }

    if (directions.includes('s')) {
      const moveY = event.clientY - startY;
      const newHeight = element.styles.height + moveY;
      selectedElement.style.height = `${newHeight}px`;

      if (kind === 'dragend') {
        dispatch(modifyCanvasItemStyle({ height: newHeight }));
      }
    }
  };

  const onMouseDown = (event: React.MouseEvent, element: CanvasElement) => {
    const domSelectedItem = document.querySelector(`.canvas-element.${element.id}`);
    if (!domSelectedItem) {
      return;
    }

    const startInnerMouseX = event.clientX - domSelectedItem.getBoundingClientRect().left;
    const startInnerMouseY = event.clientY - domSelectedItem.getBoundingClientRect().top;

    setInnerMouseX(startInnerMouseX);
    setInnerMouseY(startInnerMouseY);
    dispatch(selectItem(element));
  };

  const onMouseMove = (event: React.MouseEvent) => {
    const canvas = document.querySelector('#canvas');

    if (!innerMouseX || !canvas) {
      return;
    }

    const cardX = canvas.getBoundingClientRect().left;
    const cardY = canvas.getBoundingClientRect().top;

    const posX = event.clientX - innerMouseX - cardX;
    const posY = event.clientY - innerMouseY - cardY;

    dispatch(modifyCanvasItemStyle({ posX, posY }));
  };

  return (
    <div
      className='canvas'
      id='canvas'
      style={{ background: background.color }}
      onMouseMove={onMouseMove}
      onMouseUp={(event: React.MouseEvent) => {
        onMouseMove(event);
        setInnerMouseX(0);
      }}
    >
      {canvasElements.map((element) => {
        const isSelected = selectedItem.id === element.id;

        const onClick = (event: React.MouseEvent | React.DragEvent) => {
          setStartX(event.clientX);
          setStartY(event.clientY);
          dispatch(selectItem(element));
        };

        return (
          <div
            key={element.id}
            className={`canvas-element ${isSelected ? 'selected' : ''} ${element.id}`}
            style={{
              left: element.styles.posX,
              top: element.styles.posY,
              width: element.styles.width,
              height: element.styles.height,
              zIndex: element.styles.zIndex,
            }}
            onMouseDown={(event: React.MouseEvent) => onMouseDown(event, element)}
          >
            {element.type === 'text' && <CanvasText onClick={onClick} element={element} />}

            {element.type === 'shape' && <CanvasShape element={element} onClick={onClick} />}

            {element.type === 'image' && <CanvasImage element={element} onClick={onClick} />}

            <div
              className='element-border n'
              onDrag={(event) => resize(event, element, ['n'], 'drag')}
              onDragEnd={(event) => resize(event, element, ['n'], 'dragend')}
              draggable
            />
            <div
              className='element-border w'
              onDrag={(event) => resize(event, element, ['w'], 'drag')}
              onDragEnd={(event) => resize(event, element, ['w'], 'dragend')}
              draggable
            />
            <div
              className='element-border e'
              onDrag={(event) => resize(event, element, ['e'], 'drag')}
              onDragEnd={(event) => resize(event, element, ['e'], 'dragend')}
              draggable
            />
            <div
              className='element-border s'
              onDrag={(event) => resize(event, element, ['s'], 'drag')}
              onDragEnd={(event) => resize(event, element, ['s'], 'dragend')}
              draggable
            />
            <div
              className='element-corner sw'
              onDrag={(event) => resize(event, element, ['s', 'w'], 'drag')}
              onDragEnd={(event) => resize(event, element, ['s', 'w'], 'dragend')}
              draggable
            />
            <div
              className='element-corner se'
              onDrag={(event) => resize(event, element, ['s', 'e'], 'drag')}
              onDragEnd={(event) => resize(event, element, ['s', 'e'], 'dragend')}
              draggable
            />
            <div
              className='element-corner nw'
              onDrag={(event) => resize(event, element, ['n', 'w'], 'drag')}
              onDragEnd={(event) => resize(event, element, ['n', 'w'], 'dragend')}
              draggable
            />
            <div
              className='element-corner ne'
              onDrag={(event) => resize(event, element, ['n', 'e'], 'drag')}
              onDragEnd={(event) => resize(event, element, ['n', 'e'], 'dragend')}
              draggable
            />
          </div>
        );
      })}
    </div>
  );
}

export default Canvas;

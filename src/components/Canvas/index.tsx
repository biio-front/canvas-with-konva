import { DragEvent, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { modifyElement, modifySelectedItem, selectItem } from '../../reducers/canvas';

import CanvasText from './Text';

import { useAppDispatch, useAppSelector } from '../../store';
import { setColor, setFontFamily, setFontSize, setFontWeight } from '../../reducers/canvasCustom';

import './index.scss';

type Props = { setMode: Function };

function Canvas({ setMode }: Props) {
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

  return (
    <div className='canvas' id='canvas' style={{ background: background.color }}>
      {canvasElements.map((element) => {
        const isSelected = selectedItem.id === element.id;

        const onClick = (event: React.MouseEvent | React.DragEvent) => {
          setStartX(event.clientX);
          setStartY(event.clientY);
        };

        const onDragEnd = (event: React.DragEvent) => {
          const prevPosX = element.styles.posX;
          const prevPosY = element.styles.posY;

          const moveX = event.clientX - startX;
          const moveY = event.clientY - startY;

          const posX = prevPosX + moveX;
          const posY = prevPosY + moveY;

          dispatch(modifySelectedItem({ posX, posY }));
          dispatch(modifyElement({ posX, posY }));
        };

        const onClickText = (event: React.MouseEvent | React.DragEvent) => {
          onClick(event);

          setMode('text');
          dispatch(setColor(element.styles.color));
          dispatch(setFontSize(element.styles.fontSize));
          dispatch(setFontFamily(element.styles.fontFamily));
          dispatch(setFontWeight(element.styles.fontWeight || 'normal'));
          dispatch(selectItem(element));
        };

        const resize = (event: DragEvent, directions: string[], kind: 'drag' | 'dragend') => {
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
              dispatch(modifyElement({ posY: newPosY, height: newHeight }));
              dispatch(modifySelectedItem({ posY: newPosY, height: newHeight }));
            }
          }

          if (directions.includes('w')) {
            const moveX = event.clientX - startX;
            const newWidth = element.styles.width - moveX;
            const newPosX = element.styles.posX + moveX;
            selectedElement.style.width = `${newWidth}px`;
            selectedElement.style.left = `${newPosX}px`;

            if (kind === 'dragend') {
              dispatch(modifyElement({ posX: newPosX, width: newWidth }));
              dispatch(modifySelectedItem({ posX: newPosX, width: newWidth }));
            }
          }

          if (directions.includes('e')) {
            const moveX = event.clientX - startX;
            const newWidth = element.styles.width + moveX;
            selectedElement.style.width = `${newWidth}px`;

            if (kind === 'dragend') {
              dispatch(modifyElement({ width: newWidth }));
              dispatch(modifySelectedItem({ width: newWidth }));
            }
          }

          if (directions.includes('s')) {
            const moveY = event.clientY - startY;
            const newHeight = element.styles.height + moveY;
            selectedElement.style.height = `${newHeight}px`;

            if (kind === 'dragend') {
              dispatch(modifyElement({ height: newHeight }));
              dispatch(modifySelectedItem({ height: newHeight }));
            }
          }
        };

        return (
          <div
            key={element.id}
            className={`canvas-element ${isSelected ? 'selected' : ''}`}
            style={{
              left: element.styles.posX,
              top: element.styles.posY,
              width: element.styles.width,
              height: element.styles.height,
            }}
            onDragStart={onClickText}
            onDragEnd={onDragEnd}
            draggable
          >
            {element.className === 'text' && (
              <CanvasText
                onClickText={onClickText}
                elementId={element.id}
                styles={element.styles}
                text={element.text || ''}
              />
            )}

            {element.className !== 'text' && <div key={element.id} />}

            <div
              className='element-border n'
              onDrag={(event) => resize(event, ['n'], 'drag')}
              onDragEnd={(event) => resize(event, ['n'], 'dragend')}
              draggable
            />
            <div
              className='element-border w'
              onDrag={(event) => resize(event, ['w'], 'drag')}
              onDragEnd={(event) => resize(event, ['w'], 'dragend')}
              draggable
            />
            <div
              className='element-border e'
              onDrag={(event) => resize(event, ['e'], 'drag')}
              onDragEnd={(event) => resize(event, ['e'], 'dragend')}
              draggable
            />
            <div
              className='element-border s'
              onDrag={(event) => resize(event, ['s'], 'drag')}
              onDragEnd={(event) => resize(event, ['s'], 'dragend')}
              draggable
            />
            <div
              className='element-corner sw'
              onDrag={(event) => resize(event, ['s', 'w'], 'drag')}
              onDragEnd={(event) => resize(event, ['s', 'w'], 'dragend')}
              draggable
            />
            <div
              className='element-corner se'
              onDrag={(event) => resize(event, ['s', 'e'], 'drag')}
              onDragEnd={(event) => resize(event, ['s', 'e'], 'dragend')}
              draggable
            />
            <div
              className='element-corner nw'
              onDrag={(event) => resize(event, ['n', 'w'], 'drag')}
              onDragEnd={(event) => resize(event, ['n', 'w'], 'dragend')}
              draggable
            />
            <div
              className='element-corner ne'
              onDrag={(event) => resize(event, ['n', 'e'], 'drag')}
              onDragEnd={(event) => resize(event, ['n', 'e'], 'dragend')}
              draggable
            />
          </div>
        );
      })}
    </div>
  );
}

export default Canvas;

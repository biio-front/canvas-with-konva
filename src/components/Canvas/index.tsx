import { useState } from 'react';
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

        return (
          <div
            key={element.id}
            className={`canvas-element ${isSelected ? 'selected' : ''}`}
            style={{ left: element.styles.posX, top: element.styles.posY }}
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

            <div className='element-border n' />
            <div className='element-border w' />
            <div className='element-border e' />
            <div className='element-border s' />
            <div className='element-corner sw' />
            <div className='element-corner se' />
            <div className='element-corner nw' />
            <div className='element-corner ne' />
          </div>
        );
      })}
    </div>
  );
}

export default Canvas;

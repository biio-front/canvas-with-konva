import { useState } from 'react';
import { shallowEqual } from 'react-redux';

import Customizing from '../components/Customizing';
import CustomizingText from '../components/Customizing/Text';
import CustomizingBgColor from '../components/Customizing/BgColor';
import AddingBoard from '../components/AddingBoard';

import { modifyElement, modifySelectedItem, selectItem } from '../reducers/canvas';
import { useAppDispatch, useAppSelector } from '../store';

import useInput from '../hooks/useInput';

import '../styles/Playground.scss';

function Playground() {
  const dispatch = useAppDispatch();
  const { background, canvasElements, selectedItem } = useAppSelector(
    (state) => ({
      background: state.canvas.canvas.background,
      canvasElements: state.canvas.canvas.items,
      selectedItem: state.canvas.selectedItem,
    }),
    shallowEqual,
  );

  const [mode, setMode] = useState<string>('');

  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);

  const color = useInput('');
  const fontSize = useInput('16px');
  const fontFamily = useInput('sans-serif');
  const fontWeight = useInput('normal');
  const textAlign = useInput('left');

  const resetValues = () => {
    color.setValue('');
    fontSize.setValue('16px');
  };

  return (
    <div className='playground'>
      <div className='container'>
        {mode === '' && <Customizing />}
        {mode === 'bg-color' && <CustomizingBgColor background={background} />}
        {mode === 'text' && (
          <CustomizingText
            color={color}
            fontSize={fontSize}
            fontFamily={fontFamily}
            fontWeight={fontWeight}
            textAlign={textAlign}
          />
        )}
      </div>

      <div className='container adding'>
        <AddingBoard setMode={setMode} resetValues={resetValues} />

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

            if (element.className === 'text') {
              const onClickText = (event: React.MouseEvent | React.DragEvent) => {
                onClick(event);

                setMode('text');
                color.setValue(element.styles?.color || '000000');
                fontSize.setValue(element.styles?.fontSize || '16px');
                fontFamily.setValue(element.styles?.fontFamily || 'sans-serif');
                fontWeight.setValue(element.styles?.fontWeight || 'normal');
                dispatch(selectItem(element));
              };

              return (
                <input
                  type='text'
                  className={`text ${isSelected ? 'selected' : ''}`}
                  key={element.id}
                  id={element.id || 'item-0'}
                  style={{
                    left: element.styles.posX,
                    top: element.styles.posY,
                    color: element.styles?.color || '000000',
                    fontWeight: element.styles?.fontWeight || 'normal',
                    fontSize: element.styles?.fontSize || '16px',
                    fontFamily: element.styles?.fontFamily || 'sans-serif',
                    textAlign: element.styles?.textAlign || 'left',
                  }}
                  autoComplete='off'
                  onClick={(event) => onClickText(event)}
                  onDragStart={(event) => onClickText(event)}
                  onDragEnd={(event) => onDragEnd(event)}
                  draggable
                />
              );
            }

            return <div key={element.id} className={`${isSelected ? 'selected' : ''}`} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Playground;

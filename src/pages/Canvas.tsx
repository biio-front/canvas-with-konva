import { useState } from 'react';
import { shallowEqual } from 'react-redux';

import Customizing from '../components/Customizing';
import CustomizingText from '../components/Customizing/Text';
import CustomizingBgColor from '../components/Customizing/BgColor';
import AddingBoard from '../components/AddingBoard';

import { modifyElement, modifySelectedItem, selectItem } from '../reducers/canvas';
import { useAppDispatch, useAppSelector } from '../store';

import useInput from '../hooks/useInput';
import { getCanvasItemPosition } from '../functions/canvas';

import '../styles/Canvas.scss';

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

  const [mode, setMode] = useState<string>('');
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
    <div className='card-canvas'>
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

            if (element.className === 'text') {
              const onClick = () => {
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
                    left: element.styles?.posX || 0,
                    top: element.styles?.posY || 0,
                    color: element.styles?.color || '000000',
                    fontWeight: element.styles?.fontWeight || 'normal',
                    fontSize: element.styles?.fontSize || '16px',
                    fontFamily: element.styles?.fontFamily || 'sans-serif',
                    textAlign: element.styles?.textAlign || 'left',
                  }}
                  autoComplete='off'
                  onClick={onClick}
                  onDragStart={onClick}
                  onDragEnd={(event) => {
                    const { posX, posY } = getCanvasItemPosition(event);

                    dispatch(modifySelectedItem({ posX, posY }));
                    dispatch(modifyElement({ posX, posY }));
                  }}
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

export default Canvas;

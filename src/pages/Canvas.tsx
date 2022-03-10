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
  const { canvasElements, selectedItem } = useAppSelector(
    (state) => ({
      canvasElements: state.canvas.canvasElements,
      selectedItem: state.canvas.selectedItem,
    }),
    shallowEqual,
  );

  const [mode, setMode] = useState<string>('');
  const bgColor = useInput('#ffffff');
  const color = useInput('');
  const fontSize = useInput('16px');

  const resetValues = () => {
    color.setValue('');
    fontSize.setValue('16px');
  };

  return (
    <div className='card-canvas'>
      <div className='container'>
        {mode === '' && <Customizing />}
        {mode === 'bg-color' && <CustomizingBgColor bgColor={bgColor} />}
        {mode === 'text' && (
          <CustomizingText selectedItem={selectedItem} color={color} fontSize={fontSize} />
        )}
      </div>

      <div className='container adding'>
        <AddingBoard setMode={setMode} resetValues={resetValues} />

        <div className='canvas' id='canvas' style={{ background: bgColor.value }}>
          {canvasElements.map((element) => {
            const isSelected = selectedItem.id === element.id;

            if (element.className === 'text') {
              return (
                <input
                  type='text'
                  className={`text ${isSelected ? 'selected' : ''}`}
                  key={element.id}
                  id={element.id || '0'}
                  style={{
                    fontSize: element.styles?.fontSize || '16px',
                    color: element.styles?.color || '000000',
                    left: element.styles?.posX || 0,
                    top: element.styles?.posY || 0,
                  }}
                  autoComplete='off'
                  onClick={() => {
                    setMode('text');
                    color.setValue(element.styles?.color || '000000');
                    fontSize.setValue(element.styles?.fontSize || '16px');
                    selectItem(element);
                  }}
                  onDragStart={() => {
                    color.setValue(element.styles?.color || '000000');
                    selectItem(element);
                  }}
                  onDragEnd={(event) => {
                    const { posX, posY } = getCanvasItemPosition(event);

                    modifySelectedItem({ posX, posY });
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

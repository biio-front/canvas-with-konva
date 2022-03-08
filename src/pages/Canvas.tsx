import { useState } from 'react';
import { shallowEqual } from 'react-redux';

import CustomizingText from '../components/Customizing/Text';
import CustomizingBgColor from '../components/Customizing/BgColor';
import AddingBoard from '../components/AddingBoard';

import { modifyElement } from '../reducers/canvas';
import { useAppDispatch, useAppSelector } from '../store';

import useInput from '../hooks/useInput';
import { getCanvasItemPosition } from '../functions/canvas';

import { CanvasElement } from '../type/canvas';

import '../styles/Canvas.scss';

function Canvas() {
  const dispatch = useAppDispatch();
  const canvasElements = useAppSelector((state) => state.canvas.canvasElements, shallowEqual);

  const [mode, setMode] = useState<string>('');
  const [selectedItem, selectItem] = useState<CanvasElement>({
    className: '',
    id: '',
    styles: { posX: 20, posY: 20 },
  });
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
        {mode === '' && (
          <>
            <div className='customizing-title' />
            <div className='customizing-board' />
          </>
        )}
        {mode === 'bg-color' && <CustomizingBgColor bgColor={bgColor} />}
        {mode === 'text' && (
          <CustomizingText selectedItem={selectedItem} color={color} fontSize={fontSize} />
        )}
      </div>

      <div className='container adding'>
        <AddingBoard setMode={setMode} selectItem={selectItem} resetValues={resetValues} />

        <div className='canvas' id='canvas' style={{ background: bgColor.value }}>
          {canvasElements.map((element) => {
            if (element.className === 'text') {
              return (
                <input
                  type='text'
                  className='text added'
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

                    selectItem({ ...selectedItem, styles: { ...selectedItem.styles, posX, posY } });
                    dispatch(modifyElement({ selectedItem, changedValues: { posX, posY } }));
                  }}
                  draggable
                />
              );
            }

            return <div key={element.id} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Canvas;

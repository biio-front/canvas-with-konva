import { useState } from 'react';
import { shallowEqual } from 'react-redux';

import { addElement, modifyElement } from '../reducers/canvas';
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

  return (
    <div className='card-canvas'>
      <div className='container'>
        <div className='customizing-title'>
          <span>{mode === 'bg-color' && '카드 배경 색상'}</span>
          <span>{mode === 'text' && '텍스트'}</span>
        </div>

        <div className='customizing-board'>
          {mode === 'bg-color' && (
            <div>
              <div className='content'>
                <label htmlFor='color'>
                  <div>배경 색상</div>
                  <input type='color' value={bgColor.value} onChange={bgColor.onChange} />
                </label>
              </div>
            </div>
          )}

          {mode === 'text' && (
            <div className='text'>
              <div className='content'>
                <label htmlFor='color'>
                  <div>텍스트 색상</div>
                  <input
                    type='color'
                    value={color.value}
                    onChange={(event) => {
                      const { value: changedValue } = event.target;
                      color.onChange(event);

                      dispatch(
                        modifyElement({ selectedItem, changedValues: { color: changedValue } }),
                      );
                    }}
                  />
                </label>

                <div className='content'>
                  <label htmlFor='font-size'>
                    <div>텍스트 크기</div>
                    <select
                      value={fontSize.value}
                      onChange={(event) => {
                        const { value: changedValue } = event.target;

                        fontSize.onChange(event);

                        dispatch(
                          modifyElement({
                            selectedItem,
                            changedValues: { fontSize: changedValue },
                          }),
                        );
                      }}
                    >
                      <option>12px</option>
                      <option>14px</option>
                      <option>16px</option>
                      <option>18px</option>
                      <option>20px</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='container adding'>
        <div className='adding-board'>
          <button className='paint' type='button' onClick={() => setMode('bg-color')}>
            <span className='material-icons'>format_color_fill</span>
          </button>

          <button
            className='text'
            type='button'
            onClick={() => {
              setMode('text');

              const element = {
                className: 'text',
                id: canvasElements.length.toString(),
                styles: { posX: 20, posY: 20 },
              };

              color.setValue('');
              dispatch(addElement(element));
              selectItem(element);
            }}
          >
            <span className='material-icons'>text_fields</span>
          </button>
        </div>

        <div className='canvas' id='canvas' style={{ background: bgColor.value }}>
          {canvasElements.map((element) => {
            if (element.className === 'text') {
              return (
                <input
                  type='text added'
                  className='text'
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

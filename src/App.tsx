import { useState } from 'react';

import useInput from './hooks/useInput';
import { changeElement, getCanvasItemPosition } from './functions/canvas';

import { CanvasElement } from './type/canvas';

import './App.scss';

function App() {
  const [mode, setMode] = useState<string>('');
  const [selectedItem, selectItem] = useState<CanvasElement>({
    className: '',
    id: '',
    styles: { posX: 20, posY: 20 },
  });

  const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([]);
  const bgColor = useInput('#ffffff');
  const color = useInput('');

  const addElement = (newElement: CanvasElement) => {
    setCanvasElements([...canvasElements, newElement]);
  };

  return (
    <div className='App'>
      <div className='container'>
        <div className='customizing-title'>
          <span>{mode === 'bg-color' && '카드 배경 색상'}</span>
          <span>{selectedItem.className === 'text' && '텍스트'}</span>
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

          {selectedItem.className === 'text' && (
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

                      const changedElements = changeElement({
                        elements: canvasElements,
                        selectedItem,
                        changedValues: { color: changedValue },
                      });

                      setCanvasElements(changedElements);
                    }}
                  />
                </label>
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
              const element = {
                className: 'text',
                id: canvasElements.length.toString(),
                styles: { posX: 20, posY: 20 },
              };

              color.setValue('');
              addElement(element);
              selectItem(element);
            }}
          >
            <span className='material-icons'>text_fields</span>
          </button>
        </div>

        <div className='canvas' id='canvas' style={{ background: bgColor.value }}>
          {canvasElements.map((element) => {
            if (element.className === 'text') {
              const isSelected = selectedItem.id === element.id;

              return (
                <input
                  type='text added'
                  className='text'
                  key={element.id}
                  id={element.id || '0'}
                  style={{
                    color: isSelected ? color.value : element.styles?.color || '000000',
                    left: element.styles?.posX || 0,
                    top: element.styles?.posY || 0,
                  }}
                  autoComplete='off'
                  onClick={() => {
                    color.setValue(element.styles?.color || '000000');
                    selectItem(element);
                  }}
                  onDragStart={() => {
                    color.setValue(element.styles?.color || '000000');
                    selectItem(element);
                  }}
                  onDragEnd={(event) => {
                    const { posX, posY } = getCanvasItemPosition(event);

                    const changedElements = changeElement({
                      elements: canvasElements,
                      selectedItem,
                      changedValues: { posX, posY },
                    });
                    setCanvasElements(changedElements);
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

export default App;

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { shallowEqual } from 'react-redux';

import { modifyCanvasItemOrder, selectItem, deleteCanvasItem } from '../../reducers/canvas';
import { useAppDispatch, useAppSelector } from '../../store';

import './index.scss';

function Layer() {
  const dispatch = useAppDispatch();

  const { canvas, selectedItem } = useAppSelector(
    (state) => ({ canvas: state.canvas.canvas, selectedItem: state.canvas.selectedItem }),
    shallowEqual,
  );
  const canvasItems = [...canvas.items].reverse();
  const selectedZIndex = selectedItem.styles.zIndex;

  return (
    <div className='layer'>
      <div className='layer-header'>
        <span className='layer-header-title'>레이어 순서</span>

        <button
          type='button'
          onClick={() => {
            if (selectedZIndex < canvasItems.length - 1) {
              dispatch(modifyCanvasItemOrder({ selectedIndex: selectedZIndex, direction: 'up' }));
            }
          }}
        >
          <span className='material-icons'>expand_less</span>
        </button>

        <button
          type='button'
          onClick={() => {
            if (selectedZIndex > 0) {
              dispatch(modifyCanvasItemOrder({ selectedIndex: selectedZIndex, direction: 'down' }));
            }
          }}
        >
          <span className='material-icons'>expand_more</span>
        </button>
      </div>

      <ul className='layer-items'>
        {canvasItems.map((item) => {
          const isSelected = item.id === selectedItem.id;

          return (
            <li
              className={`layer-item ${isSelected ? 'selected' : ''}`}
              key={item.id}
              onClick={() => dispatch(selectItem(item))}
              onDragStart={() => {
                dispatch(selectItem(item));
              }}
              draggable
            >
              <div className='item'>
                <span className='material-icons' style={{ color: item.styles.color || '#444444' }}>
                  {(item.className === 'text' && 'text_fields') ||
                    (item.className === 'rectangle' && 'rectangle') ||
                    (item.className === 'circle' && 'lens') ||
                    (item.className === 'image' && 'image')}
                </span>

                {item.id}
              </div>

              <button
                className='material-icons delete-button'
                type='button'
                onClick={() => dispatch(deleteCanvasItem())}
              >
                remove_circle
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Layer;

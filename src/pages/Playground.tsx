import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';

import Customizing from '../components/Customizing';
import CustomizingText from '../components/Customizing/Text';
import CustomizingShape from '../components/Customizing/Shape';
import CustomizingImage from '../components/Customizing/Image';
import AddingBoard from '../components/AddingBoard';
import Canvas from '../components/Canvas';
import Layer from '../components/Layer';

import { getCanvas } from '../reducers/canvas';
import { useAppDispatch, useAppSelector } from '../store';

import '../styles/Playground.scss';

function Playground() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const canvas = localStorage.getItem('canvas');
    if (canvas) {
      const parsedCanvas = JSON.parse(canvas);
      dispatch(getCanvas(parsedCanvas));
    }
  }, []);

  const { canvas, selectedItemType } = useAppSelector(
    (state) => ({
      canvas: state.canvas.canvas,
      selectedItemType: state.canvas.selectedItem.type,
    }),
    shallowEqual,
  );

  const onSave = () => {
    const stringifiedCanvas = JSON.stringify(canvas);
    localStorage.setItem('canvas', stringifiedCanvas);
  };

  return (
    <div className='playground'>
      <div className='container'>
        {selectedItemType === '' && <Customizing />}
        {selectedItemType === 'text' && <CustomizingText />}
        {selectedItemType === 'shape' && <CustomizingShape />}
        {selectedItemType === 'image' && <CustomizingImage />}
      </div>

      <div className='container adding'>
        <AddingBoard />
        <Canvas />
      </div>

      <div className='container'>
        <button type='button' onClick={onSave} className='save-button'>
          저장하기
        </button>

        <Layer />
      </div>
    </div>
  );
}

export default Playground;

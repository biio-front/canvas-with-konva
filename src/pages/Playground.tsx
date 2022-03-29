import { useEffect, useState } from 'react';
import { shallowEqual } from 'react-redux';

import Customizing from '../components/Customizing';
import CustomizingText from '../components/Customizing/Text';
import CustomizingBgColor from '../components/Customizing/BgColor';
import CustomizingShape from '../components/Customizing/Shape';
import AddingBoard from '../components/AddingBoard';
import Canvas from '../components/Canvas';
import Layer from '../components/Layer';

import { getCanvas } from '../reducers/canvas';
import { useAppDispatch, useAppSelector } from '../store';

import '../styles/Playground.scss';

function Playground() {
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState<string>('');

  useEffect(() => {
    const canvas = localStorage.getItem('canvas');
    if (canvas) {
      const parsedCanvas = JSON.parse(canvas);
      dispatch(getCanvas(parsedCanvas));
    }
  }, []);

  const canvas = useAppSelector((state) => state.canvas.canvas, shallowEqual);

  const onSave = () => {
    const stringifiedCanvas = JSON.stringify(canvas);
    localStorage.setItem('canvas', stringifiedCanvas);
  };

  return (
    <div className='playground'>
      <div className='container'>
        {mode === '' && <Customizing />}
        {mode === 'bg-color' && <CustomizingBgColor />}
        {mode === 'text' && <CustomizingText />}
        {mode === 'shape' && <CustomizingShape />}
      </div>

      <div className='container adding'>
        <AddingBoard setMode={setMode} />
        <Canvas setMode={setMode} />
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

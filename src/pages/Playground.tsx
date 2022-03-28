import { useState } from 'react';

import Customizing from '../components/Customizing';
import CustomizingText from '../components/Customizing/Text';
import CustomizingBgColor from '../components/Customizing/BgColor';
import CustomizingRectangle from '../components/Customizing/Rectangle';
import AddingBoard from '../components/AddingBoard';
import Canvas from '../components/Canvas';

import '../styles/Playground.scss';

function Playground() {
  const [mode, setMode] = useState<string>('');

  return (
    <div className='playground'>
      <div className='container'>
        {mode === '' && <Customizing />}
        {mode === 'bg-color' && <CustomizingBgColor />}
        {mode === 'text' && <CustomizingText />}
        {mode === 'rectangle' && <CustomizingRectangle />}
      </div>

      <div className='container adding'>
        <AddingBoard setMode={setMode} />
        <Canvas setMode={setMode} />
      </div>
    </div>
  );
}

export default Playground;

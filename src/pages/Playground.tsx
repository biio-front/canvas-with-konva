import { useRef } from 'react';
import { shallowEqual } from 'react-redux';

import Customizing from '../components/Customizing';
import CustomizingText from '../components/Customizing/Text';
import CustomizingShape from '../components/Customizing/Shape';
import CustomizingImage from '../components/Customizing/Image';
import AddingBoard from '../components/AddingBoard';
import Canvas from '../components/Canvas';
import Layer from '../components/Layer';


import '../styles/Playground.scss';

function Playground() {

  const stageRef = useRef(null);
  const onSave = () => {
  };

  return (
    <div className='playground'>
      <div className='container'>
        {selectedItemType === '' && <Customizing />}
        {selectedItemType === 'Text' && <CustomizingText />}
        {selectedItemType === 'Image' && <CustomizingImage />}
        {(selectedItemType === 'Rect' || selectedItemType === 'Circle') && <CustomizingShape />}
      </div>

      <div className='container adding'>
        <AddingBoard />
        <Canvas stageRef={stageRef} />
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

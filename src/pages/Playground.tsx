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
    (state) => ({
      selectedItemType: state.canvas.selectedItem.type,
    }),
    shallowEqual,
  );

  const onSave = () => {
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

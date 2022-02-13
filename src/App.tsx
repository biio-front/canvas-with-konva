import { useState } from 'react';

import useInput from './hooks/useInput';

import './App.scss';

function App() {
  const [mode, setMode] = useState<string>('');
  const bgColor = useInput('#ffffff');
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
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
        </div>
      </div>

      <div className='container adding'>
        <div className='adding-board'>
          <button className='paint' type='button' onClick={() => setMode('bg-color')}>
            <span className='material-icons'>format_color_fill</span>
          </button>
        </div>

        <div className='canvas' id='canvas' style={{ background: bgColor.value }}>
        </div>
      </div>
    </div>
  );
}

export default App;

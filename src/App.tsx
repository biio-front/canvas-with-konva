import { Provider } from 'react-redux';

import Canvas from './pages/Canvas';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Canvas />
    </Provider>
  );
}

export default App;

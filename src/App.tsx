import { Provider } from 'react-redux';

import Playground from './pages/Playground';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Playground />
    </Provider>
  );
}

export default App;

import './App.sass';
import {Router} from './components/Router/Router';
import {Provider} from 'react-redux';
import {persistor, store} from './store'
import { PersistGate } from 'redux-persist/integration/react';

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="container">
          <div className="App">
            <Router />
          </div>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
import './App.sass';
import {Router} from './components/Router/Router';
import {Provider} from 'react-redux';
import {store} from './store'

function App() {

  return (
    <Provider store={store}>
      <div className="container">
        <div className="App">
          <Router />
        </div>
      </div>
    </Provider>
  );
}

export default App;
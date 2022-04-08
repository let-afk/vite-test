import "./App.scss";
import { Router } from "./components/Router/Router";
import { Provider } from "react-redux";
import { store } from "./store";
//import { PersistGate } from "redux-persist/integration/react";
import { Logo } from "./components/Logo/Logo";

function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <div className="container">
        <div className="App">
          <Logo />
          <Router />
        </div>
      </div>
      {/* </PersistGate> */}
    </Provider>
  );
}

export default App;

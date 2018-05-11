import React from "react";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import config from "./config/app";
import { accessToken, userSession } from "./store/reducers";
import MainRoutes from "./pages/MainRoutes";

const reducers = combineReducers({
  accessToken,
  userSession
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["accessToken", "userSession"]
};

const persistedReducers = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducers);
const persistor = persistStore(store);

axios.defaults.baseURL = config.baseURL;

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Route path="/" component={MainRoutes} />
      </Router>
    </PersistGate>
  </Provider>
);

export default App;

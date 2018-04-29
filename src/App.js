import React from "react";
import styled from "styled-components";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

import { accessToken, userSession } from "./store/reducers";

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

const Container = styled.div``;

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Container />
    </PersistGate>
  </Provider>
);

export default App;

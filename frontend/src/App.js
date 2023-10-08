import { Routes, Route } from "react-router";

import RegisterVideo from "./components/register-video/RegisterVideo";
import ListVideo from "./components/list-video/ListVideo";

import "./App.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import registerVideoReducer from "./reducers/register-video-reducer";

const store = configureStore({
  reducer: {
    register: registerVideoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

function App() {
  document.title = "PiFlix: Local streaming service";

  return (
    <Provider store={store}>
      <div>
        <Routes>
          <Route path="/" element={<ListVideo />} />
          <Route path="/register" element={<RegisterVideo />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;

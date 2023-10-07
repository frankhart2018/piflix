import { Routes, Route } from "react-router";

import RegisterVideo from "./components/register-video/RegisterVideo";
import ListVideo from "./components/list-video/ListVideo";

import "./App.css";

function App() {
  document.title = "PiFlix: Local streaming service";

  return (
    <div>
      <Routes>
        <Route path="/" element={<ListVideo />} />
        <Route path="/register" element={<RegisterVideo />} />
      </Routes>
    </div>
  );
}

export default App;

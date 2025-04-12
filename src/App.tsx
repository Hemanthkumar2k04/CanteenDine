import "./css/App.css";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
function App() {
  return (
    <div>
      <NavBar></NavBar>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
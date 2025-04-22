import "./css/App.css";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { CartProvider } from "./contexts/CartContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <CartProvider>
      <NavBar></NavBar>
      <main className="main-content">
      <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </main>
    </CartProvider>
  );
}

export default App;
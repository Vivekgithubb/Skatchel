import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop";
import Applayout from "./pages/Applayout";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Account from "./pages/Account";
import CartData from "./ui/CartData";
import Register from "./pages/Register";
import ProtectedRoute from "./pages/ProtectedRoute";
import Loding from "./ui/Loding";
import { Toaster } from "react-hot-toast";
import Landing from "./pages/landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="landing" element={<Landing />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Applayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="account" element={<Account />} />
          <Route path="loding" element={<Loding />} />
          <Route path="shop" element={<Shop />} />
          <Route path="cart/" element={<Cart />} />
          <Route path="cart/:id" element={<CartData />} />
        </Route>
      </Routes>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
    </BrowserRouter>
  );
}

export default App;

import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from "./layout/MainLayout"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Contact from "./pages/Contact"
import ManageProducts from "./pages/ManageProducts"
import ProtectedRoute from "./components/ProtectedRoute"
import Shop from "./pages/Shop"
import './index.css'
import ProductDetails from './pages/ProductDetails'
import ManageCategories from './pages/ManageCategories'
import AddToCart from './pages/AddToCart'
import UserProfile from './pages/UserProfile'


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<MainLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:id" element={<ProductDetails />} />
            <Route path="/add-to-cart" element={<AddToCart />} />
            <Route path="/user-profile" element={<UserProfile />} />


            <Route path="/manage-products" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManageProducts />
              </ProtectedRoute>
            } />

            <Route path="/manage-categories" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManageCategories />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </>
    </BrowserRouter >
  )

}

export default App

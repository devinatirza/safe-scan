import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/layout';
import Home from '../pages/home';
import Product from '../pages/product';
import CheckoutForm from '../pages/checkout';

export default function MiddlewareRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/products" element={<MainLayout><Product /></MainLayout>} />
        <Route path="/checkout" element={<MainLayout><CheckoutForm /></MainLayout>} />
      </Routes>
    </>
  );
}

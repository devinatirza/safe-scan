import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/layout';
import Home from '../pages/home';
import Product from '../pages/product';

export default function MiddlewareRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/products" element={<MainLayout><Product /></MainLayout>} />

      </Routes>
    </>
  );
}

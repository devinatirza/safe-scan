import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/layout';
import Home from '../pages/home';
import Product from '../pages/product';
import CheckoutForm from '../pages/checkout';
import AboutUs from '../pages/about';
import Account from '../pages/account';
import Login from '../pages/login';
import Register from '../pages/register';
import { UserProvider } from '../contexts/user-context';
import Protected from './protected';

export default function MiddlewareRoutes() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/products" element={<MainLayout><Product /></MainLayout>} />
        <Route path="/checkout" element={<MainLayout><CheckoutForm /></MainLayout>} />
        <Route path="/about" element={<MainLayout><AboutUs /></MainLayout>} />
        <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
        <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
        <Route 
        path="/account" 
        element={
          <Protected>
            <MainLayout>
              <Account />
            </MainLayout>
          </Protected>
        } 
      />
      </Routes>
    </UserProvider>
  );
}

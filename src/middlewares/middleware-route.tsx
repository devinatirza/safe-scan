import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/layout';
import Home from '../pages/home';

export default function MiddlewareRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />

      </Routes>
    </>
  );
}

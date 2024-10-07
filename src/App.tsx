import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { UserProvider } from './contexts/user-context';
import MiddlewareRoutes from './middlewares/middleware-route';
import Home from './pages/home';

const MainLayout: React.FC = () => (
  <div>
    <Outlet />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />  
          </Route>
          <Route path="/*" element={<MiddlewareRoutes />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import GaslurLanding from '@/pages/GaslurLanding';
import CheckoutSuccess from '@/pages/CheckoutSuccess';
import CheckoutCancel from '@/pages/CheckoutCancel';
import NavBar from '@/components/NavBar';
import ProtectedRoute from '@/components/ProtectedRoute';

const App = () => {
  const location = useLocation();
  const hideNav = location.pathname === '/gaslur';

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      {!hideNav ? <NavBar /> : null}
      <Box flex={1}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/gaslur" element={<GaslurLanding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/cancel" element={<CheckoutCancel />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;

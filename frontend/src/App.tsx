import { Route, Routes, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import NavBar from '@/components/NavBar';
import ProtectedRoute from '@/components/ProtectedRoute';

const App = () => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <NavBar />
      <Box flex={1}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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

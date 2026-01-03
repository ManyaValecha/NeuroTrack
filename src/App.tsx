import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import Analytics from './pages/Analytics';
import Onboarding from './pages/Onboarding';
import Exercises from './pages/Exercises';
import { UserProvider, useUser } from './context/UserContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/onboarding" replace />;
  }
  return <>{children}</>;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Dashboard />
            </motion.div>
          } />
          <Route path="assessment" element={
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Assessment />
            </motion.div>
          } />
          <Route path="analytics" element={
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Analytics />
            </motion.div>
          } />
          <Route path="exercises" element={
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Exercises />
            </motion.div>
          } />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <UserProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
    </UserProvider>
  );
}

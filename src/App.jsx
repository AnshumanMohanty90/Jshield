import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';
// Auth pages
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
// Public marketing pages
import Landing from '@/pages/Landing';
import PricingPage from '@/pages/Pricing';
import SecurityPage from '@/pages/Security';
import ContactPage from '@/pages/Contact';
import Assessment from '@/pages/Assessment';
// App pages
import Dashboard from '@/pages/Dashboard';
import DataDiscovery from '@/pages/DataDiscovery';
import ConsentManagement from '@/pages/ConsentManagement';
import CookieManagement from '@/pages/CookieManagement';
import VendorRisk from '@/pages/VendorRisk';
import BreachManagement from '@/pages/BreachManagement';
import ROPA from '@/pages/ROPA';
import GrievanceManagement from '@/pages/GrievanceManagement';
import RightsRequests from '@/pages/RightsRequests';
import DPIA from '@/pages/DPIA';
import SecuritySafeguards from '@/pages/SecuritySafeguards';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/" element={<Landing />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/security" element={<SecurityPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/assessment" element={<Assessment />} />
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/data-discovery" element={<DataDiscovery />} />
          <Route path="/consents" element={<ConsentManagement />} />
          <Route path="/cookies" element={<CookieManagement />} />
          <Route path="/vendors" element={<VendorRisk />} />
          <Route path="/breaches" element={<BreachManagement />} />
          <Route path="/ropa" element={<ROPA />} />
          <Route path="/grievances" element={<GrievanceManagement />} />
          <Route path="/rights" element={<RightsRequests />} />
          <Route path="/dpia" element={<DPIA />} />
          <Route path="/security-safeguards" element={<SecuritySafeguards />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
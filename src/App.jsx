import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { lazy, Suspense, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider } from '@/lib/AuthContext';
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
import Trial from '@/pages/Trial';
import DPDPAct from '@/pages/DPDPAct';
const GDPR = lazy(() => import('@/pages/GDPR'));
const SOC2 = lazy(() => import('@/pages/SOC2'));
const Assessment = lazy(() => import('@/pages/Assessment'));
const PartnerProgram = lazy(() => import('@/pages/PartnerProgram'));
import LegalPage from '@/components/LegalPage';
// App pages: lazy-loaded so the public site never downloads the console code
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const DataDiscovery = lazy(() => import('@/pages/DataDiscovery'));
const ConsentManagement = lazy(() => import('@/pages/ConsentManagement'));
const CookieManagement = lazy(() => import('@/pages/CookieManagement'));
const VendorRisk = lazy(() => import('@/pages/VendorRisk'));
const BreachManagement = lazy(() => import('@/pages/BreachManagement'));
const ROPA = lazy(() => import('@/pages/ROPA'));
const GrievanceManagement = lazy(() => import('@/pages/GrievanceManagement'));
const RightsRequests = lazy(() => import('@/pages/RightsRequests'));
const DPIA = lazy(() => import('@/pages/DPIA'));
const SecuritySafeguards = lazy(() => import('@/pages/SecuritySafeguards'));

const PageLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
  </div>
);

// Self-hosted build: the product console stays on Base44 at VITE_APP_URL (for example
// https://app.jshield.ai). Sign-in and console paths on this site send visitors there.
const APP_URL = import.meta.env.VITE_APP_URL;

const ExternalRedirect = () => {
  useEffect(() => {
    window.location.replace(APP_URL + window.location.pathname + window.location.search);
  }, []);
  return <PageLoader />;
};

const appRoute = (element) => (APP_URL ? <ExternalRedirect /> : element);

// Public pages render immediately; no page above the fold waits on the login or app-settings check.
const AuthenticatedApp = () => {
  return (
    <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/login" element={appRoute(<Login />)} />
      <Route path="/register" element={appRoute(<Register />)} />
      <Route path="/forgot-password" element={appRoute(<ForgotPassword />)} />
      <Route path="/reset-password" element={appRoute(<ResetPassword />)} />
      <Route path="/" element={<Landing />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/security" element={<SecurityPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/assessment" element={<Assessment />} />
      <Route path="/trial" element={<Trial />} />
      <Route path="/dpdp-act" element={<DPDPAct />} />
      <Route path="/gdpr" element={<GDPR />} />
      <Route path="/soc-2" element={<SOC2 />} />
      <Route path="/partners" element={<PartnerProgram />} />
      <Route path="/privacy" element={<LegalPage doc="privacy" />} />
      <Route path="/terms" element={<LegalPage doc="terms" />} />
      <Route path="/refund-policy" element={<LegalPage doc="refund" />} />
      <Route path="/dpdp-statement" element={<LegalPage doc="dpdp" />} />
      <Route path="/sub-processors" element={<LegalPage doc="subprocessors" />} />
      {APP_URL ? (
        ["/dashboard", "/data-discovery", "/consents", "/cookies", "/vendors", "/breaches", "/ropa", "/grievances", "/rights", "/dpia", "/security-safeguards"].map((p) => (
          <Route key={p} path={p} element={<ExternalRedirect />} />
        ))
      ) : (
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
      )}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </Suspense>
  );
};


// Without Base44 login on the self-hosted site, skip the auth provider entirely.
const AuthShell = APP_URL ? Fragment : AuthProvider;

function App() {

  return (
    <AuthShell>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthShell>
  )
}

export default App

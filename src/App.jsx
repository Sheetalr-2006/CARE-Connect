import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/layout/Layout';

// Auth & Onboarding
import { AuthLandingPage } from './pages/Auth/AuthLandingPage';
import { LoginPage } from './pages/Auth/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { RoleSelectPage } from './pages/Auth/RoleSelectPage';
import { ElderlySignupPage } from './pages/Auth/ElderlySignupPage';
import { VolunteerSignupPage } from './pages/Auth/VolunteerSignupPage';
import { FamilySignupPage } from './pages/Auth/FamilySignupPage';
import { InteractionsPage } from './pages/Auth/InteractionsPage';
import { PendingApprovalPage } from './pages/Auth/PendingApprovalPage';
import { ForgotPasswordPage } from './pages/Auth/ForgotPasswordPage';

// Dashboards & Portals
import { MainDashboard } from './pages/MainDashboard';
import { FamilyDashboard } from './pages/FamilyDashboard';
import { VolunteerDashboard } from './pages/VolunteerDashboard';
import { ElderlyProfile } from './pages/ElderlyProfile';

// Volunteers
import { VolunteerMatching } from './pages/VolunteerMatching';
import { VolunteerManagement } from './pages/VolunteerManagement';
import { VolunteerVisits } from './pages/VolunteerVisits';

// Health & Daily Care
import { MedicationManagement } from './pages/MedicationManagement';
import { WellbeingCheckIn } from './pages/WellbeingCheckIn';
import { Appointments } from './pages/Appointments';
import { SocialEngagement } from './pages/SocialEngagement';
import { VideoInteraction } from './pages/VideoInteraction';

// Services & System
import { CarePlans } from './pages/CarePlans';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';
import { AllLinksPage } from './pages/AllLinksPage';

export function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            {/* FIRST PAGE: Login & Registration Portal */}
            <Route path="/" element={<AuthLandingPage />} />
            
            {/* Dedicated Auth & Onboarding Routes */}
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/auth/role-select" element={<RoleSelectPage />} />
            <Route path="/auth/signup-elderly" element={<ElderlySignupPage />} />
            <Route path="/auth/signup-volunteer" element={<VolunteerSignupPage />} />
            <Route path="/auth/signup-family" element={<FamilySignupPage />} />
            <Route path="/auth/interactions" element={<InteractionsPage />} />
            <Route path="/auth/pending-approval" element={<PendingApprovalPage />} />

            {/* All Links & Sitemap Hub */}
            <Route path="/links" element={<AllLinksPage />} />
            <Route path="/sitemap" element={<AllLinksPage />} />
            <Route path="/all-links" element={<AllLinksPage />} />
            <Route path="/directory" element={<AllLinksPage />} />

            {/* Main Application Dashboards & Modules */}
            <Route path="/dashboard" element={<Layout><MainDashboard /></Layout>} />
            <Route path="/family-dashboard" element={<Layout><FamilyDashboard /></Layout>} />
            <Route path="/volunteer-dashboard" element={<Layout><VolunteerDashboard /></Layout>} />
            <Route path="/elderly-profile" element={<Layout><ElderlyProfile /></Layout>} />
            
            {/* Volunteer Flows */}
            <Route path="/volunteer-matching" element={<Layout><VolunteerMatching /></Layout>} />
            <Route path="/volunteer-management" element={<Layout><VolunteerManagement /></Layout>} />
            <Route path="/volunteer-visits" element={<Layout><VolunteerVisits /></Layout>} />

            {/* Health & Life */}
            <Route path="/medications" element={<Layout><MedicationManagement /></Layout>} />
            <Route path="/wellbeing" element={<Layout><WellbeingCheckIn /></Layout>} />
            <Route path="/appointments" element={<Layout><Appointments /></Layout>} />
            <Route path="/social" element={<Layout><SocialEngagement /></Layout>} />
            <Route path="/social-engagement" element={<Layout><SocialEngagement /></Layout>} />
            <Route path="/events" element={<Layout><SocialEngagement /></Layout>} />
            <Route path="/cinema" element={<Layout><SocialEngagement /></Layout>} />
            <Route path="/video-interaction" element={<Layout><VideoInteraction /></Layout>} />

            {/* System */}
            <Route path="/care-plans" element={<Layout><CarePlans /></Layout>} />
            <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;

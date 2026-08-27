import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { NotificationDrawer } from '../common/NotificationDrawer';
import { EmergencyModal } from '../common/EmergencyModal';
import { BookAppointmentModal } from '../modals/BookAppointmentModal';
import { ScheduleVisitModal } from '../modals/ScheduleVisitModal';
import { AddMedicationModal } from '../modals/AddMedicationModal';
import { RateVolunteerModal } from '../modals/RateVolunteerModal';
import { VideoCallModal } from '../modals/VideoCallModal';
import { BookingSuccessModal } from '../modals/BookingSuccessModal';
import { TestimonialBottomSheet } from '../modals/TestimonialBottomSheet';
import { AuthDrawerModal } from '../modals/AuthDrawerModal';
import { SpecialOfferModal } from '../modals/SpecialOfferModal';
import { WarningErrorModal } from '../modals/WarningErrorModal';
import { GlobalToastContainer } from '../common/GlobalToastContainer';
import { SeniorVoiceAssistant } from '../common/SeniorVoiceAssistant';
import { useApp } from '../../context/AppContext';

export const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { textSize, highContrast } = useApp();

  const getTextClass = () => {
    if (textSize === 'extra-large') return 'text-lg';
    if (textSize === 'large') return 'text-base';
    return 'text-sm';
  };

  return (
    <div className={`min-h-screen bg-background ${highContrast ? 'contrast-125 brightness-95' : ''} ${getTextClass()}`}>
      
      {/* Top Navigation */}
      <Navbar 
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <div className="flex max-w-7xl mx-auto">
        
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Mobile Slide-in Drawer Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div 
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            />
            <div className="relative w-72 bg-surface-container-lowest h-full z-10 shadow-2xl animate-in slide-in-from-left duration-200">
              <Sidebar onCloseMobile={() => setIsMobileMenuOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12">
          {children}
        </main>

      </div>

      {/* Mobile Floating Bottom Bar */}
      <MobileNav />

      {/* Global Modals, Toast Alerts & Voice Control Assistant */}
      <NotificationDrawer />
      <EmergencyModal />
      <BookAppointmentModal />
      <ScheduleVisitModal />
      <AddMedicationModal />
      <RateVolunteerModal />
      <VideoCallModal />
      
      {/* 7 Distinct Popup System Overlays */}
      <BookingSuccessModal />
      <TestimonialBottomSheet />
      <AuthDrawerModal />
      <SpecialOfferModal />
      <WarningErrorModal />
      <GlobalToastContainer />
      <SeniorVoiceAssistant />
      
    </div>
  );
};

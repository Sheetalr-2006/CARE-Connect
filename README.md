# 🌟 CareConnect — Compassionate Community Elderly Care Platform

[![React](https://img.shields.io/badge/React-18-blue.svg?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple.svg?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4-black.svg?logo=express)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> A modern, accessible, and full-featured platform bridging the gap between elderly seniors, family guardians, and verified community volunteers.

---

## 🚀 Key Features & Modules

* **🏠 Unified Portals & Dashboards:**
  * **Senior View:** Simplified large-font dashboard with 1-tap SOS, medication tracker, wellbeing check-in, and appointments.
  * **Family Guardian View:** Real-time telemetry, peace-of-mind metrics, and instant caregiver notes.
  * **Volunteer View:** Visit scheduling, activity logs, senior compatibility scores, and check-in reporting.

* **🔐 Authentication & Access Control:**
  * Interactive Sign In & Registration with full client-side validation.
  * 4-step OTP-based Password Recovery workflow (Email/SMS).
  * 1-Click Instant Demo Personas (Eleanor Vance - Senior, Sarah Vance - Family, Marcus Chen - Volunteer).

* **💊 Health & Daily Care:**
  * **Medication Management:** Daily schedules, refill reminders, and dosage logs.
  * **Wellbeing Check-In:** Pain level tracking, mood selector, and vitals recording.
  * **Appointments & Transport:** Clinic consults with door-to-door escort ride coordination.
  * **Video Telecare:** 1-tap high-clarity video calls with family and clinical aides.

* **🎬 20 Events & Movies Hub:**
  * 20 weekly curated classic movie screenings and complimentary cinema matinee theater reservations.
  * 10 social club meetups (gardening, book readings, tea circles, and memory games).

* **🎙️ Accessibility & Senior Voice Assistant:**
  * Multilingual Voice Control with continuous listening across 12 languages.
  * High-contrast mode and font scaling (Normal, Large, Extra Large).

* **💬 Live Messaging & Social Enquiry:**
  * Floating WhatsApp enquiry icon with pre-filled support message.
  * Floating Instagram connect button linked to official profile.

* **🌍 International Accessibility & Country Calling Codes:**
  * Searchable country selector with 240+ international dial codes and flag badges across all registration portals.

* **🎵 Gentle Audio Experience:**
  * Calming acoustic Morning Harp intro melody tailored for senior comfort.

* **🔌 Live Express Backend API:**
  * Node.js & Express REST API server with live data persistence for visits, appointments, and telemetry.

---

## 🗺️ Complete Platform Directory

| Category | Route | Description |
| :--- | :--- | :--- |
| **Welcome Portal** | `/` | Responsive landing page, service booking & sitemap |
| **All Links Directory** | `/links` | Centralized hub for all 30+ platform routes and popup triggers |
| **Senior Dashboard** | `/dashboard` | Daily health, SOS emergency, and companion visit summary |
| **Family Dashboard** | `/family-dashboard` | Remote care monitoring and real-time family updates |
| **Volunteer Dashboard**| `/volunteer-dashboard`| Assigned seniors and companion schedule |
| **Sign In** | `/auth/login` | Secure login with validation & demo personas |
| **Registration** | `/auth/register` | New account sign up with role selection |
| **Forgot Password** | `/auth/forgot-password` | 4-step OTP password reset |
| **Medications** | `/medications` | Prescription schedules and dosage alerts |
| **Wellbeing** | `/wellbeing` | Daily vitals and mood tracking |
| **Appointments** | `/appointments` | Doctor appointments and ride escort calendar |
| **20 Events & Movies** | `/social-engagement` | Cinema matinees and community social circles |
| **Volunteer Matching** | `/volunteer-matching` | AI interest and proximity compatibility matching |
| **Settings** | `/settings` | 12 languages, font size, and accessibility controls |

---

## 🛠️ Tech Stack

* **Frontend:** React 18, Vite 5, React Router v6, TailwindCSS 3, Lucide React
* **Backend:** Node.js, Express 4, CORS, Body-Parser
* **Architecture:** Component-driven, Context API state management (`AuthContext`, `AppContext`), Responsive Mobile-First Design

---

## 💻 Getting Started Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18 or higher)
* `npm` or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sheetalr-2006/CARE-Connect.git
   cd CARE-Connect
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development servers:**
   ```bash
   # Start the React + Vite frontend (runs on http://localhost:5173)
   npm run dev

   # In a second terminal, start the Express backend (runs on http://localhost:5000)
   node server/server.js
   ```

4. **Open in your browser:**
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Deploy to Vercel (1-Click)

1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import the `CARE-Connect` repository.
4. Keep the default settings (Framework Preset: **Vite**, Build Command: `npm run build`, Output Directory: `dist`).
5. Click **Deploy**.

---

## 📄 License

This project is licensed under the MIT License.

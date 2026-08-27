import express from 'express';
import cors from 'cors';
import { db } from './db/index.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'CareConnect API', timestamp: new Date().toISOString() });
});

// Auth Routes
app.post('/api/auth/login', (req, res) => {
  const { email, role } = req.body;
  const user = db.users.find(u => u.email === email || u.role === role) || {
    id: `usr-${Date.now()}`,
    name: email ? email.split('@')[0] : "User",
    email,
    role: role || "elderly",
    roleLabel: "Care Recipient"
  };
  res.json({ success: true, user });
});

// Elderly Profiles
app.get('/api/elderly', (req, res) => {
  res.json(db.elderly);
});

app.get('/api/elderly/:id', (req, res) => {
  const profile = db.elderly.find(p => p.id === req.params.id);
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  res.json(profile);
});

// Volunteers
app.get('/api/volunteers', (req, res) => {
  res.json(db.volunteers);
});

// Visits
app.get('/api/visits', (req, res) => {
  res.json(db.visits);
});

app.post('/api/visits', (req, res) => {
  const newVisit = {
    id: `vis-${Date.now()}`,
    status: 'Upcoming',
    ...req.body
  };
  db.visits.unshift(newVisit);
  res.status(201).json(newVisit);
});

// Medications
app.get('/api/medications', (req, res) => {
  res.json(db.medications);
});

app.post('/api/medications', (req, res) => {
  const newMed = {
    id: `med-${Date.now()}`,
    status: 'Pending',
    ...req.body
  };
  db.medications.unshift(newMed);
  res.status(201).json(newMed);
});

// Wellbeing Logs
app.get('/api/wellbeing', (req, res) => {
  res.json(db.wellbeing);
});

app.post('/api/wellbeing', (req, res) => {
  const newLog = {
    id: `wb-${Date.now()}`,
    date: 'Today, Just now',
    ...req.body
  };
  db.wellbeing.unshift(newLog);
  res.status(201).json(newLog);
});

// Appointments
app.get('/api/appointments', (req, res) => {
  res.json(db.appointments);
});

app.post('/api/appointments', (req, res) => {
  const newApt = {
    id: `apt-${Date.now()}`,
    status: 'Scheduled',
    ...req.body
  };
  db.appointments.unshift(newApt);
  res.status(201).json(newApt);
});

// Care Plans
app.get('/api/plans', (req, res) => {
  res.json(db.plans);
});

// Notifications
app.get('/api/notifications', (req, res) => {
  res.json(db.notifications);
});

app.listen(PORT, () => {
  console.log(`CareConnect API server running on http://localhost:${PORT}`);
});

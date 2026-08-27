// Mock In-Memory Database for CareConnect
import {
  initialElderlyProfiles,
  initialVolunteers,
  initialVisits,
  initialMedications,
  initialWellbeingLogs,
  initialAppointments,
  initialCarePlans,
  initialNotifications,
  demoUsers
} from '../../src/context/mockData.js';

export const db = {
  elderly: [...initialElderlyProfiles],
  volunteers: [...initialVolunteers],
  visits: [...initialVisits],
  medications: [...initialMedications],
  wellbeing: [...initialWellbeingLogs],
  appointments: [...initialAppointments],
  plans: [...initialCarePlans],
  notifications: [...initialNotifications],
  users: [...demoUsers]
};

export default db;

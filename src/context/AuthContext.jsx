// Authentication context with User (Patient), Doctor, and Admin roles
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const ROLES = {
  USER: 'patient',
  DOCTOR: 'doctor',
  ADMIN: 'admin',
};

export const DEMO_USERS = {
  patient: {
    id: 'USR-89421',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    role: ROLES.USER,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    age: 28,
    gender: 'Male',
    bloodGroup: 'B+',
    phone: '+91 98765 43210',
    abhaId: '14-A05E-88K3',
    emergencyContact: { name: 'Mom (Sunita Sharma)', phone: '+91 98765 43210' }
  },
  doctor: {
    id: 'DOC-10492',
    name: 'Dr. Arjun Mehta',
    email: 'dr.mehta@cityhospital.org',
    role: ROLES.DOCTOR,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    specialty: 'Cardiologist & Internal Medicine',
    hospital: 'City Care Hospital, Mumbai',
    registrationNumber: 'KMC 12345',
    experienceYears: 12,
    rating: 4.9
  },
  admin: {
    id: 'ADM-00101',
    name: 'Super Administrator',
    email: 'admin@jeevaraksha.gov.in',
    role: ROLES.ADMIN,
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    department: 'Central Healthcare IT Admin',
    clearanceLevel: 'SuperAdmin'
  }
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('jr_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('jr_auth_user');
  });

  const login = (role = ROLES.USER, customData = {}) => {
    const baseUser = DEMO_USERS[role] || DEMO_USERS.patient;
    const user = { ...baseUser, ...customData };
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('jr_auth_user', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('jr_auth_user');
  };

  const switchRole = (newRole) => {
    login(newRole);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, login, logout, switchRole, ROLES }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

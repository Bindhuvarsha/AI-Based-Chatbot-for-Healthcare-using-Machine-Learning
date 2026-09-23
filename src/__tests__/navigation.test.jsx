import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import JeevaRaksha from '../JeevaRaksha';

// Helper to render the app in logged‑in state for navigation tests
const renderApp = async (initialTab = 'dashboard') => {
  localStorage.setItem('jr_account_test@example.com', JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    phone: '+919876543210'
  }));

  render(<JeevaRaksha />);
  // Simulate login to reach the app screen
  const emailInput = screen.getByPlaceholderText(/you@example\.com/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const signInBtn = screen.getByRole('button', { name: /sign in/i });
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(signInBtn);
  // Wait for dashboard to appear
  await waitFor(() => expect(screen.getByText(/welcome back/i)).toBeInTheDocument());
  // Optional: directly set tab if needed
  return { initialTab };
};

describe('Navigation to newly added screens', () => {
  test('Medicine Cost Saver screen loads correctly', async () => {
    await renderApp();
    const medicineTile = screen.getByText(/medicine cost saver/i);
    fireEvent.click(medicineTile);
    await waitFor(() => expect(screen.getByText(/generic medicine cost-saver/i)).toBeInTheDocument());
  });

  test('Prescription Scanner screen loads correctly', async () => {
    await renderApp();
    const scannerTile = screen.getByText(/prescription scanner/i);
    fireEvent.click(scannerTile);
    await waitFor(() => expect(screen.getByText(/prescription scanner/i)).toBeInTheDocument());
  });

  test('Voice AI Assistant screen loads correctly', async () => {
    await renderApp();
    const voiceTile = screen.getByText(/voice ai assistant/i);
    fireEvent.click(voiceTile);
    await waitFor(() => expect(screen.getByText(/voice ai assistant/i)).toBeInTheDocument());
  });
});

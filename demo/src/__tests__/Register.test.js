import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../pages/Register';

test('renders Register component', () => {
  render(
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Register />
    </BrowserRouter>
  );
  expect(screen.getAllByText(/Register/i)[0]).toBeInTheDocument();
});

test('allows user to input registration details', () => {
  render(
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Register />
    </BrowserRouter>
  );
  fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'testuser' } });
  fireEvent.change(screen.getAllByLabelText(/Password:/i)[0], { target: { value: 'password' } });
  fireEvent.change(screen.getAllByLabelText(/Password:/i)[1], { target: { value: 'password' } });
  expect(screen.getByDisplayValue(/test@example.com/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/testuser/i)).toBeInTheDocument();
  expect(screen.getAllByDisplayValue(/password/i).length).toBe(2);
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';

test('renders Login component', () => {
  render(
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Login />
    </BrowserRouter>
  );
  expect(screen.getByText(/Welcome to Beaver Botanica!/i)).toBeInTheDocument();
});

test('allows user to input username and password', () => {
  render(
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Login />
    </BrowserRouter>
  );
  fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'testuser' } });
  fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'password' } });
  expect(screen.getByDisplayValue(/testuser/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/password/i)).toBeInTheDocument();
});

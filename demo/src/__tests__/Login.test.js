import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../pages/Login';

test('renders Login component', () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  expect(screen.getByText(/Welcome to Beaver Botanica!/i)).toBeInTheDocument();
});

test('allows user to input username and password', () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'testuser' } });
  fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'password' } });
  expect(screen.getByDisplayValue(/testuser/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/password/i)).toBeInTheDocument();
});

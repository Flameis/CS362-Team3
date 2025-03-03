import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from '../pages/Register';

test('renders Register component', () => {
  render(
    <Router>
      <Register />
    </Router>
  );
  expect(screen.getByText(/Register/i)).toBeInTheDocument();
});

test('allows user to input registration details', () => {
  render(
    <Router>
      <Register />
    </Router>
  );
  fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'testuser' } });
  fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'password' } });
  fireEvent.change(screen.getByLabelText(/Confirm Password:/i), { target: { value: 'password' } });
  expect(screen.getByDisplayValue(/test@example.com/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/testuser/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/password/i)).toBeInTheDocument();
});

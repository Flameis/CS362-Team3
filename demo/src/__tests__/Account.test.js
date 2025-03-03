import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Account from '../pages/Account';

test('renders Account component', () => {
  render(
    <Router>
      <Account />
    </Router>
  );
  expect(screen.getByText(/Account Page/i)).toBeInTheDocument();
});

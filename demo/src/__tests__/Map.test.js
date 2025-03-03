import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Map from '../pages/Map';

test('renders Map component', () => {
  render(
    <Router>
      <Map />
    </Router>
  );
  expect(screen.getByText(/You are here/i)).toBeInTheDocument();
});

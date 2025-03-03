import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Map from '../pages/Map';

test('renders Map component', () => {
  render(
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Map />
    </BrowserRouter>
  );
  expect(screen.getByText(/Map/i)).toBeInTheDocument();
});

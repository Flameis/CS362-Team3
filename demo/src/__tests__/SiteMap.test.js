import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SiteMap from '../pages/SiteMap';

test('renders SiteMap component', () => {
  render(
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <SiteMap />
    </BrowserRouter>
  );
  expect(screen.getByText(/\/map/i)).toBeInTheDocument();
  expect(screen.getByText(/\/login/i)).toBeInTheDocument();
  expect(screen.getByText(/\/account/i)).toBeInTheDocument();
  expect(screen.getByText(/\/register/i)).toBeInTheDocument();
  expect(screen.getByText(/\/display-plants/i)).toBeInTheDocument();
  expect(screen.getByText(/\/sitemap/i)).toBeInTheDocument();
  expect(screen.getByText(/\/about/i)).toBeInTheDocument();
});

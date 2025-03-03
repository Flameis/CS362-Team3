import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DisplayPlants from '../pages/DisplayPlants';

test('renders DisplayPlants component', () => {
  render(<DisplayPlants />);
  expect(screen.getByText(/Plants/i)).toBeInTheDocument();
});

test('allows user to search plants', () => {
  render(<DisplayPlants />);
  fireEvent.change(screen.getByPlaceholderText(/Search plants.../i), { target: { value: 'fern' } });
  expect(screen.getByDisplayValue(/fern/i)).toBeInTheDocument();
});

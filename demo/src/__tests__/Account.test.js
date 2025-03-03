import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Account from '../pages/Account';

// Mock js-cookie
jest.mock('js-cookie', () => ({
  get: jest.fn().mockReturnValue('mock-token'),
  remove: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      data: {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        role: 'user',
        date_joined: '2023-01-01',
      },
    }),
  })
);

test('renders Account component', async () => {
  await act(async () => {
    render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Account />
      </BrowserRouter>
    );
  });

  await waitFor(() => expect(screen.getByText(/Account Page/i)).toBeInTheDocument());
  expect(screen.getByText(/Welcome, testuser!/i)).toBeInTheDocument();
});

test('displays error message on fetch failure', async () => {
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ error: 'Failed to fetch account information' }),
    })
  );

  await act(async () => {
    render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Account />
      </BrowserRouter>
    );
  });

  await waitFor(() => expect(screen.getByText(/Failed to fetch account information/i)).toBeInTheDocument());
});

test('displays loading state initially', () => {
  render(
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Account />
    </BrowserRouter>
  );

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

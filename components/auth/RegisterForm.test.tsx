import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from './RegisterForm';
import { vi, describe, it, expect, beforeEach, type Mock } from 'vitest';
import { signUpWithEmailPassword } from '@/app/register/actions';

vi.mock('@/app/register/actions', () => ({
  signUpWithEmailPassword: vi.fn(),
}));

describe('RegisterForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders register form', () => {
    render(<RegisterForm />);
    expect(
      screen.getByRole('heading', { name: /register/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /register/i })
    ).toBeInTheDocument();
  });

  it('shows validation errors for invalid data', async () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'short' },
    });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(
      await screen.findByText(/invalid email address/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/password must be at least 8 characters/i)
    ).toBeInTheDocument();
  });

  it('shows validation error if password lacks a number', async () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'passwordlongenough' },
    });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(
      await screen.findByText(/password must contain at least one number/i)
    ).toBeInTheDocument();
  });

  it('calls signUpWithEmailPassword on valid submission', async () => {
    (signUpWithEmailPassword as Mock).mockResolvedValue({ error: null });
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(signUpWithEmailPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('displays server error message', async () => {
    (signUpWithEmailPassword as Mock).mockResolvedValue({
      error: 'User already registered',
    });
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(
      await screen.findByText(/user already registered/i)
    ).toBeInTheDocument();
  });
});

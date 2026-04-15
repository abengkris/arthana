import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AuthForm from './AuthForm'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { createClient } from '@/utils/supabase/client'

// Mock Supabase client
vi.mock('@/utils/supabase/client', () => ({
  createClient: vi.fn(),
}))

// Mock Next.js navigation
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('AuthForm', () => {
  const mockSignInWithPassword = vi.fn()
  const mockSignUp = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(createClient as any).mockReturnValue({
      auth: {
        signInWithPassword: mockSignInWithPassword,
        signUp: mockSignUp,
      },
    })
  })

  it('renders login form by default', () => {
    render(<AuthForm />)
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('toggles to register form', () => {
    render(<AuthForm />)
    const toggleButton = screen.getByRole('button', { name: /don't have an account/i })
    fireEvent.click(toggleButton)
    expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument()
  })

  it('calls signInWithPassword on login submission', async () => {
    mockSignInWithPassword.mockResolvedValue({ data: {}, error: null })
    render(<AuthForm />)

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(mockSignInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
      expect(mockPush).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('calls signUp on register submission', async () => {
    mockSignUp.mockResolvedValue({ data: {}, error: null })
    render(<AuthForm />)

    // Toggle to register
    fireEvent.click(screen.getByRole('button', { name: /don't have an account/i }))

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'new@example.com' } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'newpassword' } })
    fireEvent.click(screen.getByRole('button', { name: /register/i }))

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        email: 'new@example.com',
        password: 'newpassword',
        options: {
          emailRedirectTo: expect.stringContaining('/auth/callback'),
        },
      })
      expect(screen.getByText(/check your email/i)).toBeInTheDocument()
    })
  })

  it('displays error message on failure', async () => {
    mockSignInWithPassword.mockResolvedValue({ data: null, error: { message: 'Invalid credentials' } })
    render(<AuthForm />)

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'wrong@example.com' } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpass' } })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    })
  })
})

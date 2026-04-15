import { render, screen, fireEvent } from '@testing-library/react'
import AuthForm from './AuthForm'
import { vi, describe, it, expect } from 'vitest'

describe('AuthForm', () => {
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
})

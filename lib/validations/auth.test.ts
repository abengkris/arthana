import { describe, it, expect } from 'vitest';
import { loginSchema, registerSchema } from './auth';

describe('auth validations', () => {
  describe('loginSchema', () => {
    it('should validate correct login data', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(result.success).toBe(true);
    });

    it('should fail on invalid email', () => {
      const result = loginSchema.safeParse({
        email: 'invalid-email',
        password: 'password123',
      });
      expect(result.success).toBe(false);
    });

    it('should fail on empty password', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: '',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('registerSchema', () => {
    it('should validate correct registration data', () => {
      const result = registerSchema.safeParse({
        email: 'test@example.com',
        password: 'password1',
      });
      expect(result.success).toBe(true);
    });

    it('should fail if password is less than 8 characters', () => {
      const result = registerSchema.safeParse({
        email: 'test@example.com',
        password: 'pass1',
      });
      expect(result.success).toBe(false);
    });

    it('should fail if password does not contain a number', () => {
      const result = registerSchema.safeParse({
        email: 'test@example.com',
        password: 'password',
      });
      expect(result.success).toBe(false);
    });
  });
});

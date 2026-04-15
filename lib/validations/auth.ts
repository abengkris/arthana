import { z } from 'zod';

/**
 * Schema for user login validation.
 * Requires a valid email and a non-empty password.
 */
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

/**
 * Schema for user registration validation.
 * Requires a valid email and a password with at least 8 characters and 1 number.
 */
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .refine((password) => /[0-9]/.test(password), {
      message: 'Password must contain at least one number',
    }),
});

/**
 * Type for login form inputs.
 */
export type LoginInput = z.infer<typeof loginSchema>;

/**
 * Type for registration form inputs.
 */
export type RegisterInput = z.infer<typeof registerSchema>;

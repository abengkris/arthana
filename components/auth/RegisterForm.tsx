'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { registerSchema, type RegisterInput } from '@/lib/validations/auth';
import { signUpWithEmailPassword } from '@/app/register/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';

/**
 * Component for user registration form.
 * Handles validation and submission to the registration server action.
 */
export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    setError(null);
    setLoading(true);
    try {
      const result = await signUpWithEmailPassword(data);
      if (result?.error) {
        setError(result.error);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred during registration.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-border/50 mx-auto w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Register</CardTitle>
        <CardDescription>Create a new account to get started</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register('email')}
              disabled={loading}
              spellCheck={false}
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-destructive text-xs font-medium">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              disabled={loading}
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-destructive text-xs font-medium">
                {errors.password.message}
              </p>
            )}
            <p className="text-muted-foreground text-[10px]">
              Minimum 8 characters, at least 1 number.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2Icon className="mr-2 size-4 animate-spin" />}
            {loading ? 'Creating account…' : 'Register'}
          </Button>
          <div className="text-muted-foreground text-center text-sm">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Login
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}

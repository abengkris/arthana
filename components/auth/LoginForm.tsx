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
import { loginSchema, type LoginInput } from '@/lib/validations/auth';
import { signInWithEmailPassword } from '@/app/login/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';

/**
 * Component for user login form.
 * Handles validation and submission to the login server action.
 */
export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setError(null);
    setLoading(true);
    try {
      const result = await signInWithEmailPassword(data);
      if (result?.error) {
        setError(result.error);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred during login.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-border/50 mx-auto w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email and password to access your account
        </CardDescription>
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              type="password"
              {...register('password')}
              disabled={loading}
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="text-destructive text-xs font-medium">
                {errors.password.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2Icon className="mr-2 size-4 animate-spin" />}
            {loading ? 'Logging in…' : 'Login'}
          </Button>
          <div className="text-muted-foreground text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="text-primary font-medium hover:underline"
            >
              Register
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}

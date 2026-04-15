'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { onboardingSchema, type OnboardingData } from '@/lib/financial-logic';
import { BasicInfo } from './steps/basic-info';
import { RiskProfile } from './steps/risk-profile';
import { Summary } from './steps/summary';
import { setupFinancialProfile } from '@/app/onboarding/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2Icon } from 'lucide-react';

export function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const form = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      monthlyIncome: 0,
      employmentType: 'Full-time',
      hasDependents: false,
      planningCareerPivot: false,
    },
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof OnboardingData)[] = [];
    if (step === 1) fieldsToValidate = ['monthlyIncome', 'employmentType'];
    if (step === 2) fieldsToValidate = ['hasDependents', 'planningCareerPivot'];

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setStep(Math.min(totalSteps, step + 1));
    }
  };

  const onSubmit = async (data: OnboardingData) => {
    setError(null);
    setLoading(true);
    try {
      const result = await setupFinancialProfile(data);
      if (result?.error) {
        setError(result.error);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred during setup.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-border/50 overflow-hidden shadow-lg">
      <CardHeader className="gap-2">
        <div className="flex items-center justify-between">
          <CardTitle>Welcome to Arthana</CardTitle>
          <span className="text-muted-foreground text-sm font-medium">
            Step {step} of {totalSteps}
          </span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="min-h-[300px]"
          >
            {step === 1 && (
              <div className="py-6">
                <CardTitle className="mb-2 text-center text-xl">
                  Financial Profile
                </CardTitle>
                <CardDescription className="mb-8 text-center">
                  Tell us about your monthly income and employment.
                </CardDescription>
                <BasicInfo form={form} />
              </div>
            )}
            {step === 2 && (
              <div className="py-6">
                <CardTitle className="mb-2 text-center text-xl">
                  Risk Assessment
                </CardTitle>
                <CardDescription className="mb-8 text-center">
                  Let&apos;s evaluate your financial risks and goals.
                </CardDescription>
                <RiskProfile form={form} />
              </div>
            )}
            {step === 3 && (
              <div className="py-6">
                <CardTitle className="mb-2 text-center text-xl">
                  Review & Initialize
                </CardTitle>
                <CardDescription className="mb-8 text-center">
                  Confirm your details and initialize your dashboard.
                </CardDescription>
                <Summary form={form} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1 || loading}
          >
            Back
          </Button>
          {step < totalSteps ? (
            <Button onClick={nextStep} disabled={loading}>
              Next
            </Button>
          ) : (
            <Button
              onClick={form.handleSubmit(onSubmit)}
              className="bg-primary text-primary-foreground"
              disabled={loading}
            >
              {loading && <Loader2Icon className="mr-2 size-4 animate-spin" />}
              {loading ? 'Initializing...' : 'Initialize Dashboard'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

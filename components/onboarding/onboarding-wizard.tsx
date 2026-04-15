'use client';

import { useState } from 'react';
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

export function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  return (
    <Card className="overflow-hidden shadow-lg">
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
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="min-h-[200px]"
          >
            {step === 1 && (
              <div className="py-8">
                <CardTitle className="mb-2 text-center text-xl">
                  Step 1: Financial Profile
                </CardTitle>
                <CardDescription className="text-center">
                  Tell us about your monthly income and employment.
                </CardDescription>
              </div>
            )}
            {step === 2 && (
              <div className="py-8">
                <CardTitle className="mb-2 text-center text-xl">
                  Step 2: Risk Assessment
                </CardTitle>
                <CardDescription className="text-center">
                  Let&apos;s evaluate your financial risks and goals.
                </CardDescription>
              </div>
            )}
            {step === 3 && (
              <div className="py-8">
                <CardTitle className="mb-2 text-center text-xl">
                  Step 3: Review & Initialize
                </CardTitle>
                <CardDescription className="text-center">
                  Confirm your details and initialize your dashboard.
                </CardDescription>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
          >
            Back
          </Button>
          <Button onClick={() => setStep(Math.min(totalSteps, step + 1))}>
            {step === totalSteps ? 'Finish' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

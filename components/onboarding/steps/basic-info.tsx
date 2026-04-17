import { UseFormReturn } from 'react-hook-form';
import { OnboardingData, type EmploymentType } from '@/lib/financial-logic';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldSet,
  FieldLegend,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { HelpCircleIcon } from 'lucide-react';

interface BasicInfoProps {
  form: UseFormReturn<OnboardingData>;
}

export function BasicInfo({ form }: BasicInfoProps) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;
  const employmentType = watch('employmentType');

  return (
    <FieldGroup>
      <Field>
        <div className="flex items-center gap-2">
          <FieldLabel htmlFor="monthlyIncome">Monthly Income (IDR)</FieldLabel>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircleIcon className="text-muted-foreground size-4 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>Total monthly income after taxes.</TooltipContent>
          </Tooltip>
        </div>
        <Input
          id="monthlyIncome"
          type="number"
          inputMode="numeric"
          placeholder="e.g., 10,000,000…"
          {...register('monthlyIncome')}
        />
        <FieldDescription>Your total take-home pay per month.</FieldDescription>
        <FieldError errors={[errors.monthlyIncome]} />
      </Field>

      <FieldSet>
        <div className="mb-1.5 flex items-center gap-2">
          <FieldLegend className="mb-0">Employment Type</FieldLegend>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircleIcon className="text-muted-foreground size-4 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              Your job status affects your financial risk profile.
            </TooltipContent>
          </Tooltip>
        </div>
        <RadioGroup
          value={employmentType}
          onValueChange={(val) =>
            setValue('employmentType', val as EmploymentType)
          }
          className="flex flex-col gap-2"
        >
          <Field orientation="horizontal">
            <RadioGroupItem value="Full-time" id="ft" />
            <FieldLabel htmlFor="ft" className="cursor-pointer font-normal">
              Full-time
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="Freelance" id="fl" />
            <FieldLabel htmlFor="fl" className="cursor-pointer font-normal">
              Freelance
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="Business Owner" id="bo" />
            <FieldLabel htmlFor="bo" className="cursor-pointer font-normal">
              Business Owner
            </FieldLabel>
          </Field>
        </RadioGroup>
        <FieldError errors={[errors.employmentType]} />
      </FieldSet>
    </FieldGroup>
  );
}

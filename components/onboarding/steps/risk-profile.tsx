import { UseFormReturn } from 'react-hook-form';
import { OnboardingData } from '@/lib/financial-logic';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldSet,
  FieldLegend,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { HelpCircleIcon } from 'lucide-react';

interface RiskProfileProps {
  form: UseFormReturn<OnboardingData>;
}

export function RiskProfile({ form }: RiskProfileProps) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;
  const hasDependents = watch('hasDependents');
  const planningCareerPivot = watch('planningCareerPivot');

  return (
    <FieldGroup>
      <FieldSet>
        <div className="mb-1.5 flex items-center gap-2">
          <FieldLegend className="mb-0">
            Do you have any dependents?
          </FieldLegend>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircleIcon className="text-muted-foreground size-4 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              Dependents increase your necessary emergency fund size.
            </TooltipContent>
          </Tooltip>
        </div>
        <FieldDescription>
          Includes children, elderly parents, or any family members who rely on
          your income.
        </FieldDescription>
        <RadioGroup
          value={hasDependents ? 'yes' : 'no'}
          onValueChange={(val) => setValue('hasDependents', val === 'yes')}
          className="flex flex-col gap-2"
        >
          <Field orientation="horizontal">
            <RadioGroupItem value="yes" id="dependents-yes" />
            <FieldLabel
              htmlFor="dependents-yes"
              className="cursor-pointer font-normal"
            >
              Yes
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="no" id="dependents-no" />
            <FieldLabel
              htmlFor="dependents-no"
              className="cursor-pointer font-normal"
            >
              No
            </FieldLabel>
          </Field>
        </RadioGroup>
        <FieldError errors={[errors.hasDependents]} />
      </FieldSet>

      <FieldSet>
        <div className="mb-1.5 flex items-center gap-2">
          <FieldLegend className="mb-0">
            Are you planning a major career pivot?
          </FieldLegend>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircleIcon className="text-muted-foreground size-4 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              A career pivot requires an additional &apos;Dana Transisi&apos;
              for safety.
            </TooltipContent>
          </Tooltip>
        </div>
        <FieldDescription>
          Such as starting a business or changing careers in the next 1-2 years.
        </FieldDescription>
        <RadioGroup
          value={planningCareerPivot ? 'yes' : 'no'}
          onValueChange={(val) =>
            setValue('planningCareerPivot', val === 'yes')
          }
          className="flex flex-col gap-2"
        >
          <Field orientation="horizontal">
            <RadioGroupItem value="yes" id="pivot-yes" />
            <FieldLabel
              htmlFor="pivot-yes"
              className="cursor-pointer font-normal"
            >
              Yes
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="no" id="pivot-no" />
            <FieldLabel
              htmlFor="pivot-no"
              className="cursor-pointer font-normal"
            >
              No
            </FieldLabel>
          </Field>
        </RadioGroup>
        <FieldError errors={[errors.planningCareerPivot]} />
      </FieldSet>
    </FieldGroup>
  );
}

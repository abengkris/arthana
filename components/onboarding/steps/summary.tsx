import { UseFormReturn } from 'react-hook-form';
import {
  OnboardingData,
  calculateEF,
  getDefaultCategories,
} from '@/lib/financial-logic';
import { FieldGroup } from '@/components/ui/field';
import { Badge } from '@/components/ui/badge';

interface SummaryProps {
  form: UseFormReturn<OnboardingData>;
}

export function Summary({ form }: SummaryProps) {
  const data = form.getValues();
  const efTarget = calculateEF(data);
  const categories = getDefaultCategories(data);

  return (
    <FieldGroup>
      <div className="flex flex-col gap-6">
        <div className="bg-muted rounded-lg p-4">
          <h3 className="text-muted-foreground mb-2 text-sm font-semibold uppercase">
            Emergency Fund Target
          </h3>
          <p className="text-3xl font-bold">IDR {efTarget.toLocaleString()}</p>
          <p className="text-muted-foreground mt-1 text-xs italic">
            Based on IDR {data.monthlyIncome.toLocaleString()} income x{' '}
            {efTarget / data.monthlyIncome}x multiplier.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-muted-foreground text-sm font-semibold uppercase">
            Initial Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge key={cat} variant="secondary" className="px-3 py-1">
                {cat}
              </Badge>
            ))}
          </div>
          <p className="text-muted-foreground text-xs">
            Your income will be automatically allocated into these categories
            based on default percentages. You can customize these later in your
            dashboard.
          </p>
        </div>
      </div>
    </FieldGroup>
  );
}

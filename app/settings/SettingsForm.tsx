'use client';

import { useActionState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { updateSettings } from './actions';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

export default function SettingsForm({
  initialLocale,
  initialStrategy,
}: {
  initialLocale: string;
  initialStrategy: string;
}) {
  const t = useTranslations('settings');
  const [state, formAction, isPending] = useActionState(updateSettings, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(t('save') + ' successful!');
      // To reflect the language change correctly without a full hard refresh,
      // NextIntl might need a hard refresh if cookie based.
      window.location.reload();
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state, t]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('preferences')}</h3>

        <div className="space-y-2">
          <Label htmlFor="locale">{t('language')}</Label>
          <Select name="locale" defaultValue={initialLocale}>
            <SelectTrigger id="locale">
              <SelectValue placeholder={t('language')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="id">Bahasa Indonesia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget_strategy">{t('budget_strategy')}</Label>
          <Select name="budget_strategy" defaultValue={initialStrategy}>
            <SelectTrigger id="budget_strategy">
              <SelectValue placeholder={t('budget_strategy')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="50/30/20">{t('strategy.50_30_20')}</SelectItem>
              <SelectItem value="50/20/30">{t('strategy.50_20_30')}</SelectItem>
              <SelectItem value="60/20/20">{t('strategy.60_20_20')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? '...' : t('save')}
      </Button>
    </form>
  );
}

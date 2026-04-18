'use client';

import * as React from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from '@/components/ui/field';
import { cn } from '@/lib/utils';
import {
  transactionSchema,
  type TransactionInput,
} from '@/lib/validations/transaction';

import { useTranslations } from 'next-intl';

interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense' | 'savings';
  classification: string;
}

interface TransactionFormProps {
  categories: Category[];
  onSubmit: (data: TransactionInput) => Promise<void>;
  isLoading?: boolean;
}

export function TransactionForm({
  categories,
  onSubmit,
  isLoading,
}: TransactionFormProps) {
  const t = useTranslations('transaction');
  const tc = useTranslations('category');
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TransactionInput>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: 'expense',
      amount: undefined,
      category_id: '',
      classification: undefined,
      date: new Date(),
      note: '',
    },
  });

  const type = useWatch({ control, name: 'type' }) || 'expense';
  const category_id = useWatch({ control, name: 'category_id' });

  // Reset category selection when transaction type changes
  React.useEffect(() => {
    setValue('category_id', '', { shouldValidate: true });
    setValue(
      'classification',
      '' as 'kebutuhan' | 'keinginan' | 'tabungan' | 'pendapatan',
      { shouldValidate: true }
    );
  }, [type, setValue]);

  // Automatically set classification when category changes
  React.useEffect(() => {
    if (category_id) {
      const category = categories.find((c) => c.id === category_id);
      if (category) {
        setValue(
          'classification',
          category.classification as
            | 'kebutuhan'
            | 'keinginan'
            | 'tabungan'
            | 'pendapatan',
          { shouldValidate: true }
        );
      }
    }
  }, [category_id, categories, setValue]);

  const filteredCategories = React.useMemo(() => {
    return categories.filter((category) => category.type === type);
  }, [categories, type]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Field orientation="horizontal">
        <div className="flex-1">
          <FieldLabel htmlFor="type">
            {t('type') || 'Jenis Transaksi'}
          </FieldLabel>
          <FieldDescription className="capitalize">
            {type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
          </FieldDescription>
        </div>
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <Switch
              id="type"
              checked={field.value === 'income'}
              onCheckedChange={(checked) =>
                field.onChange(checked ? 'income' : 'expense')
              }
            />
          )}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="amount">{t('amount')}</FieldLabel>
        <Input
          id="amount"
          type="number"
          step="0.01"
          inputMode="decimal"
          placeholder="0"
          {...register('amount')}
        />
        <FieldError errors={[errors.amount]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="category_id">{t('category')}</FieldLabel>
        <Controller
          control={control}
          name="category_id"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger id="category_id">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {filteredCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {tc(category.name)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.category_id]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="classification">{t('classification')}</FieldLabel>
        <Controller
          control={control}
          name="classification"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger id="classification">
                <SelectValue placeholder="Pilih klasifikasi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kebutuhan">
                  {t('classification_options.kebutuhan')}
                </SelectItem>
                <SelectItem value="keinginan">
                  {t('classification_options.keinginan')}
                </SelectItem>
                <SelectItem value="tabungan">
                  {t('classification_options.tabungan')}
                </SelectItem>
                <SelectItem value="pendapatan">
                  {t('classification_options.pendapatan')}
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.classification]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="date">{t('date')}</FieldLabel>
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={'outline'}
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value ? (
                    new Intl.DateTimeFormat('id-ID', {
                      dateStyle: 'full',
                    }).format(field.value)
                  ) : (
                    <span>Pilih tanggal</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date('1900-01-01')
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        />
        <FieldError errors={[errors.date]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="note">{t('description')}</FieldLabel>
        <Input
          id="note"
          placeholder="Contoh: Makan siang…"
          {...register('note')}
        />
        <FieldError errors={[errors.note]} />
      </Field>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {t('save')}
      </Button>
    </form>
  );
}

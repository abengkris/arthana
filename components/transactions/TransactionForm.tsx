'use client';

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
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

interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
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
      date: new Date(),
      note: '',
    },
  });

  const type = useWatch({ control, name: 'type' }) || 'expense';

  // Reset category selection when transaction type changes
  React.useEffect(() => {
    setValue('category_id', '', { shouldValidate: true });
  }, [type, setValue]);

  const filteredCategories = React.useMemo(() => {
    return categories.filter((category) => category.type === type);
  }, [categories, type]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Field orientation="horizontal">
        <div className="flex-1">
          <FieldLabel htmlFor="type">Jenis Transaksi</FieldLabel>
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
        <FieldLabel htmlFor="amount">Nominal</FieldLabel>
        <Input
          id="amount"
          type="number"
          step="0.01"
          placeholder="0"
          {...register('amount')}
        />
        <FieldError errors={[errors.amount]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="category_id">Kategori</FieldLabel>
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
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.category_id]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="date">Tanggal</FieldLabel>
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
                    format(field.value, 'PPP')
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
        <FieldLabel htmlFor="note">Catatan (Opsional)</FieldLabel>
        <Input
          id="note"
          placeholder="Contoh: Makan siang..."
          {...register('note')}
        />
        <FieldError errors={[errors.note]} />
      </Field>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Simpan
      </Button>
    </form>
  );
}

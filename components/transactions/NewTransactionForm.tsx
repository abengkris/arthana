'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowLeft,
  CalendarIcon,
  Loader2,
  Coffee,
  Car,
  ShoppingBag,
  Zap,
  Clapperboard,
  HeartPulse,
  Home,
  BookOpen,
  CreditCard,
} from 'lucide-react';
import { format } from 'date-fns';

import { addTransaction } from '@/app/transactions/actions';
import {
  transactionSchema,
  type TransactionInput,
} from '@/lib/validations/transaction';
import { cn } from '@/lib/utils';

// UI Components
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
}

interface NewTransactionFormProps {
  categories: Category[];
}

export function NewTransactionForm({ categories }: NewTransactionFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TransactionInput>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: 'expense',
      amount: undefined,
      category_id: '',
      date: new Date(),
      note: '',
      payment_method: 'Cash',
    },
  });

  const currentType = watch('type');
  const currentCategory = watch('category_id');
  const currentPaymentMethod = watch('payment_method');

  const filteredCategories = React.useMemo(() => {
    return categories.filter((cat) => cat.type === currentType);
  }, [categories, currentType]);

  // Automatically select the first category if none is selected or if it doesn't match the type
  React.useEffect(() => {
    if (filteredCategories.length > 0) {
      const isCurrentValid = filteredCategories.some(
        (c) => c.id === currentCategory
      );
      if (!isCurrentValid) {
        setValue('category_id', filteredCategories[0].id, {
          shouldValidate: true,
        });
      }
    } else {
      setValue('category_id', '', { shouldValidate: true });
    }
  }, [currentType, filteredCategories, currentCategory, setValue]);

  const onSubmit = async (data: TransactionInput) => {
    setIsLoading(true);
    try {
      const result = await addTransaction(data);
      if (result?.error) {
        console.error(result.error);
        // Could show a toast here
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getIconForCategory = (catName: string) => {
    const name = catName.toLowerCase();
    if (name.includes('food') || name.includes('makan'))
      return { icon: Coffee, color: '#F87171', bg: '#F8717120' };
    if (name.includes('transport') || name.includes('kendaraan'))
      return { icon: Car, color: '#60A5FA', bg: '#60A5FA20' };
    if (name.includes('shop') || name.includes('belanja'))
      return { icon: ShoppingBag, color: '#A78BFA', bg: '#A78BFA20' };
    if (name.includes('bill') || name.includes('tagihan'))
      return { icon: Zap, color: '#34D399', bg: '#34D39920' };
    if (name.includes('entert') || name.includes('hibur'))
      return { icon: Clapperboard, color: '#FBBF24', bg: '#FBBF2420' };
    if (name.includes('health') || name.includes('sehat'))
      return { icon: HeartPulse, color: '#EC4899', bg: '#EC489920' };
    if (name.includes('home') || name.includes('rumah'))
      return { icon: Home, color: '#818CF8', bg: '#818CF820' };
    if (name.includes('edu') || name.includes('pendidikan'))
      return { icon: BookOpen, color: '#F472B6', bg: '#F472B620' };
    return { icon: CreditCard, color: '#9CA3AF', bg: '#9CA3AF20' };
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-h-screen flex-col lg:my-8 lg:min-h-0 lg:overflow-hidden lg:rounded-[32px] lg:bg-[#1A1D24] lg:shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 lg:border-b lg:border-white/5">
        <button
          type="button"
          onClick={() => router.back()}
          className="-ml-2 rounded-full p-2 text-white transition-colors hover:bg-white/10"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold tracking-tight text-white">
          Add Transaction
        </h1>
        <div className="w-10" /> {/* Spacer for alignment */}
      </div>

      <div className="scrollbar-hide flex flex-1 flex-col gap-8 overflow-y-auto px-6 pb-24 lg:pb-6">
        {/* Transaction Type Toggle */}
        <div className="flex w-full rounded-full bg-[#1A1D24] p-1 lg:mx-auto lg:max-w-md lg:bg-[#0F1115]">
          {['expense', 'income'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setValue('type', type as 'expense' | 'income')}
              className={`flex-1 rounded-full py-3 text-sm font-bold capitalize transition-all ${
                currentType === type
                  ? 'bg-[#4A85F6] text-white shadow-md'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Amount Input */}
        <div className="flex flex-col items-center justify-center py-4">
          <span className="mb-2 text-sm font-medium text-[#9CA3AF]">
            Amount
          </span>
          <div className="flex w-full items-center justify-center">
            <span className="mr-1 text-4xl font-extrabold text-white lg:text-5xl">
              $
            </span>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              placeholder="0.00"
              {...register('amount', { valueAsNumber: true })}
              className="w-full max-w-[200px] bg-transparent text-center text-4xl font-extrabold text-white placeholder-white/20 outline-none focus:ring-0 lg:max-w-[300px] lg:text-5xl"
              style={{ caretColor: '#4A85F6' }}
            />
          </div>
          {errors.amount && (
            <p className="mt-2 text-xs text-[#F87171]">
              {errors.amount.message}
            </p>
          )}
        </div>

        {/* Category Selector */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-white">Category</h3>
          <div className="grid grid-cols-4 gap-4 md:grid-cols-8">
            {filteredCategories.map((category) => {
              const {
                icon: Icon,
                color,
                bg,
              } = getIconForCategory(category.name);
              const isSelected = currentCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setValue('category_id', category.id)}
                  className="group flex flex-col items-center gap-2"
                >
                  <div
                    className={cn(
                      'flex h-16 w-16 items-center justify-center rounded-[20px] transition-all',
                      isSelected
                        ? 'scale-105 ring-2 ring-[#4A85F6] ring-offset-2 ring-offset-[#0F1115]'
                        : 'hover:scale-105'
                    )}
                    style={{ backgroundColor: bg, color: color }}
                  >
                    <Icon size={28} />
                  </div>
                  <span
                    className={cn(
                      'w-full truncate text-center text-xs font-medium',
                      isSelected
                        ? 'text-white'
                        : 'text-[#9CA3AF] group-hover:text-white'
                    )}
                  >
                    {category.name}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.category_id && (
            <p className="mt-2 text-xs text-[#F87171]">
              {errors.category_id.message}
            </p>
          )}
        </div>

        {/* Form Grouping for PC */}
        <div className="flex w-full flex-col gap-6 md:flex-row md:gap-8">
          {/* Description */}
          <div className="flex flex-1 flex-col gap-2">
            <label htmlFor="note" className="text-sm font-bold text-white">
              Description
            </label>
            <input
              id="note"
              type="text"
              placeholder="Add a note..."
              {...register('note')}
              className="w-full rounded-2xl bg-[#1A1D24] px-4 py-4 text-white placeholder-[#9CA3AF]/50 transition-all outline-none focus:ring-2 focus:ring-[#4A85F6] lg:bg-[#0F1115]"
            />
            {errors.note && (
              <p className="text-xs text-[#F87171]">{errors.note.message}</p>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-6">
            {/* Date Picker */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-white">Date</label>
              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-2xl bg-[#1A1D24] px-4 py-4 text-white transition-all outline-none focus:ring-2 focus:ring-[#4A85F6] lg:bg-[#0F1115]"
                      >
                        <span className="font-medium">
                          {field.value
                            ? format(field.value, 'MMMM dd, yyyy')
                            : 'Select date'}
                        </span>
                        <CalendarIcon size={20} className="text-[#9CA3AF]" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto rounded-2xl border-white/10 bg-[#1A1D24] p-0 text-white shadow-xl"
                      align="end"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                        className="rounded-2xl bg-[#1A1D24] text-white"
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.date && (
                <p className="text-xs text-[#F87171]">{errors.date.message}</p>
              )}
            </div>

            {/* Payment Method */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-white">
                Payment Method
              </label>
              <div className="flex w-full rounded-2xl bg-[#1A1D24] p-1 lg:bg-[#0F1115]">
                {['Cash', 'Card', 'Bank'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setValue('payment_method', method)}
                    className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all ${
                      currentPaymentMethod === method
                        ? 'bg-[#4A85F6] text-white shadow-md'
                        : 'text-[#9CA3AF] hover:text-white'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="fixed right-0 bottom-0 left-0 bg-gradient-to-t from-[#0F1115] via-[#0F1115] to-transparent p-6 lg:static lg:border-t lg:border-white/5 lg:bg-none lg:p-6">
        <button
          type="submit"
          disabled={isLoading}
          className="flex h-14 w-full items-center justify-center rounded-2xl bg-[#4A85F6] text-lg font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-600 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70 lg:mx-auto lg:max-w-md"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            'Add Transaction'
          )}
        </button>
      </div>
    </form>
  );
}

-- Add classification to transactions
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS classification TEXT;
ALTER TABLE public.transactions DROP CONSTRAINT IF EXISTS transactions_classification_check;
ALTER TABLE public.transactions ADD CONSTRAINT transactions_classification_check CHECK (classification IN ('kebutuhan', 'keinginan', 'tabungan', 'pendapatan'));

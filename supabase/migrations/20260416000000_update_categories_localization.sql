-- Drop the existing constraint (Postgres auto-names it table_column_check)
ALTER TABLE public.categories DROP CONSTRAINT IF EXISTS categories_type_check;

-- Add the new constraint with the refined types
ALTER TABLE public.categories ADD CONSTRAINT categories_type_check CHECK (type IN ('income', 'expense'));

-- Hard delete all existing categories. 
-- Due to ON DELETE SET NULL on transactions.category_id, this won't delete transactions but will un-categorize them.
DELETE FROM public.categories;

-- Seed new categories for all existing users
INSERT INTO public.categories (user_id, name, type)
SELECT id, 'Gaji Utama', 'income' FROM auth.users
UNION ALL
SELECT id, 'Investasi', 'expense' FROM auth.users
UNION ALL
SELECT id, 'Keluarga', 'expense' FROM auth.users
UNION ALL
SELECT id, 'Tabungan Target', 'expense' FROM auth.users
UNION ALL
SELECT id, 'Transportasi & Kendaraan', 'expense' FROM auth.users
UNION ALL
SELECT id, 'Kebutuhan Harian', 'expense' FROM auth.users
UNION ALL
SELECT id, 'Langganan Digital', 'expense' FROM auth.users;

-- Add budget_strategy and locale to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS budget_strategy TEXT DEFAULT '50/30/20';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS locale TEXT DEFAULT 'id';

-- Add classification to categories
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS classification TEXT;
ALTER TABLE public.categories DROP CONSTRAINT IF EXISTS categories_classification_check;
ALTER TABLE public.categories ADD CONSTRAINT categories_classification_check CHECK (classification IN ('kebutuhan', 'keinginan', 'tabungan', 'pendapatan'));

-- Create or replace function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into profiles
  INSERT INTO public.profiles (id, email, full_name, budget_strategy, locale)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', '50/30/20', 'id')
  ON CONFLICT (id) DO NOTHING;

  -- Insert default categories
  INSERT INTO public.categories (user_id, name, type, classification)
  VALUES 
    (NEW.id, 'salary', 'income', 'pendapatan'),
    (NEW.id, 'daily_needs', 'expense', 'kebutuhan'),
    (NEW.id, 'entertainment', 'expense', 'keinginan'),
    (NEW.id, 'investment', 'savings', 'tabungan');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists to recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

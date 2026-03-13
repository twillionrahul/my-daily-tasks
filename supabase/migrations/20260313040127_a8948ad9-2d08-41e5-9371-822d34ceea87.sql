
-- Add user_id column to todos table
ALTER TABLE public.todos ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop existing public RLS policies
DROP POLICY IF EXISTS "Allow all select" ON public.todos;
DROP POLICY IF EXISTS "Allow all insert" ON public.todos;
DROP POLICY IF EXISTS "Allow all update" ON public.todos;
DROP POLICY IF EXISTS "Allow all delete" ON public.todos;

-- Create per-user RLS policies
CREATE POLICY "Users can select own todos"
  ON public.todos FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own todos"
  ON public.todos FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own todos"
  ON public.todos FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own todos"
  ON public.todos FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

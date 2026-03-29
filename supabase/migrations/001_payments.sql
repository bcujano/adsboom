-- ===== AdsBoom CP2: Payments & Subscriptions =====
-- Ejecutar en Supabase SQL Editor

-- ============================================
-- 1. Organizations
-- ============================================
CREATE TABLE IF NOT EXISTS public.organizations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  plan text NOT NULL DEFAULT 'basic' CHECK (plan IN ('basic', 'pro', 'premium', 'enterprise')),
  license_type text NOT NULL DEFAULT 'saas' CHECK (license_type IN ('saas', 'perpetual')),
  custom_domain text,
  logo_url text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'cancelled')),
  owner_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- 2. Organization Members
-- ============================================
CREATE TABLE IF NOT EXISTS public.org_members (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin', 'agent', 'viewer')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(org_id, user_id)
);

-- ============================================
-- 3. Subscriptions
-- ============================================
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  provider text NOT NULL CHECK (provider IN ('paypal', 'payphone')),
  provider_subscription_id text,
  plan text NOT NULL CHECK (plan IN ('basic', 'pro', 'premium', 'enterprise')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled', 'expired', 'trial')),
  billing_period text NOT NULL CHECK (billing_period IN ('monthly', 'annual')),
  current_period_start timestamptz NOT NULL,
  current_period_end timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- 4. Payments
-- ============================================
CREATE TABLE IF NOT EXISTS public.payments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  subscription_id uuid REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  amount numeric(10,2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  provider text NOT NULL CHECK (provider IN ('paypal', 'payphone')),
  type text NOT NULL CHECK (type IN ('subscription', 'one_time')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  provider_payment_id text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- ============================================
-- 5. Licenses
-- ============================================
CREATE TABLE IF NOT EXISTS public.licenses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  license_key text UNIQUE NOT NULL,
  plan text NOT NULL CHECK (plan IN ('basic', 'pro', 'premium', 'enterprise')),
  issued_at timestamptz NOT NULL DEFAULT now(),
  valid_until timestamptz, -- NULL = perpetual
  revoked_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- ============================================
-- 6. Indexes
-- ============================================
CREATE INDEX IF NOT EXISTS idx_org_members_user ON public.org_members(user_id);
CREATE INDEX IF NOT EXISTS idx_org_members_org ON public.org_members(org_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_org ON public.subscriptions(org_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_payments_org ON public.payments(org_id);
CREATE INDEX IF NOT EXISTS idx_payments_provider_id ON public.payments(provider_payment_id);
CREATE INDEX IF NOT EXISTS idx_licenses_org ON public.licenses(org_id);
CREATE INDEX IF NOT EXISTS idx_licenses_key ON public.licenses(license_key);

-- ============================================
-- 7. Row Level Security (RLS)
-- ============================================

-- Organizations
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their organizations"
  ON public.organizations FOR SELECT
  USING (
    id IN (
      SELECT org_id FROM public.org_members WHERE user_id = auth.uid()
    )
    OR owner_id = auth.uid()
  );

CREATE POLICY "Admins can update their organizations"
  ON public.organizations FOR UPDATE
  USING (
    id IN (
      SELECT org_id FROM public.org_members WHERE user_id = auth.uid() AND role = 'admin'
    )
    OR owner_id = auth.uid()
  );

-- Org Members
ALTER TABLE public.org_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view org members"
  ON public.org_members FOR SELECT
  USING (
    org_id IN (
      SELECT org_id FROM public.org_members WHERE user_id = auth.uid()
    )
  );

-- Subscriptions
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view subscriptions"
  ON public.subscriptions FOR SELECT
  USING (
    org_id IN (
      SELECT org_id FROM public.org_members WHERE user_id = auth.uid()
    )
  );

-- Payments
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view payments"
  ON public.payments FOR SELECT
  USING (
    org_id IN (
      SELECT org_id FROM public.org_members WHERE user_id = auth.uid()
    )
  );

-- Licenses
ALTER TABLE public.licenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view licenses"
  ON public.licenses FOR SELECT
  USING (
    org_id IN (
      SELECT org_id FROM public.org_members WHERE user_id = auth.uid()
    )
  );

-- ============================================
-- 8. Trigger: auto-update updated_at
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_organizations_updated_at
  BEFORE UPDATE ON public.organizations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER trigger_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================
-- 9. Function: create org on user signup
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  new_org_id uuid;
  user_name text;
  org_slug text;
BEGIN
  user_name := COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1));
  org_slug := lower(regexp_replace(user_name, '[^a-zA-Z0-9]', '-', 'g')) || '-' || substr(NEW.id::text, 1, 8);

  INSERT INTO public.organizations (name, slug, owner_id)
  VALUES (user_name || '''s Team', org_slug, NEW.id)
  RETURNING id INTO new_org_id;

  INSERT INTO public.org_members (org_id, user_id, role)
  VALUES (new_org_id, NEW.id, 'admin');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop if exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

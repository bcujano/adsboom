// ===== ADSBOOM TYPE DEFINITIONS =====

// --- Auth & Users ---
export type UserRole = 'superadmin' | 'admin' | 'agent' | 'viewer'
export type LicenseType = 'saas' | 'perpetual'
export type PlanTier = 'basic' | 'pro' | 'premium' | 'enterprise'
export type BillingPeriod = 'monthly' | 'annual'
export type PaymentProvider = 'paypal' | 'payphone'
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded'
export type SubscriptionStatus = 'active' | 'paused' | 'cancelled' | 'expired' | 'trial'
export type Locale = 'en' | 'es'
export type Theme = 'light' | 'dark'

export interface Organization {
  id: string
  name: string
  slug: string
  plan: PlanTier
  license_type: LicenseType
  custom_domain: string | null
  logo_url: string | null
  status: 'active' | 'suspended' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  org_id: string
  email: string
  full_name: string
  role: UserRole
  avatar_url: string | null
  lang: Locale
  theme: Theme
  created_at: string
}

export interface Subscription {
  id: string
  org_id: string
  provider: PaymentProvider
  provider_subscription_id: string
  plan: PlanTier
  status: SubscriptionStatus
  billing_period: BillingPeriod
  current_period_start: string
  current_period_end: string
  created_at: string
}

export interface License {
  id: string
  org_id: string
  license_key: string
  plan: PlanTier
  issued_at: string
  valid_until: string | null
}

export interface Payment {
  id: string
  org_id: string
  amount: number
  currency: string
  provider: PaymentProvider
  type: 'subscription' | 'one_time'
  status: PaymentStatus
  provider_payment_id: string
  created_at: string
}

// --- Campaigns ---
export type AdPlatform = 'meta' | 'google' | 'tiktok' | 'linkedin' | 'pinterest' | 'youtube'
export type CampaignStatus = 'draft' | 'pending_review' | 'active' | 'paused' | 'completed' | 'failed'
export type CampaignObjective = 'traffic' | 'conversions' | 'leads' | 'awareness' | 'engagement' | 'sales'
export type CreativeType = 'image' | 'video' | 'carousel' | 'text'

export interface Campaign {
  id: string
  org_id: string
  name: string
  platform: AdPlatform
  status: CampaignStatus
  objective: CampaignObjective
  budget_daily: number
  budget_total: number
  currency: string
  target_audience: TargetAudience
  ai_strategy: string | null
  platform_campaign_id: string | null
  start_date: string | null
  end_date: string | null
  created_at: string
  updated_at: string
}

export interface TargetAudience {
  locations: string[]
  age_min: number
  age_max: number
  genders: ('male' | 'female' | 'all')[]
  interests: string[]
  languages: string[]
  custom_audiences: string[]
}

export interface AdCreative {
  id: string
  campaign_id: string
  type: CreativeType
  content_url: string
  thumbnail_url: string | null
  ai_generated: boolean
  ai_prompt: string | null
  created_at: string
}

export interface AdCopy {
  id: string
  campaign_id: string
  headline: string
  description: string
  cta: string
  lang: Locale
  ai_generated: boolean
  created_at: string
}

// --- Analytics ---
export interface PerformanceLog {
  id: string
  campaign_id: string
  date: string
  impressions: number
  clicks: number
  conversions: number
  spend: number
  revenue: number
  ctr: number
  cpc: number
  cpa: number
  roas: number
}

// --- Leads ---
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
export type LeadChannel = 'email' | 'whatsapp' | 'call' | 'sms'

export interface Lead {
  id: string
  org_id: string
  campaign_id: string | null
  landing_page_id: string | null
  email: string
  phone: string | null
  full_name: string
  score: number
  status: LeadStatus
  source: string
  metadata: Record<string, unknown>
  created_at: string
}

// --- Funnels ---
export interface LandingPage {
  id: string
  org_id: string
  campaign_id: string | null
  title: string
  slug: string
  html_content: string
  css_content: string
  published: boolean
  visits: number
  conversions: number
  created_at: string
  updated_at: string
}

// --- Automation ---
export interface AutomationRule {
  id: string
  org_id: string
  name: string
  trigger: string
  condition: Record<string, unknown>
  action: Record<string, unknown>
  active: boolean
  created_at: string
}

// --- Agency ---
export interface AgencyClient {
  id: string
  org_id: string
  client_name: string
  custom_domain: string | null
  logo_url: string | null
  contact_email: string
  status: 'active' | 'inactive'
  created_at: string
}

// --- Plans Configuration ---
export interface PlanConfig {
  tier: PlanTier
  name: string
  price_monthly: number
  price_annual: number
  price_license: number
  max_users: number
  max_campaigns_monthly: number
  max_platforms: number
  features: string[]
}

export const PLANS: PlanConfig[] = [
  {
    tier: 'basic',
    name: 'Basic',
    price_monthly: 49,
    price_annual: 490,
    price_license: 890,
    max_users: 2,
    max_campaigns_monthly: 10,
    max_platforms: 2,
    features: [
      'ai_copy_generation',
      'ai_image_generation',
      'campaign_publishing',
      'basic_analytics',
      'email_notifications',
    ],
  },
  {
    tier: 'pro',
    name: 'Pro',
    price_monthly: 99,
    price_annual: 990,
    price_license: 1990,
    max_users: 10,
    max_campaigns_monthly: 30,
    max_platforms: 4,
    features: [
      'ai_copy_generation',
      'ai_image_generation',
      'ai_video_generation',
      'campaign_publishing',
      'advanced_analytics',
      'ab_testing',
      'competitor_spy',
      'automation_rules',
      'email_notifications',
      'whatsapp_notifications',
    ],
  },
  {
    tier: 'premium',
    name: 'Premium',
    price_monthly: 199,
    price_annual: 1990,
    price_license: 4990,
    max_users: 30,
    max_campaigns_monthly: 100,
    max_platforms: 6,
    features: [
      'ai_copy_generation',
      'ai_image_generation',
      'ai_video_generation',
      'campaign_publishing',
      'advanced_analytics',
      'ab_testing',
      'competitor_spy',
      'roi_predictor',
      'ad_fatigue_detection',
      'automation_rules',
      'funnel_builder',
      'lead_bridge',
      'email_notifications',
      'whatsapp_notifications',
      'pdf_reports',
      'api_access',
    ],
  },
  {
    tier: 'enterprise',
    name: 'Enterprise',
    price_monthly: 999,
    price_annual: 9990,
    price_license: 24990,
    max_users: -1, // unlimited
    max_campaigns_monthly: -1,
    max_platforms: 6,
    features: [
      'ai_copy_generation',
      'ai_image_generation',
      'ai_video_generation',
      'campaign_publishing',
      'advanced_analytics',
      'ab_testing',
      'competitor_spy',
      'roi_predictor',
      'ad_fatigue_detection',
      'trend_radar',
      'automation_rules',
      'funnel_builder',
      'lead_bridge',
      'agency_hub',
      'white_label',
      'custom_domain',
      'client_portal',
      'email_notifications',
      'whatsapp_notifications',
      'pdf_reports',
      'api_access',
      'dedicated_support',
    ],
  },
]

// --- Business DNA (Onboarding) ---
export interface BusinessDNA {
  id: string
  org_id: string
  company_name: string
  industry: string
  website_url: string | null
  online_store_url: string | null
  store_platform: 'shopify' | 'woocommerce' | 'custom' | 'none' | null
  description: string
  products_services: string
  price_range: string
  target_age_min: number
  target_age_max: number
  target_locations: string[]
  target_interests: string[]
  target_gender: 'all' | 'male' | 'female'
  social_instagram: string | null
  social_facebook: string | null
  social_tiktok: string | null
  social_linkedin: string | null
  social_youtube: string | null
  monthly_ad_budget: number
  ad_platforms: AdPlatform[]
  created_at: string
  updated_at: string
}

// --- Platform Connections (OAuth) ---
export type ConnectionPlatform = 'meta' | 'google' | 'tiktok' | 'linkedin' | 'pinterest' | 'youtube'
export type ConnectionStatus = 'active' | 'expired' | 'revoked'

export interface PlatformConnection {
  id: string
  org_id: string
  platform: ConnectionPlatform
  account_name: string
  account_id: string
  ad_account_id: string | null
  ad_account_name: string | null
  status: ConnectionStatus
  connected_at: string
  expires_at: string | null
}

// --- AI Engine Keys ---
export type AIEngine = 'openai' | 'anthropic' | 'gemini' | 'nano_banana' | 'veo3' | 'runway'

export interface AIKeyConfig {
  id: string
  org_id: string
  engine: AIEngine
  api_key_encrypted: string
  is_active: boolean
  last_used_at: string | null
  created_at: string
}

export const AI_ENGINES: { id: AIEngine; name: string; description: string; category: 'text' | 'image' | 'video' }[] = [
  { id: 'openai', name: 'OpenAI GPT-4o', description: 'Generación de copy publicitario', category: 'text' },
  { id: 'anthropic', name: 'Anthropic Claude', description: 'Estrategia IA, análisis, landing pages', category: 'text' },
  { id: 'gemini', name: 'Google Gemini', description: 'Copy alternativo, análisis multimodal', category: 'text' },
  { id: 'nano_banana', name: 'Nano Banana (Google Imagen 3)', description: 'Generación de imágenes publicitarias', category: 'image' },
  { id: 'veo3', name: 'Google Veo 3', description: 'Generación de video publicitario', category: 'video' },
  { id: 'runway', name: 'Runway Gen-3 Alpha', description: 'Video alternativo de alta calidad', category: 'video' },
]

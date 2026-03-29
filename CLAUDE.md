# ADSBOOM — Proyecto de Referencia

## Identidad
- **Nombre:** AdsBoom
- **Dominio:** adsboom.emprendimientum.com
- **Propietario:** Byron Cujano (Emprendimientum)
- **GitHub:** bcujano/adsboom
- **Vercel:** adsboom (bcujano's projects)
- **Supabase:** AdsBoom System (gwqzbhmpetsqwvyunugh.supabase.co)

## Descripcion
Plataforma de gestion de campanas publicitarias con IA. Crea, optimiza y escala campanas en Meta, Google, TikTok, LinkedIn, Pinterest y YouTube. La IA genera copy, imagenes (Google Imagen 3), video (Runway Gen-3) y estrategia (Claude API).

## Modos de entrega
1. **SaaS** — suscripcion mensual/anual en adsboom.emprendimientum.com
2. **Licencia one-time** — cliente compra, se le entrega deploy Vercel + Supabase
3. **Embebido** — modulo /ads dentro de CRM-321 (sistema inmobiliario independiente)

## Stack tecnico
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4 (Glass Design System crystal 3D)
- Framer Motion (animaciones)
- next-intl (i18n: espanol default + ingles)
- Supabase (auth + PostgreSQL + RLS multi-tenant)
- PayPal (pagos internacionales)
- PayPhone (pagos LATAM/Ecuador)
- OpenAI GPT-4o (copy generation)
- Google Imagen 3 via Vertex AI (imagenes)
- Runway Gen-3 Alpha (video)
- Claude API (estrategia IA, analisis)
- Resend (email notifications)
- Vercel (deploy)

## Planes (USD)
| Plan | Mensual | Anual | Licencia |
|------|---------|-------|----------|
| Basic | $49 | $490 | $890 |
| Pro | $99 | $990 | $1,990 |
| Premium | $199 | $1,990 | $4,990 |
| Enterprise | $399 | $3,990 | $12,990 |

## Modulos
1. Campaign Studio — crear campanas con IA
2. Intelligence — competitor spy, ROI predictor, ad fatigue
3. Autopilot — reglas automaticas, A/B testing, budget optimizer
4. Funnel Builder — landing pages con IA
5. Lead Bridge — leads a CRM, scoring, WhatsApp/email secuencias
6. Agency Hub — white-label, multi-cliente, portal, dominio propio
7. Analytics Pro — attribution, funnel visual, reportes PDF
8. Real Estate Mode — listing a ad en 1 click (para CRM-321)

## Checkpoints
| Tag | Contenido |
|-----|-----------|
| FOUNDATION-CORE-SUPABASE | Next.js + Supabase + Auth + Glass Design + i18n + Landing + Login + Dashboard |
| PAYMENTS-POST-PAYPAL-PAYPHONE | Pricing + PayPal + PayPhone + Webhooks + Billing |
| CAMPAIGN-STUDIO-META-AI | Campanas IA + Meta Ads publish |
| CAMPAIGN-MULTIPLATFORM-ADS | Google Ads + TikTok |
| INTELLIGENCE-PRE-AUTOPILOT | Spy, predictor, A/B, reglas |
| FUNNEL-BUILDER-LANDING-PAGES | Landing pages builder + formularios |
| AGENCY-HUB-PRE-WHITELABEL | White-label, portal cliente |
| LEAD-BRIDGE-POST-ANALYTICS | Leads, scoring, reportes |
| CRM321-INTEGRATION-RELEASE | Modulo /ads en CRM-321 = v1.0 |

## Estructura
```
src/app/
  (marketing)/    — Landing, Pricing (publico)
  (auth)/         — Login, Register
  (app)/          — App protegida (dashboard, campaigns, settings...)
  (admin)/        — Super admin (tenants, licencias, revenue)
  api/            — Webhooks, subscriptions, licenses

src/components/
  glass/          — Design system (GlassCard, GlassButton, GlassInput, etc.)
  layout/         — Sidebar, Header, ThemeToggle
  providers/      — ThemeProvider, AuthProvider
  checkout/       — PricingTable, CheckoutModal, PayPalBtn, PayPhoneBtn

src/lib/
  supabase/       — Client browser + server
  i18n/           — Config + request
  payments/       — PayPal + PayPhone + plan activation
  utils.ts        — Helpers

src/messages/     — en.json, es.json
src/types/        — TypeScript types + plan config
```

## Reglas de desarrollo
- Idioma default: espanol con tildes y enie correctas
- Footer: "Powered by Emprendimientum"
- Diseno: Crystal Glass 3D (CSS puro, no WebGL — WebGL no funciona bien en produccion SaaS)
- Dark/Light mode: toggle instantaneo
- Git: checkpoints con nombres descriptivos
- Ruta local: C:\dev\adsboom
- Sistema 100% independiente de CRM-321
- No usar placeholders "proximamente" — todo debe funcionar o no mostrarse

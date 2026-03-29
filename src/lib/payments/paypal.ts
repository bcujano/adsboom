// ===== PayPal REST API v2 Helper =====

const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE || 'https://api-m.sandbox.paypal.com'
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || ''
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || ''

interface PayPalAccessToken {
  access_token: string
  token_type: string
  expires_in: number
}

interface PayPalOrder {
  id: string
  status: string
  links: { rel: string; href: string; method: string }[]
}

interface PayPalCaptureResult {
  id: string
  status: string
  purchase_units: {
    reference_id: string
    payments: {
      captures: {
        id: string
        status: string
        amount: { currency_code: string; value: string }
      }[]
    }
  }[]
  payer: {
    email_address: string
    payer_id: string
    name: { given_name: string; surname: string }
  }
}

// --- Get OAuth2 Access Token ---
export async function getAccessToken(): Promise<string> {
  const credentials = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64')

  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`PayPal OAuth error: ${err}`)
  }

  const data: PayPalAccessToken = await res.json()
  return data.access_token
}

// --- Create Order ---
export async function createOrder(params: {
  amount: number
  currency?: string
  description: string
  referenceId: string
}): Promise<PayPalOrder> {
  const { amount, currency = 'USD', description, referenceId } = params
  const accessToken = await getAccessToken()

  const res = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: referenceId,
          description,
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
        },
      ],
      payment_source: {
        paypal: {
          experience_context: {
            brand_name: 'AdsBoom',
            landing_page: 'LOGIN',
            user_action: 'PAY_NOW',
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/paypal/capture`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
          },
        },
      },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`PayPal create order error: ${err}`)
  }

  return res.json()
}

// --- Capture Order ---
export async function captureOrder(orderId: string): Promise<PayPalCaptureResult> {
  const accessToken = await getAccessToken()

  const res = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`PayPal capture error: ${err}`)
  }

  return res.json()
}

// --- Get Order Details ---
export async function getOrderDetails(orderId: string): Promise<PayPalOrder> {
  const accessToken = await getAccessToken()

  const res = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`PayPal get order error: ${err}`)
  }

  return res.json()
}

// --- Verify Webhook Signature ---
export async function verifyWebhookSignature(params: {
  authAlgo: string
  certUrl: string
  transmissionId: string
  transmissionSig: string
  transmissionTime: string
  webhookId: string
  webhookEvent: Record<string, unknown>
}): Promise<boolean> {
  const accessToken = await getAccessToken()

  const res = await fetch(`${PAYPAL_API_BASE}/v1/notifications/verify-webhook-signature`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      auth_algo: params.authAlgo,
      cert_url: params.certUrl,
      transmission_id: params.transmissionId,
      transmission_sig: params.transmissionSig,
      transmission_time: params.transmissionTime,
      webhook_id: params.webhookId,
      webhook_event: params.webhookEvent,
    }),
  })

  if (!res.ok) return false

  const data = await res.json()
  return data.verification_status === 'SUCCESS'
}

// ===== PayPhone API Helper =====
// Docs: https://payphonetodoesposible.com/docs

const PAYPHONE_TOKEN = process.env.PAYPHONE_TOKEN || ''
const PAYPHONE_API_BASE = process.env.PAYPHONE_API_BASE || 'https://pay.payphonetodoesposible.com/api'

interface PayPhonePrepareResponse {
  paymentId: number
  payWithCard: string
  payWithPayPhone: string
  payWithBankTransfer?: string
}

interface PayPhoneConfirmResponse {
  statusCode: number
  message: string
  transactionId: number
  clientTransactionId: string
  amount: number
  storeId: string
  optionalParameter?: string
  status: string
  transactionStatus: string
  authorizationCode?: string
  email?: string
  phoneNumber?: string
  document?: string
  cardType?: string
  lastDigits?: string
  currency: string
  documentId?: string
}

// --- Prepare Payment ---
// amount en CENTAVOS (ej: $49.00 = 4900)
export async function preparePayment(params: {
  amount: number          // centavos
  amountWithTax?: number  // centavos
  amountWithoutTax?: number // centavos
  tax?: number            // centavos
  clientTransactionId: string
  responseUrl: string
  cancellationUrl: string
  reference?: string
  email?: string
  phoneNumber?: string
  documentId?: string
}): Promise<PayPhonePrepareResponse> {
  const {
    amount,
    amountWithTax = 0,
    amountWithoutTax = amount,
    tax = 0,
    clientTransactionId,
    responseUrl,
    cancellationUrl,
    reference,
    email,
    phoneNumber,
    documentId,
  } = params

  const body: Record<string, unknown> = {
    amount,
    amountWithTax,
    amountWithoutTax,
    tax,
    clientTransactionId,
    responseUrl,
    cancellationUrl,
    storeId: process.env.PAYPHONE_STORE_ID,
  }

  if (reference) body.reference = reference
  if (email) body.email = email
  if (phoneNumber) body.phoneNumber = phoneNumber
  if (documentId) body.documentId = documentId

  const res = await fetch(`${PAYPHONE_API_BASE}/button/Prepare`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PAYPHONE_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`PayPhone prepare error: ${err}`)
  }

  return res.json()
}

// --- Confirm / Verify Payment ---
export async function confirmPayment(transactionId: string | number): Promise<PayPhoneConfirmResponse> {
  const res = await fetch(`${PAYPHONE_API_BASE}/button/V2/Confirm`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PAYPHONE_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: Number(transactionId),
      clientTxId: '',
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`PayPhone confirm error: ${err}`)
  }

  return res.json()
}

// --- Helpers ---
export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100)
}

export function centsToDollars(cents: number): number {
  return cents / 100
}

// --- Check if payment was successful ---
export function isPaymentSuccessful(response: PayPhoneConfirmResponse): boolean {
  return (
    response.statusCode === 3 ||
    response.transactionStatus === 'Approved' ||
    response.status === 'Approved'
  )
}

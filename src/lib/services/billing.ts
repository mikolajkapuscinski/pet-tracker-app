// ---------------------------------------------------------------------------
// BILLING SERVICE
//
// Firebase swap:
//   import { doc, updateDoc, serverTimestamp } from 'firebase/firestore'
//   import { db } from '../firebase'
//   (or redirect to Stripe customer portal URL stored in Firestore)
// ---------------------------------------------------------------------------

export async function managePlan(): Promise<void> {
  // Firebase: const snap = await getDoc(doc(db, 'billing', 'subscription'))
  //           window.location.href = snap.data()?.stripePortalUrl
  console.log('[billing] managePlan')
  await delay(900)
}

export async function updateCard(): Promise<void> {
  // Firebase: same as above – redirect to Stripe portal update-payment URL
  console.log('[billing] updateCard')
  await delay(900)
}

export async function downloadInvoice(date: string): Promise<void> {
  // Firebase: const url = await getDownloadURL(ref(storage, `invoices/${date}.pdf`))
  //           window.open(url)
  console.log('[billing] downloadInvoice', date)
  await delay(700)
}

// ---------------------------------------------------------------------------

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

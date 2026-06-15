// ---------------------------------------------------------------------------
// SETTINGS SERVICE
//
// Firebase swap:
//   import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
//   import { db } from '../firebase'
// ---------------------------------------------------------------------------

export async function saveNotificationPreferences(
  prefs: Array<{ label: string; enabled: boolean }>,
): Promise<void> {
  // Firebase: await setDoc(doc(db, 'settings', 'notifications'), { prefs, updatedAt: serverTimestamp() })
  console.log('[settings] saveNotificationPreferences', prefs)
  await delay(800)
}

// ---------------------------------------------------------------------------

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

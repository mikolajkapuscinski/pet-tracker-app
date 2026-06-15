// ---------------------------------------------------------------------------
// DEVICES SERVICE
//
// Firebase swap:
//   import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'
//   import { db } from '../firebase'
// ---------------------------------------------------------------------------

export async function addCollar(name: string): Promise<void> {
  // Firebase: await addDoc(collection(db, 'devices'), { name, status: 'Pending', createdAt: serverTimestamp() })
  console.log('[devices] addCollar', name)
  await delay(900)
}

export async function findDevice(serial: string): Promise<void> {
  // Firebase: await updateDoc(doc(db, 'devices', serial), { findRequested: true, findRequestedAt: serverTimestamp() })
  console.log('[devices] findDevice', serial)
  await delay(800)
}

// ---------------------------------------------------------------------------

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

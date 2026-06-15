// ---------------------------------------------------------------------------
// SAFETY ZONES SERVICE
//
// Firebase swap:
//   import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'
//   import { db } from '../firebase'
// ---------------------------------------------------------------------------

export async function addZone(name: string): Promise<void> {
  // Firebase: await addDoc(collection(db, 'zones'), { name, status: 'Active', createdAt: serverTimestamp() })
  console.log('[zones] addZone', name)
  await delay(800)
}

export async function editZone(name: string): Promise<void> {
  // Firebase: await updateDoc(doc(db, 'zones', name), { updatedAt: serverTimestamp() })
  console.log('[zones] editZone', name)
  await delay(600)
}

// ---------------------------------------------------------------------------

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

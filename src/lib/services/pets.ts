// ---------------------------------------------------------------------------
// PETS SERVICE
// Each function is a stub that mirrors the Firebase call you will add later.
//
// Firebase swap:
//   import { doc, updateDoc, collection, addDoc } from 'firebase/firestore'
//   import { db } from '../firebase'   // your initialized Firestore instance
// ---------------------------------------------------------------------------

export async function findPet(petName: string): Promise<void> {
  // Firebase: await updateDoc(doc(db, 'pets', petName), { findRequested: true, findRequestedAt: serverTimestamp() })
  console.log('[pets] findPet', petName)
  await delay(800)
}

export async function soundCollar(petName: string): Promise<void> {
  // Firebase: await updateDoc(doc(db, 'pets', petName), { soundRequested: true })
  console.log('[pets] soundCollar', petName)
  await delay(600)
}

export async function enableLostMode(petNames: string[]): Promise<void> {
  // Firebase: batch write – set lostMode=true on each pet doc + add alert to 'alerts' collection
  console.log('[pets] enableLostMode', petNames)
  await delay(1200)
}

// ---------------------------------------------------------------------------

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

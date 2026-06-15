// ---------------------------------------------------------------------------
// FAMILY GROUP SERVICE
//
// Firebase swap:
//   import { collection, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'
//   import { db } from '../firebase'
// ---------------------------------------------------------------------------

export async function inviteMember(email: string): Promise<void> {
  // Firebase: await addDoc(collection(db, 'invites'), { email, sentAt: serverTimestamp(), status: 'pending' })
  console.log('[family] inviteMember', email)
  await delay(900)
}

export async function removeMember(name: string): Promise<void> {
  // Firebase: await deleteDoc(doc(db, 'familyMembers', name))
  console.log('[family] removeMember', name)
  await delay(700)
}

// ---------------------------------------------------------------------------

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import ReactGA from 'react-ga4'

import { auth } from './firebase.config'

export async function loginWithEmail(email: string, password: string) {
  ReactGA.event({
    category: 'Auth',
    action: 'Login',
  })
  return signInWithEmailAndPassword(auth, email, password)
}

export async function registerWithEmail(params: {
  name: string
  email: string
  password: string
}) {
  const credential = await createUserWithEmailAndPassword(
    auth,
    params.email,
    params.password,
  )

  if (params.name.trim()) {
    await updateProfile(credential.user, {
      displayName: params.name.trim(),
    })
  }

  return credential
}

export function logout() {
    ReactGA.event({
        category: 'Auth',
        action: 'Logout',
    })
  return signOut(auth)
}

export function getAuthErrorMessage(error: unknown) {
  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof error.code === 'string'
  ) {
    switch (error.code) {
      case 'auth/invalid-email':
        return 'Podany adres email jest nieprawidłowy.'
      case 'auth/user-disabled':
        return 'To konto zostało wyłączone.'
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Nieprawidłowy email lub hasło.'
      case 'auth/email-already-in-use':
        return 'Konto z tym adresem email już istnieje.'
      case 'auth/weak-password':
        return 'Hasło jest zbyt słabe. Użyj minimum 6 znaków.'
      case 'auth/missing-password':
        return 'Podaj hasło.'
      case 'auth/network-request-failed':
        return 'Problem z siecią. Spróbuj ponownie.'
      default:
        return 'Wystąpił błąd. Spróbuj ponownie.'
    }
  }

  return 'Wystąpił błąd. Spróbuj ponownie.'
}
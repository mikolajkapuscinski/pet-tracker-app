import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowRight,
  LockKeyhole,
  Mail,
  PawPrint,
  Radar,
  ShieldCheck,
  UserRound,
} from 'lucide-react'

import { getAuthErrorMessage, registerWithEmail } from '#/lib/auth'

export const Route = createFileRoute('/register')({
  component: RegisterPage,
})

function RegisterPage() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError(null)

    if (password.length < 6) {
      setError('Hasło musi mieć minimum 6 znaków.')
      return
    }

    if (password !== repeatPassword) {
      setError('Hasła nie są takie same.')
      return
    }

    setIsSubmitting(true)

    try {
      await registerWithEmail({
        name,
        email,
        password,
      })

      await navigate({ to: '/dashboard' })
    } catch (err) {
      setError(getAuthErrorMessage(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#edf8f4] text-slate-950">
      <div className="grid min-h-screen grid-cols-[260px_1fr] max-lg:grid-cols-1">
        <aside className="border-r border-teal-100 bg-white/70 px-5 py-6 backdrop-blur max-lg:hidden">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-cyan-500 text-white shadow-lg shadow-cyan-500/20">
              <ShieldCheck size={22} />
            </div>

            <div>
              <p className="font-bold leading-none">PetGuard Pro</p>
              <p className="mt-1 text-xs font-semibold tracking-[0.22em] text-slate-400">
                WATCHFUL PEACE
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-3xl border border-teal-100 bg-teal-50/70 p-5">
            <p className="text-sm font-bold">Create secure profile</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Utwórz konto właściciela i przygotuj przestrzeń do monitorowania pupili.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold text-teal-700 shadow-sm">
              <Radar size={14} />
              Registration active
            </div>
          </div>
        </aside>

        <section className="relative overflow-hidden px-8 py-8 max-sm:px-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(20,184,166,0.16),transparent_35%),radial-gradient(circle_at_35%_70%,rgba(99,102,241,0.12),transparent_32%)]" />

          <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
            <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_450px]">
              <section className="max-lg:hidden">
                <p className="text-xs font-bold uppercase tracking-[0.34em] text-slate-400">
                  New account
                </p>

                <h1 className="mt-4 max-w-xl text-5xl font-black tracking-tight text-slate-950">
                  Start monitoring with a protected owner account.
                </h1>

                <p className="mt-5 max-w-lg text-lg leading-8 text-slate-500">
                  Po rejestracji możesz dodać pupile, urządzenia, członków rodziny
                  oraz strefy bezpieczeństwa.
                </p>

                <div className="mt-8 rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-200/70 backdrop-blur">
                  <div className="grid gap-3">
                    <div className="rounded-2xl border border-teal-100 bg-teal-50 px-4 py-4">
                      <p className="text-sm font-black text-teal-900">1. Create account</p>
                      <p className="mt-1 text-sm text-teal-700">
                        Zapis konta w Firebase Authentication.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                      <p className="text-sm font-black text-slate-900">2. Add pet profile</p>
                      <p className="mt-1 text-sm text-slate-500">
                        Dane pupila i status urządzenia w dashboardzie.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                      <p className="text-sm font-black text-slate-900">3. Set safe zones</p>
                      <p className="mt-1 text-sm text-slate-500">
                        Strefy i alerty bezpieczeństwa dla rodziny.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-[2rem] border border-white/70 bg-white p-6 shadow-xl shadow-slate-200/80">
                <div className="mb-7">
                  <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                    <PawPrint size={24} />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-400">
                    Sign up
                  </p>

                  <h2 className="mt-3 text-3xl font-black tracking-tight">
                    Utwórz konto
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Zarejestruj konto właściciela w PetGuard Pro.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-slate-700">
                      Imię
                    </span>

                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-teal-400 focus-within:bg-white">
                      <UserRound size={18} className="text-slate-400" />
                      <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        type="text"
                        autoComplete="name"
                        placeholder="Mikołaj"
                        className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
                        required
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-slate-700">
                      Email
                    </span>

                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-teal-400 focus-within:bg-white">
                      <Mail size={18} className="text-slate-400" />
                      <input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
                        required
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-slate-700">
                      Hasło
                    </span>

                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-teal-400 focus-within:bg-white">
                      <LockKeyhole size={18} className="text-slate-400" />
                      <input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        autoComplete="new-password"
                        placeholder="Minimum 6 znaków"
                        className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
                        required
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-slate-700">
                      Powtórz hasło
                    </span>

                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-teal-400 focus-within:bg-white">
                      <LockKeyhole size={18} className="text-slate-400" />
                      <input
                        value={repeatPassword}
                        onChange={(event) => setRepeatPassword(event.target.value)}
                        type="password"
                        autoComplete="new-password"
                        placeholder="Powtórz hasło"
                        className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
                        required
                      />
                    </div>
                  </label>

                  {error ? (
                    <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                      {error}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3.5 text-sm font-black text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? 'Tworzenie konta...' : 'Utwórz konto'}
                    <ArrowRight size={17} />
                  </button>
                </form>

                <div className="mt-6 rounded-2xl bg-teal-50 px-4 py-4 text-center text-sm text-slate-600">
                  Masz już konto?{' '}
                  <Link
                    to="/login"
                    className="font-black text-teal-700 hover:text-teal-900"
                  >
                    Zaloguj się
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
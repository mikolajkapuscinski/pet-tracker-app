import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowRight,
  LockKeyhole,
  Mail,
  MapPin,
  PawPrint,
  Radar,
  ShieldCheck,
} from 'lucide-react'

import { getAuthErrorMessage, loginWithEmail } from '#/lib/auth'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError(null)
    setIsSubmitting(true)

    try {
      await loginWithEmail(email, password)
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
            <p className="text-sm font-bold">Secure access</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Zaloguj się, żeby monitorować urządzenia, strefy bezpieczeństwa i status pupili.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold text-teal-700 shadow-sm">
              <Radar size={14} />
              Auth monitor active
            </div>
          </div>
        </aside>

        <section className="relative overflow-hidden px-8 py-8 max-sm:px-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(20,184,166,0.16),transparent_35%),radial-gradient(circle_at_35%_70%,rgba(99,102,241,0.12),transparent_32%)]" />

          <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
            <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_430px]">
              <section className="max-lg:hidden">
                <p className="text-xs font-bold uppercase tracking-[0.34em] text-slate-400">
                  Welcome back
                </p>

                <h1 className="mt-4 max-w-xl text-5xl font-black tracking-tight text-slate-950">
                  Keep your pets inside the safe zone.
                </h1>

                <p className="mt-5 max-w-lg text-lg leading-8 text-slate-500">
                  Panel monitoringu pozwala sprawdzać lokalizację, status urządzeń,
                  alerty i historię bezpieczeństwa w jednym miejscu.
                </p>

                <div className="mt-8 rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-200/70 backdrop-blur">
                  <div className="relative h-[300px] overflow-hidden rounded-[1.5rem] border border-teal-100 bg-[#e8f4ee]">
                    <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(15,118,110,0.11)_1px,transparent_1px),linear-gradient(90deg,rgba(15,118,110,0.11)_1px,transparent_1px)] [background-size:42px_42px]" />

                    <div className="absolute left-[14%] top-[28%] h-1 w-[75%] rotate-[-10deg] rounded-full bg-orange-200/70" />
                    <div className="absolute left-[18%] top-[66%] h-1 w-[68%] rotate-[15deg] rounded-full bg-slate-300/60" />

                    <div className="absolute left-1/2 top-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-500/40 bg-violet-500/5" />
                    <div className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-500/50 bg-violet-500/10" />
                    <div className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600 text-white shadow-xl shadow-violet-500/30">
                      <div className="flex h-full items-center justify-center">
                        <PawPrint size={23} />
                      </div>
                    </div>

                    <div className="absolute bottom-5 left-5 rounded-2xl bg-white/90 px-4 py-3 text-sm shadow-lg">
                      <p className="font-bold text-slate-900">Safe signal</p>
                      <p className="mt-1 text-slate-500">System ready · login required</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-[2rem] border border-white/70 bg-white p-6 shadow-xl shadow-slate-200/80">
                <div className="mb-7">
                  <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                    <LockKeyhole size={24} />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-400">
                    Sign in
                  </p>

                  <h2 className="mt-3 text-3xl font-black tracking-tight">
                    Zaloguj się
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Wróć do panelu PetGuard Pro i kontynuuj monitoring.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                        autoComplete="current-password"
                        placeholder="••••••••"
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
                    {isSubmitting ? 'Logowanie...' : 'Zaloguj'}
                    <ArrowRight size={17} />
                  </button>
                </form>

                <div className="mt-6 rounded-2xl bg-teal-50 px-4 py-4 text-center text-sm text-slate-600">
                  Nie masz jeszcze konta?{' '}
                  <Link
                    to="/register"
                    className="font-black text-teal-700 hover:text-teal-900"
                  >
                    Utwórz konto
                  </Link>
                </div>

                <div className="mt-5 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
                  <MapPin size={14} />
                  Protected dashboard
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
import { Link } from '@tanstack/react-router'
import {
  ShieldCheck,
  MapPin,
  Search,
  Home,
  ArrowLeft,
  PawPrint,
  Radar,
} from 'lucide-react'

export function NotFoundPage() {
  return (
    <main className="min-h-screen bg-[#edf8f4] text-slate-950">
      <div className="min-h-screen">
        <section className="relative overflow-hidden px-8 py-8 max-sm:px-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(20,184,166,0.16),transparent_35%),radial-gradient(circle_at_35%_70%,rgba(99,102,241,0.12),transparent_32%)]" />

          <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col">
            <header className="flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.34em] text-slate-400">
                  Live monitoring • route not found
                </p>
                <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                  Lost page detected
                </h1>
                <p className="mt-2 text-slate-500">
                    It seems like you've ventured outside the safe zone.
                </p>
              </div>
            </header>

            <div className="flex flex-col items-center gap-8 py-10 ">
              <section className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-200/70 backdrop-blur w-full">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-400">
                      Live map
                    </p>
                    <h2 className="mt-2 text-2xl font-black">Unknown location</h2>
                  </div>
                </div>

                <div className="relative h-[470px] overflow-hidden rounded-[1.7rem] border border-teal-100 bg-[#e8f4ee]">
                  <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(15,118,110,0.11)_1px,transparent_1px),linear-gradient(90deg,rgba(15,118,110,0.11)_1px,transparent_1px)] [background-size:44px_44px]" />

                  <div className="absolute left-[12%] top-[20%] h-1 w-[76%] rotate-[-10deg] rounded-full bg-orange-200/70" />
                  <div className="absolute left-[18%] top-[62%] h-1 w-[70%] rotate-[16deg] rounded-full bg-orange-200/70" />
                  <div className="absolute left-[46%] top-[8%] h-[82%] w-1 rotate-[8deg] rounded-full bg-slate-300/60" />
                  <div className="absolute left-[20%] top-[42%] h-1 w-[70%] rotate-[-2deg] rounded-full bg-slate-300/60" />

                  <div className="absolute left-1/2 top-1/2 size-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-500/40 bg-violet-500/5" />
                  <div className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-500/50 bg-violet-500/10" />
                  <div className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600 text-white shadow-xl shadow-violet-500/30">
                    <div className="flex h-full items-center justify-center">
                      <PawPrint size={26} />
                    </div>
                  </div>
                </div>
              </section>

                <div className="rounded-[2rem] border border-white/70 bg-white p-6 shadow-xl shadow-slate-200/80 w-full">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-400">
                        Alert details
                      </p>
                      <h2 className="mt-3 text-2xl font-black">404</h2>
                    </div>
                  </div>

                  <p className="mt-4 leading-7 text-slate-500">
                    Not found: The view for this address could not be located. You can return to the dashboard or go back to the previous page.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-50 px-4 py-3 text-sm font-bold text-teal-800 transition hover:bg-teal-100"
                    >
                      <Home size={16} />
                      Dashboard
                    </Link>

                    <button
                      type="button"
                      onClick={() => window.history.back()}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>
                  </div>
                </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
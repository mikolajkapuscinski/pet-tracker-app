import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, ScanSearch, ShieldCheck, Sparkles } from 'lucide-react'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1440px] items-center px-4 py-10 sm:px-6 xl:px-8">
      <section className="grid w-full gap-6 lg:grid-cols-[1.12fr_0.88fr]">
        <article className="relative overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.12)] sm:p-10">
          <div className="pointer-events-none absolute -left-24 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(13,148,136,0.24),transparent_64%)]" />
          <div className="pointer-events-none absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(79,70,229,0.12),transparent_64%)]" />

          <p className="island-kicker mb-3">PetGuard Pro</p>
          <h1 className="max-w-2xl text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
            Pet tracking that feels like a real operations console.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            The prototype was turned into a working application with real navigation, live safety
            zones, health analytics, family collaboration, device management, billing, and an
            OpenStreetMap layer.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition hover:bg-teal-700"
            >
              Open dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-teal-200 hover:text-slate-950"
            >
              What was rebuilt
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ['Real map', 'OpenStreetMap tiles with pet markers and geofences.', MapPinIcon],
              ['Fast routing', 'Dedicated views for every major prototype screen.', Sparkles],
              ['Shared safety', 'Family permissions, alerts, and collar controls.', ShieldCheck],
            ].map(([title, description, Icon]) => (
              <div key={title as string} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-teal-700 shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-3 font-bold text-slate-950">{title as string}</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">{description as string}</p>
              </div>
            ))}
          </div>
        </article>

        <aside className="space-y-4 rounded-[2.25rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-[0_24px_60px_rgba(15,23,42,0.16)] sm:p-10">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-teal-300">
            <ScanSearch className="h-4 w-4" />
            Demo entry point
          </div>
          <h2 className="text-3xl font-black tracking-tight">Everything from the prototype is covered.</h2>
          <p className="text-sm leading-7 text-white/70">
            Use this page as the launchpad, then move through dashboard, zones, health, family,
            devices, billing, and settings.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ['Dashboard', 'Live map + active pets'],
              ['Safety Zones', 'Geofence control center'],
              ['Health', 'Activity and sleep insights'],
              ['Devices', 'Collar fleet monitoring'],
            ].map(([title, description]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="font-bold text-white">{title}</p>
                <p className="mt-1 text-sm text-white/60">{description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-teal-400/20 bg-teal-400/10 p-4">
            <p className="text-sm font-semibold text-teal-200">Tip</p>
            <p className="mt-1 text-sm leading-6 text-teal-50/80">
              Start with the dashboard to verify the map integration and then open safety zones to
              test geofence overlays.
            </p>
          </div>
        </aside>
      </section>
    </main>
  )
}

function MapPinIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

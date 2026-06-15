import { createFileRoute, Link } from '@tanstack/react-router'
import { MapPinned, ShieldCheck, Sparkles, Users } from 'lucide-react'
import AppShell from '../components/AppShell'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <AppShell
      title="About PetGuard Pro"
      subtitle="A production-ready pet tracking workspace rebuilt from the prototype with real routing, shared state, and OpenStreetMap integration."
      badge="Platform overview"
    >
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ['Live tracking', 'Real map tiles, pet markers, and geofence circles.'],
          ['Family sharing', 'Caregivers can see the same alerts and notes.'],
          ['Health insight', 'Activity, sleep, and recovery metrics in one place.'],
          ['Billing and devices', 'Manage collars and subscriptions without leaving the app.'],
        ].map(([title, description]) => (
          <article key={title} className="card p-5">
            <h2 className="text-base font-bold text-slate-950">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <article className="card p-6">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700">
            <Sparkles className="h-4 w-4" />
            What was rebuilt
          </div>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <li>Prototype dashboard navigation turned into real TanStack routes.</li>
            <li>Static image placeholders replaced with an actual OpenStreetMap view.</li>
            <li>Health, billing, settings, family, and device management pages were made navigable.</li>
            <li>The app keeps the same product intent but now fits the repository stack cleanly.</li>
          </ul>
        </article>

        <aside className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-lg shadow-slate-950/15">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-teal-300">
            <MapPinned className="h-4 w-4" />
            OpenStreetMap
          </div>
          <p className="mt-2 text-2xl font-black tracking-tight">Interactive mapping layer</p>
          <p className="mt-2 text-sm leading-6 text-white/70">
            Pet markers, safe-zone circles, and popups are rendered over live OSM tiles instead of static mock imagery.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
            <ShieldCheck className="h-3.5 w-3.5" />
            SSR-safe client rendering
          </div>
        </aside>
      </section>

      <div className="mt-6">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition hover:bg-teal-700"
        >
          <Users className="h-4 w-4" />
          Open dashboard
        </Link>
      </div>
    </AppShell>
  )
}

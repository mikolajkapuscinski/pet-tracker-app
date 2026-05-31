import { createFileRoute } from '@tanstack/react-router'
import { Edit3, MapPinned, ToggleLeft } from 'lucide-react'
import AppShell from '../components/AppShell'
import MapView from '../components/MapView'
import { pets, safetyZones } from '../lib/petguard-data'

export const Route = createFileRoute('/safety-zones')({
  component: SafetyZonesPage,
})

function SafetyZonesPage() {
  return (
    <AppShell
      title="Safety zones"
      subtitle="Create geofences that notify the family when a pet leaves home, the park, or a trusted address."
      badge="Safety management"
    >
      <section className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                OpenStreetMap
              </p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
                Geofence coverage
              </h2>
            </div>
            <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
              3 active zones
            </span>
          </div>

          <MapView pets={pets} zones={safetyZones} mode="zones" />
        </div>

        <aside className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-black tracking-tight text-slate-950">Zones</h3>
            <button className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
              <MapPinned className="h-4 w-4" />
              Add zone
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {safetyZones.map((zone) => (
              <article
                key={zone.name}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: zone.color }}
                      />
                      <p className="font-bold text-slate-950">{zone.name}</p>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{zone.rule}</p>
                  </div>
                  <button className="text-slate-400 transition hover:text-slate-700">
                    <Edit3 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-white p-3">
                    <p className="text-xs text-slate-400">Radius</p>
                    <p className="mt-1 font-bold text-slate-950">{zone.radiusMeters} m</p>
                  </div>
                  <div className="rounded-2xl bg-white p-3">
                    <p className="text-xs text-slate-400">Status</p>
                    <p className="mt-1 font-bold text-teal-700">{zone.status}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 rounded-3xl border border-teal-100 bg-teal-50 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-teal-800">
              <ToggleLeft className="h-4 w-4" />
              Exit alerts enabled
            </div>
            <p className="mt-2 text-sm leading-6 text-teal-900/75">
              All family members get a push and SMS fallback whenever Luna or Milo leave an active zone.
            </p>
          </div>
        </aside>
      </section>
    </AppShell>
  )
}

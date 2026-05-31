import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight, MoonStar, Activity } from 'lucide-react'
import AppShell from '../components/AppShell'
import { activitySeries, healthSignals, pets, weekLabels } from '../lib/petguard-data'

export const Route = createFileRoute('/health-insights')({
  component: HealthInsightsPage,
})

function HealthInsightsPage() {
  return (
    <AppShell
      title="Health insights"
      subtitle="Review movement trends, recovery, and sleep quality for each pet across the week."
      badge="Max / Golden Retriever"
    >
      <section className="grid gap-4 sm:grid-cols-3">
        {healthSignals.map((signal) => (
          <article key={signal.label} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{signal.label}</p>
            <p className="mt-2 text-3xl font-black tracking-tight text-slate-950">{signal.value}</p>
            <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <ArrowUpRight className="h-3.5 w-3.5" />
              {signal.delta}
            </div>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
        <article className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                Activity distribution
              </p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
                Seven-day pattern
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
              <Activity className="h-4 w-4 text-teal-600" />
              Activity vs. rest
            </div>
          </div>

          <div className="mt-8 flex h-[320px] items-end gap-3">
            {activitySeries.map((value, index) => (
              <div key={weekLabels[index]} className="flex h-full flex-1 flex-col justify-end gap-2">
                <div className="flex-1 rounded-t-[1.5rem] bg-slate-100">
                  <div
                    className="h-full rounded-t-[1.5rem] bg-gradient-to-t from-teal-700 to-teal-400 shadow-[0_18px_36px_rgba(13,148,136,0.24)]"
                    style={{ height: `${value}%` }}
                  />
                </div>
                <p className="text-center text-xs font-semibold text-slate-400">{weekLabels[index]}</p>
              </div>
            ))}
          </div>
        </article>

        <aside className="space-y-4">
          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-lg shadow-slate-950/15">
            <div className="flex items-center gap-2 text-sm font-semibold text-teal-300">
              <MoonStar className="h-4 w-4" />
              Sleep quality
            </div>
            <p className="mt-2 text-4xl font-black tracking-tight">88/100</p>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Luna slept longer after the park visit, but the evening walk was still within the healthy range.
            </p>
            <div className="mt-4 h-2 rounded-full bg-white/10">
              <div className="h-2 w-[88%] rounded-full bg-teal-400" />
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-black tracking-tight text-slate-950">Selected pet</h3>
            <div className="mt-4 flex items-center gap-3 rounded-3xl bg-slate-50 p-4">
              <img
                src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(pets[0].avatarSeed)}`}
                alt={pets[0].name}
                className="h-12 w-12 rounded-full border border-slate-200 bg-white"
              />
              <div>
                <p className="font-bold text-slate-950">{pets[0].name}</p>
                <p className="text-sm text-slate-500">{pets[0].breed}</p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </AppShell>
  )
}

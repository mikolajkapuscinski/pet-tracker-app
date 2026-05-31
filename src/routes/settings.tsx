import { createFileRoute } from '@tanstack/react-router'
import { Bell, Contact, ShieldAlert, Smartphone } from 'lucide-react'
import AppShell from '../components/AppShell'
import { notificationPreferences } from '../lib/petguard-data'

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <AppShell
      title="Settings"
      subtitle="Tune notifications, privacy, and emergency preferences for your pet tracking workspace."
      badge="Preferences"
    >
      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">Notification preferences</h2>
          <div className="mt-5 space-y-3">
            {notificationPreferences.map((pref) => (
              <div key={pref.label} className="flex items-start justify-between gap-4 rounded-3xl bg-slate-50 p-4">
                <div>
                  <p className="font-bold text-slate-950">{pref.label}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{pref.description}</p>
                </div>
                <span
                  className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                    pref.enabled ? 'bg-teal-50 text-teal-700' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {pref.enabled ? 'On' : 'Off'}
                </span>
              </div>
            ))}
          </div>
        </article>

        <aside className="space-y-4">
          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-lg shadow-slate-950/15">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-teal-300">
              <ShieldAlert className="h-4 w-4" />
              Emergency fallback
            </div>
            <p className="mt-2 text-2xl font-black tracking-tight">SMS + push enabled</p>
            <p className="mt-2 text-sm leading-6 text-white/70">
              If the app cannot reach a caregiver, the emergency contact gets the last known location and time.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                <Smartphone className="h-5 w-5 text-teal-600" />
                Mobile push notifications
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                <Contact className="h-5 w-5 text-teal-600" />
                Emergency contact: Anna Kowalska
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                <Bell className="h-5 w-5 text-teal-600" />
                Daily digest at 8:00
              </div>
            </div>
          </div>
        </aside>
      </section>
    </AppShell>
  )
}

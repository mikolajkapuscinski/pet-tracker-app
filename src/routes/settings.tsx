import { useCallback, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Bell, Contact, ShieldAlert, Smartphone } from 'lucide-react'
import AppShell from '../components/AppShell'
import ActionButton from '../components/ActionButton'
import { notificationPreferences } from '../lib/petguard-data'
import { saveNotificationPreferences } from '../lib/services/settings'

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
})

function Toggle({ enabled, onToggle, label }: { enabled: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${
        enabled ? 'bg-teal-500' : 'bg-slate-200'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  )
}

function SettingsPage() {
  const [prefs, setPrefs] = useState(notificationPreferences)

  function toggle(index: number) {
    setPrefs((prev) =>
      prev.map((p, i) => (i === index ? { ...p, enabled: !p.enabled } : p))
    )
  }

  const onSave = useCallback(
    () => saveNotificationPreferences(prefs.map(({ label, enabled }) => ({ label, enabled }))),
    [prefs],
  )

  return (
    <AppShell
      title="Settings"
      subtitle="Tune notifications, privacy, and emergency preferences for your pet tracking workspace."
      badge="Preferences"
    >
      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <article className="card p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-black tracking-tight text-slate-950">Notification preferences</h2>
            <ActionButton
              fn={onSave}
              label="Save notification preferences"
              doneLabel="Saved!"
              className="rounded-full bg-teal-600 px-4 py-2 text-sm font-bold text-white hover:bg-teal-700"
            >
              Save
            </ActionButton>
          </div>
          <div className="mt-5 space-y-3">
            {prefs.map((pref, index) => (
              <div key={pref.label} className="flex items-center justify-between gap-4 rounded-3xl bg-slate-50 p-4">
                <div>
                  <p className="font-bold text-slate-950">{pref.label}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{pref.description}</p>
                </div>
                <Toggle
                  enabled={pref.enabled}
                  onToggle={() => toggle(index)}
                  label={`Toggle ${pref.label}`}
                />
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

          <div className="card p-6">
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

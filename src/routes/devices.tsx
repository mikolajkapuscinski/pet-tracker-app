import { createFileRoute } from '@tanstack/react-router'
import { BatteryFull, PlusCircle, Signal, Smartphone, ShieldCheck } from 'lucide-react'
import AppShell from '../components/AppShell'
import { devices } from '../lib/petguard-data'

export const Route = createFileRoute('/devices')({
  component: DevicesPage,
})

function DevicesPage() {
  return (
    <AppShell
      title="Device management"
      subtitle="Monitor collar state, battery health, and sync timing for every active device."
      badge="Collar administration"
    >
      <section className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            Fleet status
          </p>
          <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
            Smart collars online
          </h2>
        </div>

        <button className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition hover:bg-teal-700">
          <PlusCircle className="h-4 w-4" />
          Add new collar
        </button>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {devices.map((device) => (
          <article key={device.serial} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(device.name)}`}
                  alt={device.name}
                  className="h-14 w-14 rounded-full border border-slate-200 bg-slate-50"
                />
                <div>
                  <h3 className="text-xl font-black tracking-tight text-slate-950">{device.name}</h3>
                  <p className="text-xs font-mono uppercase tracking-[0.18em] text-slate-400">
                    {device.serial}
                  </p>
                </div>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${
                  device.status === 'Active'
                    ? 'bg-teal-50 text-teal-700'
                    : device.status === 'Charging'
                      ? 'bg-orange-50 text-orange-700'
                      : 'bg-slate-100 text-slate-600'
                }`}
              >
                {device.status}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <BatteryFull className="h-4 w-4 text-teal-600" />
                  Battery
                </div>
                <p className="mt-2 text-2xl font-black tracking-tight text-slate-950">{device.battery}%</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <Signal className="h-4 w-4 text-teal-600" />
                  Signal
                </div>
                <p className="mt-2 text-lg font-bold text-slate-950">{device.signal}</p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-2xl bg-teal-50 px-4 py-3 text-sm font-semibold text-teal-800">
              <span className="inline-flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Last sync
              </span>
              <span>{device.lastSync}</span>
            </div>

            <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800">
              <ShieldCheck className="h-4 w-4" />
              Find device
            </button>
          </article>
        ))}
      </section>
    </AppShell>
  )
}

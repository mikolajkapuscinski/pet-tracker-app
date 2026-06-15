import { useCallback } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight, BatteryCharging, MapPin, ShieldAlert, Sparkles } from 'lucide-react'
import AppShell from '../components/AppShell'
import ActionButton from '../components/ActionButton'
import MapView from '../components/MapView'
import { dashboardStats, pets, safetyZones } from '../lib/petguard-data'
import { findPet, soundCollar, enableLostMode } from '../lib/services/pets'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function PetCard({ pet, index }: { pet: typeof pets[number]; index: number }) {
  const onFind = useCallback(() => findPet(pet.name), [pet.name])
  const onSound = useCallback(() => soundCollar(pet.name), [pet.name])

  return (
    <article className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-3">
        <img
          src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(pet.avatarSeed)}`}
          alt={pet.name}
          className="h-12 w-12 rounded-full border border-slate-200 bg-white"
        />
        <div className="flex-1">
          <p className="font-bold text-slate-950">{pet.name}</p>
          <p className="text-xs text-slate-500">{pet.breed} • {pet.status}</p>
        </div>
        <div className="text-right text-xs text-slate-500">
          <div className="inline-flex items-center gap-1 font-semibold text-slate-700">
            <BatteryCharging className="h-4 w-4 text-teal-600" />
            {pet.battery}%
          </div>
          <p className="mt-1">{pet.signal}</p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{pet.lastSeen}</p>
      <div className="mt-4 flex gap-2">
        <ActionButton
          fn={onFind}
          label={`Find ${pet.name}`}
          doneLabel="Found!"
          className="flex-1 rounded-2xl bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700 hover:bg-teal-100"
        >
          Find
        </ActionButton>
        <ActionButton
          fn={onSound}
          label={`Sound ${pet.name}'s collar`}
          doneLabel="Sounding!"
          className="flex-1 rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
        >
          Sound
        </ActionButton>
      </div>
      {index === 0 ? (
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          <ShieldAlert className="h-3.5 w-3.5" />
          Safe inside zone
        </div>
      ) : (
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
          <ArrowUpRight className="h-3.5 w-3.5" />
          Charging at home
        </div>
      )}
    </article>
  )
}

function LostModeButton() {
  const onLostMode = useCallback(() => enableLostMode(pets.map((p) => p.name)), [])
  return (
    <ActionButton
      fn={onLostMode}
      label="Enable Lost Mode for all pets"
      doneLabel="Lost Mode active"
      className="mt-4 w-full rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-950 hover:bg-slate-100"
    >
      Enable Lost Mode
    </ActionButton>
  )
}

function DashboardPage() {
  return (
    <AppShell
      title="Security Monitor"
      subtitle="Track pets, zones, battery levels, and live events from one control center."
    >
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <article
            key={stat.label}
            className="card p-5 shadow-slate-950/5"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <p className="text-3xl font-black tracking-tight text-slate-950">{stat.value}</p>
              <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                <Sparkles className="h-3.5 w-3.5" />
                {stat.delta}
              </span>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="section-kicker">Live map</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
                Pets in motion right now
              </h2>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-500 shadow-sm md:flex">
              <MapPin className="h-4 w-4 text-teal-600" />
              Warsaw demo area
            </div>
          </div>
          <MapView pets={pets} zones={safetyZones} mode="dashboard" />
        </div>

        <aside className="space-y-4">
          <div className="card p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-black tracking-tight text-slate-950">Active pets</h3>
              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                2 monitoring
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {pets.map((pet, index) => (
                <PetCard key={pet.name} pet={pet} index={index} />
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-slate-950 to-slate-800 p-5 text-white shadow-lg shadow-slate-950/15">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/50">
              Quick actions
            </p>
            <h3 className="mt-2 text-xl font-black tracking-tight">Lost mode ready</h3>
            <p className="mt-2 text-sm leading-6 text-white/75">
              Lock collars, share emergency coordinates, and notify the whole family in one tap.
            </p>
            <LostModeButton />
          </div>
        </aside>
      </section>
    </AppShell>
  )
}

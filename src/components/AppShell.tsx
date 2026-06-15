import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import {
  BatteryCharging,
  Bell,
  BellRing,
  DatabaseZap,
  Dog,
  LayoutDashboard,
  MapPinned,
  ShieldCheck,
  Settings2,
  Users,
} from 'lucide-react'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/safety-zones', label: 'Safety Zones', icon: MapPinned },
  { to: '/health-insights', label: 'Health Insights', icon: DatabaseZap },
  { to: '/family-group', label: 'Family Group', icon: Users },
  { to: '/devices', label: 'Devices', icon: Dog },
  { to: '/billing', label: 'Billing', icon: BellRing },
  { to: '/settings', label: 'Settings', icon: Settings2 },
]

type AppShellProps = {
  title: string
  subtitle: string
  badge?: string
  children: ReactNode
}

function NavItem({
  to,
  label,
  icon: Icon,
}: {
  to: string
  label: string
  icon: typeof LayoutDashboard
}) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
      activeProps={{
        className:
          'group flex items-center gap-3 rounded-2xl bg-teal-50 px-4 py-3 text-sm font-semibold text-teal-800 ring-1 ring-teal-100',
      }}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  )
}

export default function AppShell({ title, subtitle, badge, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--sea-ink)]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[280px] flex-col border-r border-slate-200/80 bg-white/80 backdrop-blur-xl xl:flex">
        <div className="flex items-center gap-3 px-6 pb-6 pt-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-400 text-white shadow-lg shadow-teal-500/20">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-black tracking-tight text-slate-950">PetGuard Pro</p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Watchful peace
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-4">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>

        <div className="px-4 pb-6">
          <div className="rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50 to-cyan-50 p-4 shadow-sm">
            <p className="text-sm font-bold text-slate-950">4 pets covered</p>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              Real-time geofences, live tracking, family sharing, and battery monitoring in one place.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-teal-700">
              <BatteryCharging className="h-4 w-4" />
              2 collars charging, 2 active
            </div>
          </div>
        </div>
      </aside>

      <header className="sticky top-0 z-30 border-b border-white/60 bg-white/75 backdrop-blur-xl xl:ml-[280px]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 py-4 sm:px-6 xl:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                <span>{badge ?? 'Live monitoring'}</span>
                <span className="h-1 w-1 rounded-full bg-teal-500" />
                <span>OpenStreetMap connected</span>
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                  {title}
                </h1>
                <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
                  {subtitle}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm md:flex">
                <Bell className="h-4 w-4 text-slate-400" />
                <input
                  aria-label="Search pet tracker data"
                  placeholder="Search pets, zones, devices"
                  className="w-56 border-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 xl:hidden">
            {navItems.map((item) => {
              const Icon = item.icon

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-500 shadow-sm transition hover:border-teal-200 hover:text-slate-950"
                  activeProps={{
                    className:
                      'inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-800 shadow-sm',
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </header>

      <main className="xl:ml-[280px]">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 xl:px-8 xl:py-8">
          {children}
        </div>
      </main>
    </div>
  )
}

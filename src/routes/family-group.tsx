import { useCallback, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { MessageCircleHeart, ShieldCheck, UserMinus, UserPlus, Users } from 'lucide-react'
import AppShell from '../components/AppShell'
import ActionButton from '../components/ActionButton'
import { familyMembers } from '../lib/petguard-data'
import { inviteMember, removeMember } from '../lib/services/family'

export const Route = createFileRoute('/family-group')({
  component: FamilyGroupPage,
})

function MemberCard({ member }: { member: typeof familyMembers[number] }) {
  const onRemove = useCallback(() => removeMember(member.name), [member.name])

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-black tracking-tight text-slate-950">{member.name}</p>
          <p className="text-sm text-slate-500">{member.role}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500">
            {member.status}
          </span>
          <ActionButton
            fn={onRemove}
            label={`Remove ${member.name} from family group`}
            doneLabel="✓"
            className="rounded-xl p-1.5 text-slate-300 hover:bg-red-50 hover:text-red-500"
          >
            <UserMinus className="h-4 w-4" />
          </ActionButton>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {member.permissions.map((permission) => (
          <span
            key={permission}
            className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600"
          >
            {permission}
          </span>
        ))}
      </div>
    </div>
  )
}

function InviteForm() {
  const [email, setEmail] = useState('')
  const onInvite = useCallback(() => {
    if (!email.trim()) return Promise.resolve()
    return inviteMember(email.trim()).then(() => setEmail(''))
  }, [email])

  return (
    <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm font-bold text-slate-950">Invite a caregiver</p>
      <div className="mt-3 flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
          aria-label="Caregiver email address"
          className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
        />
        <ActionButton
          fn={onInvite}
          label="Send invite"
          doneLabel="Sent!"
          className="inline-flex items-center gap-2 rounded-2xl bg-teal-600 px-4 py-2 text-sm font-bold text-white hover:bg-teal-700"
        >
          <UserPlus className="h-4 w-4" />
          Invite
        </ActionButton>
      </div>
    </div>
  )
}

function FamilyGroupPage() {
  return (
    <AppShell
      title="Family group"
      subtitle="Share live tracking, permissions, and location history with the people who help care for your pets."
      badge="Collaboration"
    >
      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="card p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="section-kicker">Shared access</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
                Trusted caregivers
              </h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
              <Users className="h-3.5 w-3.5" />
              3 members
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {familyMembers.map((member) => (
              <MemberCard key={member.name} member={member} />
            ))}
          </div>

          <InviteForm />
        </article>

        <aside className="space-y-4">
          <div className="rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-teal-50 to-cyan-50 p-5 shadow-sm">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-teal-800">
              <ShieldCheck className="h-4 w-4" />
              Shared safety
            </div>
            <p className="mt-2 text-2xl font-black tracking-tight text-slate-950">Emergency contact ready</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              The group receives a location snapshot and the last known route when a collar enters lost mode.
            </p>
          </div>

          <div className="card p-5">
            <h3 className="text-lg font-black tracking-tight text-slate-950">Recent activity</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-950">Alicja changed Home zone radius</p>
                <p className="mt-1">2 hours ago</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-950">Tomek shared park walk route</p>
                <p className="mt-1">Yesterday at 18:20</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-lg shadow-slate-950/15">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-teal-300">
              <MessageCircleHeart className="h-4 w-4" />
              Family notes
            </div>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Add pickup notes, medication reminders, and vet visit alerts so everyone sees the same context.
            </p>
          </div>
        </aside>
      </section>
    </AppShell>
  )
}

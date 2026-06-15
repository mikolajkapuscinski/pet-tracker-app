import { useCallback } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CreditCard, Download, ReceiptText, Sparkles } from 'lucide-react'
import AppShell from '../components/AppShell'
import ActionButton from '../components/ActionButton'
import { billingHistory } from '../lib/petguard-data'
import { managePlan, updateCard, downloadInvoice } from '../lib/services/billing'

export const Route = createFileRoute('/billing')({
  component: BillingPage,
})

function InvoiceRow({ entry }: { entry: typeof billingHistory[number] }) {
  const onDownload = useCallback(() => downloadInvoice(entry.date), [entry.date])

  return (
    <div className="grid gap-4 px-6 py-4 sm:grid-cols-[1fr_auto_auto_auto] sm:items-center">
      <div>
        <p className="font-semibold text-slate-950">{entry.date}</p>
        <p className="text-sm text-slate-500">{entry.note}</p>
      </div>
      <p className="text-sm font-bold text-slate-950">{entry.amount}</p>
      <span className="inline-flex w-fit rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-800">
        {entry.status}
      </span>
      <ActionButton
        fn={onDownload}
        label={`Download invoice for ${entry.date}`}
        doneLabel="✓"
        className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-700"
      >
        <Download className="h-3.5 w-3.5" />
        PDF
      </ActionButton>
    </div>
  )
}

function BillingPage() {
  const onManagePlan = useCallback(() => managePlan(), [])
  const onUpdateCard = useCallback(() => updateCard(), [])

  return (
    <AppShell
      title="Billing management"
      subtitle="Track plan status, payment methods, and invoices for the PetGuard Premium Guard subscription."
      badge="Subscription"
    >
      <section className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
        <article className="card p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
                Active subscription
              </span>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Premium Guard</h2>
              <p className="mt-1 text-slate-500">$14.99 per month, billed monthly</p>
            </div>
            <ActionButton
              fn={onManagePlan}
              label="Manage plan"
              doneLabel="Opening portal…"
              className="rounded-full bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200"
            >
              Manage plan
            </ActionButton>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between text-sm font-medium text-slate-500">
              <span>Billing cycle progress</span>
              <span className="text-teal-700">65% elapsed</span>
            </div>
            <div className="mt-3 h-3 rounded-full bg-slate-100">
              <div className="h-3 w-[65%] rounded-full bg-gradient-to-r from-teal-500 to-cyan-400" />
            </div>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Sparkles className="h-4 w-4 text-teal-600" />
              Included features
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
              {['Live tracking', 'Lost mode', 'Unlimited geofences', 'Family sharing'].map((feature) => (
                <span key={feature} className="rounded-full bg-white px-3 py-1 shadow-sm">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </article>

        <aside className="card p-6">
          <h3 className="text-xl font-black tracking-tight text-slate-950">Payment method</h3>
          <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                <CreditCard className="h-5 w-5 text-slate-700" />
              </div>
              <div>
                <p className="font-bold text-slate-950">•••• 4242</p>
                <p className="text-sm text-slate-500">Exp 04/28</p>
              </div>
            </div>
          </div>

          <ActionButton
            fn={onUpdateCard}
            label="Update card"
            doneLabel="Redirecting…"
            className="mt-4 w-full rounded-2xl border-2 border-dashed border-slate-200 px-4 py-3 text-sm font-semibold text-slate-500 hover:bg-slate-50"
          >
            Update card
          </ActionButton>
        </aside>
      </section>

      <section className="mt-6 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <h3 className="text-xl font-black tracking-tight text-slate-950">Billing history</h3>
          <ReceiptText className="h-5 w-5 text-slate-400" />
        </div>
        <div className="divide-y divide-slate-100">
          {billingHistory.map((entry) => (
            <InvoiceRow key={entry.date + entry.amount} entry={entry} />
          ))}
        </div>
      </section>
    </AppShell>
  )
}

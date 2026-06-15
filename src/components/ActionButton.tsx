import { useAction } from '../lib/hooks/useAction'

type Props = {
  fn: () => Promise<void>
  label: string
  doneLabel?: string
  className?: string
  children?: React.ReactNode
}

export default function ActionButton({ fn, label, doneLabel, className = '', children }: Props) {
  const { state, run } = useAction(fn)

  const content = () => {
    if (state === 'loading') return <Spinner />
    if (state === 'done') return doneLabel ?? '✓'
    if (state === 'error') return 'Error — retry'
    return children ?? label
  }

  return (
    <button
      type="button"
      onClick={run}
      disabled={state === 'loading'}
      aria-label={label}
      className={`transition disabled:cursor-not-allowed disabled:opacity-60 ${
        state === 'done' ? 'bg-emerald-500 text-white' : ''
      } ${state === 'error' ? 'bg-red-50 text-red-600' : ''} ${className}`}
    >
      {content()}
    </button>
  )
}

function Spinner() {
  return (
    <span className="inline-flex items-center gap-2">
      <svg
        className="h-4 w-4 animate-spin"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
      Working…
    </span>
  )
}

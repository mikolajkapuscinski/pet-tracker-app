import { useState, useCallback } from 'react'

type ActionState = 'idle' | 'loading' | 'done' | 'error'

export function useAction(fn: () => Promise<void>) {
  const [state, setState] = useState<ActionState>('idle')

  const run = useCallback(async () => {
    if (state === 'loading') return
    setState('loading')
    try {
      await fn()
      setState('done')
      setTimeout(() => setState('idle'), 2000)
    } catch {
      setState('error')
      setTimeout(() => setState('idle'), 3000)
    }
  }, [fn, state])

  return { state, run }
}

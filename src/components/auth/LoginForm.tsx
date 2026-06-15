import { useState } from 'react'
import { loginWithEmail } from '../../lib/auth'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)

    try {
      await loginWithEmail(email, password)
    } catch (err) {
      setError('Nie udało się zalogować.')
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        type="email"
        placeholder="Email"
      />

      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        type="password"
        placeholder="Hasło"
      />

      <button type="submit">Zaloguj</button>

      {error ? <p>{error}</p> : null}
    </form>
  )
}
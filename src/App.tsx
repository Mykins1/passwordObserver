import { useState } from 'react'
import { PasswordInput } from './components/PasswordInput'
import { Dashboard } from './components/Dashboard'
import { usePasswordAnalysis } from './hooks/usePasswordAnalysis'

export default function App() {
  const [password, setPassword] = useState('')
  const analysis = usePasswordAnalysis(password)

  return (
    <div className="min-h-screen bg-base text-text" style={{ padding: '56px 20px 80px' }}>
      <div className="mx-auto" style={{ maxWidth: '640px' }}>
        {/* <div className="mb-3.5 inline-flex items-center gap-2" style={{ fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--safe)', fontWeight: 600 }}>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-safe" style={{ boxShadow: '0 0 0 3px rgba(56, 189, 248, 0.15)' }}></span>
          Client-side only · nothing sent as plaintext
        </div> */}
        <h1 className="mb-2 text-2xl font-bold" style={{ letterSpacing: '-0.01em' }}>
          Password Strength &amp; Breach Checker
        </h1>
        <p className="mb-8 text-text-dim" style={{ fontSize: '14.5px', lineHeight: 1.55, maxWidth: '480px' }}>
          Real-time analysis using pattern-based entropy estimation and k-Anonymity breach lookup. Your password never leaves this device in full, in either pipeline.
        </p>

        <PasswordInput value={password} onChange={setPassword} />

        <div className="mt-6">
          <Dashboard entropy={analysis.entropy} breach={analysis.breach} />
        </div>
      </div>
    </div>
  )
}
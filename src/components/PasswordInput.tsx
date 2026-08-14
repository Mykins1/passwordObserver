import { useState } from 'react'

interface PasswordInputProps {
  value: string
  onChange: (value: string) => void
}

export function PasswordInput({ value, onChange }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="mb-7" style={{ position: 'relative' }}>
      <label
        htmlFor="password"
        style={{
          display: 'block',
          fontSize: '12.5px',
          fontWeight: 600,
          color: 'var(--text-dim)',
          marginBottom: '8px',
          letterSpacing: '.01em',
        }}
      >
        Enter a password to analyse
      </label>
      <input
        id="password"
        type={showPassword ? 'text' : 'password'}
        autoComplete="off"
        spellCheck={false}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\s/g, ''))}
        placeholder="Type a password..."
        style={{
          width: '100%',
          background: 'var(--panel)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          padding: '15px 46px 15px 16px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '16px',
          color: 'var(--text)',
          outline: 'none',
          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--safe)'
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(56, 189, 248, 0.14)'
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      />
      <button
        onClick={() => setShowPassword(!showPassword)}
        style={{
          position: 'absolute',
          right: '12px',
          top: '38px',
          background: 'none',
          border: 'none',
          color: 'var(--text-faint)',
          cursor: 'pointer',
          padding: '6px',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={(e) => {
          const target = e.currentTarget as HTMLButtonElement
          target.style.color = 'var(--text-dim)'
          target.style.background = 'var(--panel-2)'
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget as HTMLButtonElement
          target.style.color = 'var(--text-faint)'
          target.style.background = 'none'
        }}
        aria-label="Toggle password visibility"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {showPassword ? (
            <>
              <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.6 21.6 0 0 1 5.06-6.06M9.9 4.24A10.4 10.4 0 0 1 12 4c7 0 11 8 11 8a21.6 21.6 0 0 1-3.22 4.44M14.12 14.12a3 3 0 1 1-4.24-4.24" />
              <path d="M1 1l22 22" />
            </>
          ) : (
            <>
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
              <circle cx="12" cy="12" r="3" />
            </>
          )}
        </svg>
      </button>
      <div
        style={{
          fontSize: '12px',
          color: 'var(--text-faint)',
          marginTop: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        Nothing you type here is transmitted as plain text.
      </div>
    </div>
  )
}
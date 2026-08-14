import type { BreachResult } from '../lib/types'

const ICONS = {
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--strong)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  alert: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--breach)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 9v4M12 17h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L14.7 3.86a2 2 0 0 0-3.4 0Z" />
    </svg>
  ),
  spinner: (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--safe)" strokeWidth="2.5" strokeLinecap="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  dash: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-faint)" strokeWidth="2.5" strokeLinecap="round">
      <path d="M5 12h14" />
    </svg>
  ),
}

interface BreachPanelProps {
  breach: BreachResult
}

export function BreachPanel({ breach }: BreachPanelProps) {
  const { status, count } = breach

  let icon = ICONS.dash
  let message = 'Start typing to check against known breaches.'

  if (status === 'idle') {
    icon = ICONS.dash
    message = 'Start typing to check against known breaches.'
  } else if (status === 'checking') {
    icon = ICONS.spinner
    message = 'Checking against known breaches...'
  } else if (status === 'safe') {
    icon = ICONS.check
    message = 'Not found in any known breach.'
  } else if (status === 'breached') {
    icon = ICONS.alert
    message = `Found in ${count.toLocaleString()} known breach${count === 1 ? '' : 'es'}. Avoid using this password.`
  } else if (status === 'error') {
    icon = ICONS.dash
    message = 'Could not reach the breach database.'
  }

  return (
    <div style={{
      background: 'var(--panel)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '18px 18px 20px',
      minHeight: '170px',
    }}>
      <div style={{ marginBottom: '14px' }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '.1em',
          color: 'var(--text-faint)',
        }}>Breach check</div>
      </div>

      {status === 'idle' ? (
        <div style={{
          color: 'var(--text-dim)',
          fontSize: '13.5px',
          padding: '30px 0',
          textAlign: 'center',
        }}>
          {message}
        </div>
      ) : (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '6px',
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {icon}
          </div>
          <div
            style={{
              fontSize: '13.5px',
              color: status === 'safe' ? 'var(--strong)' : status === 'breached' ? 'var(--breach)' : 'var(--text-dim)',
              lineHeight: 1.5,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {message}
          </div>
        </div>
      )}

      
    </div>
  )
}
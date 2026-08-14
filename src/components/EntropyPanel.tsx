import type { EntropyResult } from '../lib/types'

const SCORE_LABELS = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong']
const SCORE_COLORS = ['var(--weak)', 'var(--weak)', 'var(--fair)', 'var(--good)', 'var(--strong)']

interface EntropyPanelProps {
  entropy: EntropyResult | null
}

export function EntropyPanel({ entropy }: EntropyPanelProps) {
  if (!entropy) {
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
          }}>Strength</div>
        </div>
        <div style={{
          color: 'var(--text-dim)',
          fontSize: '13.5px',
          padding: '30px 0',
          textAlign: 'center',
        }}>Start typing to see an analysis.</div>
      </div>
    )
  }

  const { score, guesses, crackTimeDisplay } = entropy

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
        }}>Strength</div>
      </div>

      <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              height: '6px',
              flex: 1,
              borderRadius: '99px',
              background: i <= score ? SCORE_COLORS[score] : 'var(--border)',
              transition: 'background 0.25s ease',
            }}
          />
        ))}
      </div>

      <div style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '17px',
        fontWeight: 600,
        marginBottom: '10px',
        color: SCORE_COLORS[score],
      }}>
        {SCORE_LABELS[score]}
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '12.5px',
        color: 'var(--text-dim)',
        marginBottom: '4px',
      }}>
        <span>Estimated guesses:</span>
        <span style={{ color: 'var(--text)', fontFamily: 'JetBrains Mono, monospace' }}>
          {guesses.toLocaleString()}
        </span>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '12.5px',
        color: 'var(--text-dim)',
        marginBottom: '12px',
      }}>
        <span>Crack time (online, throttled):</span>
        <span style={{ color: 'var(--text)', fontFamily: 'JetBrains Mono, monospace' }}>
          {crackTimeDisplay}
        </span>
      </div>

    </div>
  )
}
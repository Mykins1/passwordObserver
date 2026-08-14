import type { PasswordAnalysis } from '../lib/types'
import { EntropyPanel } from './EntropyPanel'
import { BreachPanel } from './BreachPanel'

export function Dashboard({ entropy, breach }: PasswordAnalysis) {
  return (
    <>
      <style>{`
        @media (min-width: 640px) {
          .dashboard-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
      <div
        className="dashboard-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '14px',
        }}
      >
        <EntropyPanel entropy={entropy} />
        <BreachPanel breach={breach} />
      </div>
    </>
  )
}
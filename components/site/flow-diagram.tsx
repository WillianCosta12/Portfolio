import s from './site.module.css'

/**
 * The flow of a case study, step by step, drawn in the site's own language: a grafite panel, the steps as nodes
 * on a teal rail, the flow's file name on top. It stands in for screenshots, which can't show a client's screens.
 * Static on purpose: it is read, not watched.
 */
export function FlowDiagram({
  file,
  status,
  steps,
  label,
  compact = false,
}: {
  file: string
  status?: string
  steps: readonly string[]
  label: string
  compact?: boolean
}) {
  return (
    <figure className={`${s.diagram} ${compact ? s.diagramCompact : ''}`} aria-label={label}>
      <figcaption className={s.diagramHead}>
        <span className={s.termMark} aria-hidden="true" />
        <span>{file}</span>
        {status && <span className={`${s.panelLive} ${s.diagramStatus}`}>{status}</span>}
      </figcaption>
      <ol className={s.diagramSteps}>
        {steps.map((step, i) => (
          <li key={step} className={s.diagramStep}>
            <span className={s.diagramIdx} aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className={s.diagramText}>{step}</span>
          </li>
        ))}
      </ol>
    </figure>
  )
}

import { cn } from '@/lib/utils'

/**
 * Símbolo wcosta.dev: um bloco arredondado com um canto reto
 * ("precisão dentro da fluidez" — guia de identidade, 01 Logo).
 */
export function BrandSymbol({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('block', className)}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {/* raio 6 em três cantos, canto superior direito reto */}
      <path d="M6 0H24V18A6 6 0 0 1 18 24H6A6 6 0 0 1 0 18V6A6 6 0 0 1 6 0Z" fill="currentColor" />
    </svg>
  )
}

/** Logo completo: símbolo + "wcosta" + ".dev" (o sufixo sempre em teal). */
export function Logo({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  const onDark = tone === 'dark'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 font-display text-[20px] font-bold leading-none tracking-[-0.02em]',
        className,
      )}
    >
      {/* 24px: the brand guide's minimum size on screens */}
      <BrandSymbol className={cn('h-6 w-6', onDark ? 'text-teal-claro' : 'text-tinta')} />
      <span className={onDark ? 'text-g-tinta' : 'text-tinta'}>
        wcosta<span className={onDark ? 'text-teal-claro' : 'text-teal'}>.dev</span>
      </span>
    </span>
  )
}

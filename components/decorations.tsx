import { cn } from '@/lib/utils'

// A simple petal / leaf shape used as scattered decoration
export function Petal({
  className,
  color = 'var(--pink)',
  rotate = 0,
}: {
  className?: string
  color?: string
  rotate?: number
}) {
  return (
    <svg
      viewBox="0 0 24 32"
      className={cn('pointer-events-none select-none', className)}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <path
        d="M12 0C4 8 0 18 4 26c3 6 13 6 16 0C24 18 20 8 12 0Z"
        fill={color}
      />
    </svg>
  )
}

export function Sparkle({
  className,
  color = 'var(--sunny)',
}: {
  className?: string
  color?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('pointer-events-none select-none', className)}
      aria-hidden="true"
    >
      <path
        d="M12 0c1 6 4 9 12 12-8 3-11 6-12 12-1-6-4-9-12-12C8 9 11 6 12 0Z"
        fill={color}
      />
    </svg>
  )
}

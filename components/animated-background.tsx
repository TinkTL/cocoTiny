'use client'

import { Petal, Sparkle } from '@/components/decorations'

const leaves = [
  ['left-[5%] top-[18%]', 'var(--pink)', 28, 'animate-floaty'],
  ['right-[6%] top-[38%]', 'var(--teal)', 35, 'animate-floaty-slow'],
  ['left-[4%] top-[62%]', 'var(--purple)', 35, 'animate-floaty-slow'],
  ['right-[7%] top-[82%]', 'var(--coral)', -42, 'animate-floaty'],
] as const

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[#fffefe]" />
      <div
        className="absolute inset-0 opacity-85"
        style={{
          backgroundImage:
            'linear-gradient(#cfe3f2 1px, transparent 1px), linear-gradient(90deg, #cfe3f2 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {leaves.map(([position, color, rotate, animation]) => (
        <Petal
          key={position}
          className={`absolute h-7 w-6 opacity-60 ${position} ${animation}`}
          color={color}
          rotate={rotate}
        />
      ))}
      <Sparkle className="animate-twinkle absolute left-[14%] top-[19%] h-5 w-5 opacity-60" color="var(--pink)" />
      <Sparkle className="animate-twinkle absolute right-[13%] top-[37%] h-4 w-4 opacity-50 [animation-delay:1.5s]" color="var(--purple)" />
      <Sparkle className="animate-twinkle absolute left-[9%] top-[67%] h-4 w-4 opacity-50 [animation-delay:2.5s]" color="var(--teal)" />
    </div>
  )
}

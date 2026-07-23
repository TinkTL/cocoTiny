'use client'

import { Languages } from 'lucide-react'
import { useLanguage } from './language-provider'

export function LanguageSwitcher({ inverted = false }: { inverted?: boolean }) {
  const { copy, toggleLanguage } = useLanguage()

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={copy.language.aria}
      className={`inline-flex h-10 items-center gap-2 rounded-full border px-3.5 text-xs font-extrabold tracking-wide shadow-sm transition hover:-translate-y-0.5 sm:h-11 sm:px-4 sm:text-sm ${
        inverted
          ? 'border-white/25 bg-[#2a1816]/45 text-white backdrop-blur-md hover:bg-[#2a1816]/70'
          : 'border-ink/15 bg-white/75 text-ink backdrop-blur-md hover:border-purple/35 hover:text-purple'
      }`}
    >
      <Languages className="h-4 w-4" aria-hidden="true" />
      {copy.language.button}
    </button>
  )
}

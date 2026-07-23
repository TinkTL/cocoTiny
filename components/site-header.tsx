import Image from 'next/image'
import { LanguageSwitcher } from './language-switcher'
import { SocialRow } from './social-icons'

export function SiteHeader() {
  return (
    <header className="relative z-20 mx-auto flex min-h-32 max-w-[1480px] items-center justify-between px-4 py-8 sm:px-6 lg:min-h-44 lg:px-10 lg:py-10">
      <Image
        src="/cocotiny-logo.png"
        alt="CocoTiny"
        width={220}
        height={72}
        priority
        className="h-14 w-auto sm:h-16 lg:h-24"
      />

      <div className="flex items-center gap-4 lg:gap-7">
        <SocialRow className="hidden gap-5 sm:flex lg:gap-8" />
        <LanguageSwitcher />
      </div>
    </header>
  )
}

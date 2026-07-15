import Image from 'next/image'
import { Mail, Sparkles } from 'lucide-react'
import { Petal } from './decorations'
import { SocialRow } from './social-icons'

const links = ['Browse', 'Categories', 'About', 'Contact', 'Support']

const footerLeaves = [
  ['left-[25%] top-12', 'var(--pink)', 42],
  ['left-[29%] bottom-7', 'var(--coral)', -35],
  ['left-[36%] top-8', 'var(--sky)', -38],
  ['left-[42%] bottom-5', 'var(--teal)', 55],
  ['right-[37%] top-10', 'var(--pink)', 25],
  ['right-[29%] bottom-7', 'var(--purple)', -48],
  ['right-[20%] top-8', 'var(--coral)', 34],
] as const

export function SiteFooter() {
  return (
    <footer className="relative mt-12 bg-cream pb-4 pt-5 text-ink shadow-[0_-8px_30px_rgba(43,27,68,0.06)]">
      {/* Dense overlapping circles create an irregular cloud-like upper edge. */}
      <div className="pointer-events-none absolute inset-x-0 -top-12 h-16 overflow-hidden drop-shadow-[0_-3px_4px_rgba(43,27,68,0.08)]" aria-hidden="true">
        <div className="absolute -bottom-8 -left-8 h-20 w-56 rounded-[50%] bg-cream" />
        <div className="absolute -bottom-6 left-[10%] h-16 w-48 rounded-[50%] bg-cream" />
        <div className="absolute -bottom-9 left-[21%] h-24 w-72 rounded-[50%] bg-cream" />
        <div className="absolute -bottom-5 left-[38%] h-14 w-44 rounded-[50%] bg-cream" />
        <div className="absolute -bottom-8 left-[49%] h-20 w-64 rounded-[50%] bg-cream" />
        <div className="absolute -bottom-5 left-[65%] h-16 w-52 rounded-[50%] bg-cream" />
        <div className="absolute -bottom-9 right-[4%] h-24 w-72 rounded-[50%] bg-cream" />
        <div className="absolute -bottom-6 -right-12 h-16 w-52 rounded-[50%] bg-cream" />
      </div>

      {footerLeaves.map(([position, color, rotate]) => (
        <Petal
          key={position}
          className={`absolute hidden h-5 w-4 opacity-80 md:block ${position}`}
          color={color}
          rotate={rotate}
        />
      ))}
      <Sparkles className="absolute right-[25%] bottom-7 hidden h-5 w-5 text-teal lg:block" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[1480px] gap-4 px-4 sm:px-6 lg:grid-cols-[1.15fr_1.7fr_1.05fr] lg:items-center lg:gap-8 lg:px-10">
        <div className="relative flex min-h-20 items-center justify-center lg:justify-start">
          <div className="absolute -bottom-2 -left-8 h-20 w-32 overflow-visible mix-blend-multiply lg:-left-3 lg:h-24 lg:w-40" aria-hidden="true">
            <Image
              src="/footer-rainbow.png"
              alt=""
              fill
              sizes="160px"
              className="scale-[1.55] object-cover object-[48%_43%] opacity-55"
            />
          </div>
          <div className="relative z-10 ml-14 flex flex-col items-start gap-0.5 lg:ml-20">
            <Image
              src="/cocotiny-logo.png"
              alt="CocoTiny"
              width={260}
              height={84}
              className="h-10 w-auto lg:h-11"
            />
            <p className="pl-2 text-xs font-semibold text-ink/55">Tiny worlds, cozy vibes.</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-y-2 text-sm font-bold lg:text-base">
              {links.map((link, index) => (
                <li key={link} className="flex items-center">
                  {index > 0 && <span className="mx-4 text-ink/25" aria-hidden="true">|</span>}
                  <a href="#" className="transition-colors hover:text-pink">{link}</a>
                </li>
              ))}
            </ul>
          </nav>
          <SocialRow className="gap-7" iconClassName="h-6 w-6 lg:h-7 lg:w-7" />
        </div>

        <div className="flex flex-col items-center gap-2 text-center text-sm text-ink/55 lg:items-end lg:text-right">
          <a href="mailto:w211299486@gmail.com" className="inline-flex items-center gap-2 font-semibold transition-colors hover:text-pink">
            <Mail className="h-5 w-5 text-purple" aria-hidden="true" />
            w211299486@gmail.com
          </a>
          <p>© 2026 cocoTiny. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

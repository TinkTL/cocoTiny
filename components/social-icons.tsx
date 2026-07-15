import { cn } from '@/lib/utils'

/**
 * Social icons are rendered from the user-provided SVG files via CSS mask,
 * so all three share one unified color (currentColor of the parent link).
 */
const socials = [
  { name: 'Bilibili', src: '/icons/bilibili.svg', sizeClassName: 'h-6 w-6 lg:h-8 lg:w-8' },
  { name: '爱发电', src: '/icons/aifadian.svg', sizeClassName: 'h-7 w-7 lg:h-9 lg:w-9' },
  { name: '小红书', src: '/icons/xiaohongshu.svg', sizeClassName: 'h-7 w-7 lg:h-9 lg:w-9' },
]

function MaskIcon({ src, className }: { src: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('inline-block bg-current', className)}
      style={{
        maskImage: `url(${src})`,
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        maskSize: 'contain',
        WebkitMaskImage: `url(${src})`,
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        WebkitMaskSize: 'contain',
      }}
    />
  )
}

export function SocialRow({ className, iconClassName }: { className?: string; iconClassName?: string }) {
  return (
    <ul className={cn('flex items-center gap-4', className)}>
      {socials.map(({ name, src, sizeClassName }) => (
        <li key={name}>
          <a href="#" aria-label={name} className="block text-ink/80 transition-colors hover:text-pink">
            <MaskIcon src={src} className={cn(sizeClassName, iconClassName)} />
          </a>
        </li>
      ))}
    </ul>
  )
}

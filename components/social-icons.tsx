import Image from 'next/image'
import { cn } from '@/lib/utils'

const socials = [
  { name: 'Bilibili', src: '/icons/bilibili.svg', sizeClassName: 'h-6 w-6 lg:h-8 lg:w-8' },
  { name: '小红书', src: '/icons/xiaohongshu.svg', sizeClassName: 'h-7 w-7 lg:h-9 lg:w-9' },
]

export function SocialRow({ className, iconClassName }: { className?: string; iconClassName?: string }) {
  return (
    <ul className={cn('flex items-center gap-4', className)}>
      {socials.map(({ name, src, sizeClassName }) => (
        <li key={name}>
          <a href="#" aria-label={name} className="block transition-transform hover:scale-105">
            <Image
              src={src}
              alt=""
              width={36}
              height={36}
              className={cn('object-contain', sizeClassName, iconClassName)}
            />
          </a>
        </li>
      ))}
    </ul>
  )
}

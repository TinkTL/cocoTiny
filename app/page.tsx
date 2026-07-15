import { SiteHeader } from '@/components/site-header'
import { HeroSection } from '@/components/hero-section'
import { FeaturedGrid } from '@/components/featured-grid'
import { MoreGames } from '@/components/more-games'
import { SiteFooter } from '@/components/site-footer'
import { AnimatedBackground } from '@/components/animated-background'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-cream">
      <AnimatedBackground />

      <div className="relative z-10">
        <SiteHeader />
        <HeroSection />
        <FeaturedGrid />
        <MoreGames />
        <SiteFooter />
      </div>
    </main>
  )
}

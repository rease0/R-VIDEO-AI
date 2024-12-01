import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Features } from '@/components/features'
import { PricingCards } from '@/components/pricing-cards'
import { SampleVideos } from '@/components/sample-videos'

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-20 text-center bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">AI-Powered Text-to-Video Generator</h1>
            <p className="text-xl mb-8 text-muted-foreground">Transform your ideas into captivating videos with ease</p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
        
        <SampleVideos />
        
        <Features />
        
        <section id="pricing" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
            <PricingCards />
            <div className="mt-12 text-center">
              <p className="text-xl mb-4">Need more flexibility? Try our pay-as-you-go option!</p>
              <Button asChild size="lg">
                <Link href="/payment">Start Creating Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted py-8 text-center">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground">&copy; 2023 R Video AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}


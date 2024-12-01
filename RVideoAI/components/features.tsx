import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Wand2, Zap, Palette, Video, Lock, Cloud } from 'lucide-react'

const features = [
  {
    title: 'AI-Powered Generation',
    description: 'Transform text into high-quality videos using advanced AI technology.',
    icon: Wand2,
  },
  {
    title: 'Lightning Fast',
    description: 'Generate videos in minutes, not hours. Save time and boost productivity.',
    icon: Zap,
  },
  {
    title: 'Customizable Styles',
    description: 'Choose from a variety of styles and customize your videos to fit your brand.',
    icon: Palette,
  },
  {
    title: 'Multi-Format Support',
    description: 'Export your videos in various formats suitable for different platforms.',
    icon: Video,
  },
  {
    title: 'Secure and Private',
    description: 'Your content is encrypted and protected. We prioritize your privacy and data security.',
    icon: Lock,
  },
  {
    title: 'Cloud Storage',
    description: 'Access your generated videos anytime, anywhere with our cloud storage solution.',
    icon: Cloud,
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card">
              <CardHeader>
                <feature.icon className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


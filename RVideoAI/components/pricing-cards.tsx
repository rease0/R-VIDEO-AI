import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const plans = [
  {
    title: 'Free',
    price: '$0',
    features: [
      '10 minutes of video per day',
      'Basic AI generation features',
      'With ads',
      'Watermarked videos',
      '720p video quality',
      'Email support',
    ],
    buttonText: 'Get Started',
  },
  {
    title: 'Plus',
    price: '$30',
    features: [
      '30 minutes of video per day',
      'Advanced AI generation features',
      'Ad-free experience',
      'No watermarks',
      '1080p video quality',
      'Priority email support',
    ],
    buttonText: 'Upgrade to Plus',
    popular: true,
  },
  {
    title: 'Premium',
    price: '$50',
    features: [
      '60 minutes of video per day',
      'Premium AI generation features',
      'Ad-free experience',
      'No watermarks',
      '4K video quality',
      'Priority phone & email support',
    ],
    buttonText: 'Go Premium',
  },
  {
    title: 'Pay-as-you-go',
    price: '$1',
    features: [
      'Pay only for what you use',
      '2 minutes of video per $1',
      'All AI generation features',
      'No daily limits',
      'No watermarks',
      '1080p video quality',
    ],
    buttonText: 'Start Creating',
    perUnit: '/ 2 minutes',
  },
]

export function PricingCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {plans.map((plan, index) => (
        <Card key={index} className={`flex flex-col ${plan.popular ? 'border-primary' : ''}`}>
          <CardHeader>
            <CardTitle className="text-2xl">{plan.title}</CardTitle>
            {plan.popular && <span className="text-sm font-semibold text-primary">Most Popular</span>}
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="text-4xl font-bold mb-4">
              {plan.price}
              <span className="text-xl font-normal">
                {plan.perUnit ? plan.perUnit : '/month'}
              </span>
            </div>
            <ul className="space-y-2">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">{plan.buttonText}</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}


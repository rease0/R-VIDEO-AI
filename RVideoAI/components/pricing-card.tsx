import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface PricingCardProps {
  title: string
  price: string
  features: string[]
  buttonText: string
  popular?: boolean
}

export function PricingCard({ title, price, features, buttonText, popular = false }: PricingCardProps) {
  return (
    <Card className={`w-full max-w-sm ${popular ? 'border-primary' : ''}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        {popular && <span className="text-sm font-semibold text-primary">Most Popular</span>}
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold mb-4">{price}</div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">{buttonText}</Button>
      </CardFooter>
    </Card>
  )
}


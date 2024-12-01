import Link from 'next/link'
import { Video } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Video className="h-6 w-6" />
          <span className="text-xl font-bold">R Video AI</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/#features" className="hover:underline">Features</Link></li>
            <li><Link href="/#pricing" className="hover:underline">Pricing</Link></li>
            <li><Button asChild variant="ghost"><Link href="/login">Log in</Link></Button></li>
            <li><Button asChild><Link href="/signup">Sign up</Link></Button></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}


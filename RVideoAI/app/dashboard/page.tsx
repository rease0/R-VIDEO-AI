'use client'

import { useAuth } from '@/lib/auth'
import { Header } from '@/components/header'
import { VideoPreview } from '@/components/video-preview'
import { getSubscriptionLimits } from '@/lib/subscription'

export default function Dashboard() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>Please log in to view your dashboard.</div>
  }

  const limits = getSubscriptionLimits(user.subscriptionTier)

  // Mock data for generated videos
  const generatedVideos = [
    { id: '1', title: 'My First AI Video', url: 'https://example.com/video1.mp4' },
    { id: '2', title: 'Product Showcase', url: 'https://example.com/video2.mp4' },
    { id: '3', title: 'Travel Vlog', url: 'https://example.com/video3.mp4' },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Generated Videos</h2>
            <div className="space-y-4">
              {generatedVideos.map((video) => (
                <div key={video.id} className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">{video.title}</h3>
                  <VideoPreview videoUrl={video.url} />
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Usage Statistics</h2>
            <div className="border rounded-lg p-4">
              <p>Subscription Tier: {user.subscriptionTier}</p>
              <p>Daily Limit: {limits.dailyMinutes} minutes</p>
              <p>Monthly Limit: {limits.monthlyMinutes} minutes</p>
              {/* Add more usage statistics here */}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}


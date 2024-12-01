'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { checkUsageLimit, getSubscriptionLimits, SubscriptionLimits } from '@/lib/subscription'

interface TextToVideoGeneratorProps {
  subscriptionTier: 'free' | 'plus' | 'premium'
  onVideoGenerated: (videoUrl: string) => void
  customization: any
}

export function TextToVideoGenerator({ subscriptionTier, onVideoGenerated, customization }: TextToVideoGeneratorProps) {
  const [text, setText] = useState('')
  const [generating, setGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [usedMinutes, setUsedMinutes] = useState(0)
  const [limits, setLimits] = useState<SubscriptionLimits | null>(null)

  useEffect(() => {
    async function fetchLimits() {
      const userLimits = await getSubscriptionLimits({ subscriptionTier } as any) // This is a temporary type assertion
      setLimits(userLimits)
    }
    fetchLimits()
  }, [subscriptionTier])

  const handleGenerate = async () => {
    if (!checkUsageLimit(subscriptionTier, usedMinutes)) {
      alert('You have reached your daily usage limit. Please upgrade your plan to continue.')
      return
    }

    setGenerating(true)
    setProgress(0)

    try {
      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, customization }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate video')
      }

      const data = await response.json()
      onVideoGenerated(data.videoUrl)

      // Update used minutes (assuming 1 minute per generation for this example)
      setUsedMinutes(prev => prev + 1)
    } catch (error) {
      console.error('Error generating video:', error)
      alert('Failed to generate video. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Enter your video script here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        className="w-full"
        aria-label="Video script input"
      />
      <Button onClick={handleGenerate} disabled={generating || !text}>
        {generating ? 'Generating...' : 'Generate Video'}
      </Button>
      {generating && (
        <Progress value={progress} className="w-full" aria-label="Video generation progress" />
      )}
      <p className="text-sm text-gray-600">
        Daily usage: {usedMinutes}/{limits?.dailyMinutes || 0} minutes
      </p>
    </div>
  )
}


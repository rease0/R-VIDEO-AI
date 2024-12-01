'use client'

import { useState, useEffect } from 'react'

interface VideoPreviewProps {
  videoUrl: string
}

export function VideoPreview({ videoUrl }: VideoPreviewProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (videoUrl) {
      setIsLoading(false)
    }
  }, [videoUrl])

  return (
    <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <p>Loading video preview...</p>
        </div>
      ) : (
        <video
          src={videoUrl}
          controls
          className="w-full h-full object-cover"
          aria-label="Generated video preview"
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  )
}


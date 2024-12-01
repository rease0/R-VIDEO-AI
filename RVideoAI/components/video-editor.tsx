'use client'

import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

interface VideoEditorProps {
  videoUrl: string
  onSave: (editedVideo: Blob) => void
}

export function VideoEditor({ videoUrl, onSave }: VideoEditorProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [text, setText] = useState('')
  const [textPosition, setTextPosition] = useState({ x: 10, y: 10 })

  const applyFilters = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    if (text) {
      ctx.font = '24px Arial'
      ctx.fillStyle = 'white'
      ctx.fillText(text, textPosition.x, textPosition.y)
    }
  }

  const handleSave = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.toBlob((blob) => {
      if (blob) {
        onSave(blob)
      }
    }, 'video/mp4')
  }

  return (
    <div className="space-y-4">
      <div className="aspect-video">
        <video ref={videoRef} src={videoUrl} controls className="w-full h-full" />
      </div>
      <canvas ref={canvasRef} className="hidden" />
      <div className="space-y-2">
        <Label htmlFor="brightness">Brightness</Label>
        <Slider
          id="brightness"
          min={0}
          max={200}
          step={1}
          value={[brightness]}
          onValueChange={(value) => setBrightness(value[0])}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contrast">Contrast</Label>
        <Slider
          id="contrast"
          min={0}
          max={200}
          step={1}
          value={[contrast]}
          onValueChange={(value) => setContrast(value[0])}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="text">Text Overlay</Label>
        <Input
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text overlay"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="textX">Text X Position</Label>
          <Input
            id="textX"
            type="number"
            value={textPosition.x}
            onChange={(e) => setTextPosition({ ...textPosition, x: parseInt(e.target.value) })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="textY">Text Y Position</Label>
          <Input
            id="textY"
            type="number"
            value={textPosition.y}
            onChange={(e) => setTextPosition({ ...textPosition, y: parseInt(e.target.value) })}
          />
        </div>
      </div>
      <Button onClick={applyFilters}>Apply Filters</Button>
      <Button onClick={handleSave}>Save Edited Video</Button>
    </div>
  )
}


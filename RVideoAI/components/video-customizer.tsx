'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

export function VideoCustomizer({ onCustomizationChange }: { onCustomizationChange: (customization: any) => void }) {
  const [overlay, setOverlay] = useState('')
  const [effect, setEffect] = useState('')
  const [music, setMusic] = useState('')
  const [transition, setTransition] = useState('')
  const [volume, setVolume] = useState(50)

  const handleCustomizationChange = () => {
    onCustomizationChange({
      overlay,
      effect,
      music,
      transition,
      volume,
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="overlay">Text Overlay</Label>
        <Input
          id="overlay"
          placeholder="Enter text overlay"
          value={overlay}
          onChange={(e) => setOverlay(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="effect">Video Effect</Label>
        <Select value={effect} onValueChange={setEffect}>
          <SelectTrigger id="effect">
            <SelectValue placeholder="Select an effect" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="fade">Fade</SelectItem>
            <SelectItem value="zoom">Zoom</SelectItem>
            <SelectItem value="blur">Blur</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="music">Background Music</Label>
        <Select value={music} onValueChange={setMusic}>
          <SelectTrigger id="music">
            <SelectValue placeholder="Select background music" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="upbeat">Upbeat</SelectItem>
            <SelectItem value="relaxing">Relaxing</SelectItem>
            <SelectItem value="dramatic">Dramatic</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="transition">Transition</Label>
        <Select value={transition} onValueChange={setTransition}>
          <SelectTrigger id="transition">
            <SelectValue placeholder="Select a transition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="fade">Fade</SelectItem>
            <SelectItem value="slide">Slide</SelectItem>
            <SelectItem value="wipe">Wipe</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="volume">Music Volume</Label>
        <Slider
          id="volume"
          min={0}
          max={100}
          step={1}
          value={[volume]}
          onValueChange={(value) => setVolume(value[0])}
        />
      </div>
      <Button onClick={handleCustomizationChange}>Apply Customization</Button>
    </div>
  )
}


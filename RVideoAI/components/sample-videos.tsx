import { Video } from 'lucide-react'

const sampleVideos = [
  {
    title: "Product Showcase",
    description: "AI-generated video showcasing a new smartphone",
    url: "https://example.com/videos/product-showcase.mp4"
  },
  {
    title: "Travel Destination",
    description: "AI-created video highlighting a tropical beach resort",
    url: "https://example.com/videos/travel-destination.mp4"
  },
  {
    title: "Recipe Tutorial",
    description: "AI-powered cooking tutorial for a gourmet pasta dish",
    url: "https://example.com/videos/recipe-tutorial.mp4"
  }
]

export function SampleVideos() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">AI-Generated Video Samples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleVideos.map((video, index) => (
            <div key={index} className="bg-card rounded-lg overflow-hidden shadow-lg">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <Video className="h-16 w-16 text-muted-foreground" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                <p className="text-muted-foreground mb-4">{video.description}</p>
                <video 
                  className="w-full rounded" 
                  controls 
                  preload="none"
                  poster="/placeholder.svg?height=200&width=300"
                >
                  <source src={video.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


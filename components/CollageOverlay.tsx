'use client'

import Image from 'next/image'

interface CollageOverlayProps {
  position: 'top-left' | 'bottom-right' | 'top-right' | 'bottom-left'
  opacity?: number
  hidden?: boolean
  imagePath?: string
}

export function CollageOverlay({
  position,
  opacity = 0.12,
  hidden = false,
  imagePath = '/placeholder-overlay.jpg',
}: CollageOverlayProps) {
  if (hidden) return null

  const positionClasses = {
    'top-left': 'top-0 left-0 -rotate-2',
    'top-right': 'top-0 right-0 rotate-1',
    'bottom-left': 'bottom-0 left-0 rotate-1',
    'bottom-right': 'bottom-0 right-0 -rotate-2',
  }

  const mobileHidden = hidden ? 'hidden' : 'sm:block hidden'

  return (
    <div
      className={`absolute ${positionClasses[position]} ${mobileHidden} pointer-events-none select-none w-40 h-40 md:w-56 md:h-56 z-0`}
      style={{ opacity }}
    >
      <Image
        src={imagePath || "/placeholder.svg"}
        alt="Decorative overlay"
        fill
        className="object-cover rounded-xl"
        style={{ mixBlendMode: 'multiply' }}
        priority={false}
      />
    </div>
  )
}

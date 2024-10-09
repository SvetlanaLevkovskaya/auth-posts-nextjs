'use client'

import { FC } from 'react'
import Image from 'next/image'

const FallbackImage: FC = () => (
  <div className="bg-gray-3 flex items-center justify-center rounded-lg w-48 h-48 mr-4">
    <span className="text-gray-300">No Image</span>
  </div>
)

type ImageWithFallbackProps = {
  src: string | null
  alt: string
  width: number
  height: number
  className?: string
}

export const ImageWithFallback: FC<ImageWithFallbackProps> = ({ src, alt, width, height }) => {
  return (
    <div className="min-w-48 min-h-48 mb-4 tb:mr-4">
      {!src && <FallbackImage />}
      {src && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-48 h-48 rounded-lg object-cover"
          unoptimized
        />
      )}
    </div>
  )
}

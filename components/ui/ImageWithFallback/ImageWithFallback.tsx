'use client'

import { FC, useState } from 'react'

import Image from 'next/image'


const FallbackImage: FC = () => (
  <div className="bg-gray-3 flex items-center justify-center rounded-lg w-48 h-48 mr-4">
    <span className="text-gray-300">No Image</span>
  </div>
)

type Props = {
  src: string | null
  alt: string
  width: number
  height: number
  className?: string
}

export const ImageWithFallback: FC<Props> = ({ src, alt, width, height, className }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const onLoad = () => setIsLoaded(true)
  const onError = () => setHasError(true)

  const shouldShowFallback = !src || hasError || !isLoaded

  return (
    <div className="relative mb-4 mr-4 min-w-48 min-h-48">
      {shouldShowFallback && <FallbackImage />}

      {src && !hasError && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`absolute inset-0 w-48 h-48 rounded-lg object-cover ${className}`}
          unoptimized
          onLoad={onLoad}
          onError={onError}
        />
      )}
    </div>
  )
}

import type { FC } from 'react'

interface SpinnerProps {
  size?: number
  center?: boolean
  className?: string
  currentColor?: boolean
}

export const Spinner: FC<SpinnerProps> = ({ size = 50, currentColor }) => {
  return (
    <div className="bg-dark flex-center-center h-full w-full overflow-hidden">
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        style={{ shapeRendering: 'crispEdges' }}
        className="animate-spin "
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke={currentColor ? 'currentColor' : '#caccd1'}
          strokeWidth="8"
          r="35"
          strokeDasharray="164.93361431346415 56.97787143782138"
          transform="matrix(1,0,0,1,0,0)"
        />
      </svg>
    </div>
  )
}

'use client'
import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface PixelCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'paper' | 'border' | 'flat'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

export const PixelCard = forwardRef<HTMLDivElement, PixelCardProps>(
  ({ className, variant = 'paper', padding = 'md', hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          variant === 'paper' && 'bg-cream border-4 border-black shadow-[8px_8px_0px_0px_#1B1B1B] paper-texture',
          variant === 'border' && 'bg-cream border-2 border-black shadow-[4px_4px_0px_0px_#1B1B1B] paper-texture',
          variant === 'flat' && 'bg-cream border-4 border-black',
          padding === 'none' && '',
          padding === 'sm' && 'p-3',
          padding === 'md' && 'p-4 md:p-6',
          padding === 'lg' && 'p-6 md:p-8',
          hover && 'transition-all duration-50 hover:shadow-[10px_10px_0px_0px_#1B1B1B] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0px_0px_#1B1B1B]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
PixelCard.displayName = 'PixelCard'
'use client'
import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
}

export const PixelButton = forwardRef<HTMLButtonElement, PixelButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'font-pixel uppercase tracking-wider border-4 border-black transition-all duration-50',
          'active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#1B1B1B]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variant === 'primary' && 'bg-cream text-black hover:bg-white shadow-[4px_4px_0px_0px_#1B1B1B] hover:shadow-[6px_6px_0px_0px_#1B1B1B] hover:-translate-x-0.5 hover:-translate-y-0.5',
          variant === 'secondary' && 'bg-black text-cream hover:bg-black/90 shadow-[4px_4px_0px_0px_#1B1B1B] hover:shadow-[6px_6px_0px_0px_#1B1B1B]',
          variant === 'danger' && 'bg-primary-red text-cream hover:bg-dark-red shadow-[4px_4px_0px_0px_#1B1B1B] hover:shadow-[6px_6px_0px_0px_#1B1B1B]',
          size === 'sm' && 'px-3 py-1.5 text-[9px]',
          size === 'md' && 'px-5 py-2.5 text-xs',
          size === 'lg' && 'px-6 md:px-8 py-3 md:py-4 text-xs md:text-sm',
          size === 'xl' && 'px-8 md:px-10 py-4 md:py-5 text-sm md:text-base',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="animate-blink">_</span>
            <span>LOADING...</span>
          </span>
        ) : children}
      </button>
    )
  }
)
PixelButton.displayName = 'PixelButton'
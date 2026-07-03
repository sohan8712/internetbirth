'use client'
import { forwardRef, InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface PixelInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const PixelInput = forwardRef<HTMLInputElement, PixelInputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block font-pixel text-[10px] md:text-xs uppercase tracking-wider text-black mb-1 md:mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-3 md:px-4 py-2 md:py-3 font-mono text-sm md:text-base bg-cream border-4 border-black text-black placeholder-black/40',
            'shadow-[inset_4px_4px_0px_0px_#1B1B1B] outline-none',
            'focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-cream',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-gold ring-2 ring-gold ring-offset-2 ring-offset-cream',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        />
        {error && <p className="mt-1 md:mt-2 font-pixel text-[9px] md:text-[10px] text-primary-red">{error}</p>}
        {helperText && !error && <p className="mt-1 md:mt-2 font-mono text-[10px] md:text-xs text-black/50">{helperText}</p>}
      </div>
    )
  }
)
PixelInput.displayName = 'PixelInput'
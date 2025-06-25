import { WarningIcon } from '@phosphor-icons/react/dist/ssr'
import { type InputHTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: boolean
  errorMessage?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error = false, errorMessage, className = '', ...props }, ref) => (
    <div className="flex flex-col gap-2 group">
      {label && (
        <label
          className={
            `text-xss text-gray-500 uppercase group-focus-within:text-blue-500` +
            (error ? ' text-danger-500 group-focus-within:text-danger-500' : '')
          }
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={twMerge(
          'border rounded px-4 py-2 focus:outline-none focus:ring-2  placeholder:text-gray-400 text-sm text-gray-600 transition-colors placeholder:text-sm',
          error
            ? 'border-danger-500 focus:ring-danger-500'
            : 'border-gray-300 focus:ring-blue-500',
          className
        )}
        {...props}
      />
      {error && errorMessage && (
        <div className="flex items-center gap-2">
          <WarningIcon className="text-danger-500 size-4" />
          <span className="text-gray-500 text-xs">{errorMessage}</span>
        </div>
      )}
    </div>
  )
)

Input.displayName = 'Input'

export default Input

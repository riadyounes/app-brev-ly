import { WarningIcon } from '@phosphor-icons/react/dist/ssr'
import { forwardRef, type InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export interface InputWithPrefixProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: boolean
  errorMessage?: string
  prefix?: string
}

const InputWithPrefix = forwardRef<HTMLInputElement, InputWithPrefixProps>(
  (
    {
      label,
      error = false,
      errorMessage,
      prefix = '',
      className = '',
      ...props
    },
    ref
  ) => (
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

      <div className="relative w-full">
        {prefix && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 text-sm pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          className={twMerge(
            'border rounded py-2 focus:outline-none focus:ring-2 placeholder:text-gray-400 text-sm text-gray-600 transition-colors placeholder:text-sm w-full',
            prefix ? 'pl-[64px] pr-4' : 'px-4',
            error
              ? 'border-danger-500 focus:ring-danger-500'
              : 'border-gray-300 focus:ring-blue-500',
            className
          )}
          {...props}
        />
      </div>

      {error && errorMessage && (
        <div className="flex items-center gap-2">
          <WarningIcon className="text-danger-500 size-4" />
          <span className="text-gray-500 text-xs">{errorMessage}</span>
        </div>
      )}
    </div>
  )
)

InputWithPrefix.displayName = 'InputWithPrefix'

export default InputWithPrefix

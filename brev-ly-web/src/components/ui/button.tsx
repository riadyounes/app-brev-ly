import { tv, type VariantProps } from 'tailwind-variants'
import { type ButtonHTMLAttributes } from 'react'

const button = tv({
  base: [
    'rounded-lg px-5 py-2 text-sm font-semibold outline-none shadow-sm',
    'focus-visible:ring-1 transition-colors',
  ],
  variants: {
    variant: {
      primary:
        'bg-blue-500 text-white hover:bg-blue-700 disabled:bg-blue-500/50',
      secondary:
        'bg-gray-200 text-gray-500 border border-gray-200 hover:border-blue-500 disabled:bg-gray-200/50 rounded-sm px-2',
      icon: 'bg-gray-200 text-gray-600 border border-gray-200 hover:border-blue-500 p-2 rounded-sm',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export function Button({ variant, className, ...props }: ButtonProps) {
  return <button {...props} className={button({ variant, className })} />
}

import { tv, type VariantProps } from 'tailwind-variants'
import { type ButtonHTMLAttributes } from 'react'

const button = tv({
  base: [
    'rounded-lg px-5 py-2 text-sm font-semibold outline-none shadow-sm',
    'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500',
  ],
  variants: {
    variant: {
      primary:
        'bg-blue-500 text-white hover:bg-blue-700 disabled:bg-blue-500/50',
      secondary:
        'border border-zinc-300 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800',
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

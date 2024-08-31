import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const getServerErrorStatus = (error?: object) => {
  if (!!error && 'status' in error && typeof error.status === 'number') {
    return error.status
  }
}

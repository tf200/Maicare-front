import React, { ReactNode } from 'react'

type BadgeProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
}

export default function Badge({ children, variant = "primary" }: BadgeProps) {
  let className = "inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium"

  switch (variant) {
    case 'primary':
      className += " bg-blue-200 text-blue-600"
      break
    case 'secondary':
      className += " bg-gray-200 text-gray-600"
      break
    case 'outline':
      className += " border border-gray-500 text-gray-500"
      break
    case 'success':
      className += " bg-green-200 text-green-600"
      break
    case 'danger':
      className += " bg-red-200 text-red-600"
      break
    case 'warning':
      className += " bg-yellow-200 text-yellow-600"
      break
    case 'info':
      className += " bg-teal-200 text-teal-600"
      break
    case 'light':
      className += " bg-gray-100 text-gray-600"
      break
    case 'dark':
      className += " bg-gray-800 text-gray-200"
      break
    default:
      className += " bg-blue-200 text-blue-600"
  }

  return <span className={className}>{children}</span>
}

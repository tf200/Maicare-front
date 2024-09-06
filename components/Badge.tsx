import React, { ReactNode } from 'react'

type BadgeProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
}

export default function Badge({ children, variant = "primary" }: BadgeProps) {
  let className = "inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium"

  switch (variant) {
    case 'primary':
      className += " bg-blue-600 text-white"
      break
    case 'secondary':
      className += " bg-gray-600 text-white"
      break
    case 'outline':
      className += " border border-gray-500 text-gray-500"
      break
    case 'success':
      className += " bg-green-500 text-white"
      break
    case 'danger':
      className += " bg-red-500 text-white"
      break
    case 'warning':
      className += " bg-yellow-500 text-white"
      break
    case 'info':
      className += " bg-teal-500 text-white"
      break
    case 'light':
      className += " bg-gray-100 text-gray-700"
      break
    case 'dark':
      className += " bg-black text-white"
      break
    default:
      className += " bg-blue-600 text-white"
  }

  return <span className={className}>{children}</span>
}

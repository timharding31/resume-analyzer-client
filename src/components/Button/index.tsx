import React from 'react'
import classNames from 'classnames'
import styles from './styles.css'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  className,
  ...buttonProps
}) => {
  const getVariantClassNames = (): string[] => {
    switch (variant) {
      case 'primary':
        return ['text-white', 'bg-indigo-700', 'hover:bg-indigo-800', 'focus:ring-indigo-300']

      case 'secondary':
        return [
          'text-gray-900',
          'bg-white',
          'border',
          'border-gray-200',
          'hover:bg-gray-100',
          'hover:text-indigo-700',
          'focus:z-10',
          'focus:ring-gray-200'
          // 'dark:focus:ring-gray-700',
          // 'dark:bg-gray-800',
          // 'dark:text-gray-400',
          // 'dark:border-gray-600',
          // 'dark:hover:text-white',
          // 'dark:hover:bg-gray-700'
        ]
    }
  }

  const getSizeClassNames = (): string[] => {
    switch (size) {
      case 'small':
        return ['px-3', 'py-2', 'text-xs']

      case 'medium':
        return ['px-3', 'py-2', 'text-sm']

      case 'large':
        return ['px-5', 'py-2.5', 'text-sm']
    }
  }

  const getBaseClassNames = (): string[] => {
    return ['font-medium', 'rounded-lg', 'text-center', 'focus:ring-1', 'focus:outline-none']
  }

  return (
    <button
      className={classNames(
        ...getBaseClassNames(),
        ...getVariantClassNames(),
        ...getSizeClassNames(),
        className
      )}
      {...buttonProps}
    />
  )
}

import React from 'react'
import { Label } from '../Label'
import classNames from 'classnames'

interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'required'> {
  label: string
  prefix?: string
  required?: boolean
}

export const TextField: React.FC<TextFieldProps> = ({
  className,
  label,
  prefix,
  required,
  ...inputProps
}) => {
  const inputId = inputProps.id ?? label.toLowerCase()
  const hasPrefix = !!prefix

  const getInputClassNames = () => {
    const inputClasses = [
      'block',
      'w-full',
      'rounded-md',
      'border-0',
      'py-1.5',
      'px-3',
      'text-gray-900',
      'ring-1',
      'ring-inset',
      'ring-gray-300',
      'placeholder:text-gray-400',
      'focus:ring-2',
      'focus:ring-inset',
      'focus:ring-indigo-600',
      'sm:text-sm',
      'sm:leading-6'
    ]
    if (hasPrefix) {
      inputClasses.push('pl-7')
    }
    return inputClasses
  }

  return (
    <div className={className}>
      <Label htmlFor={inputId} required={required}>
        {label}
      </Label>
      <div className="relative mt-2 rounded-md shadow-sm">
        {!!prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="sm:text-sm">{prefix}</span>
          </div>
        )}
        <input
          id={inputId}
          type="text"
          className={classNames(getInputClassNames())}
          {...inputProps}
        />
      </div>
    </div>
  )
}

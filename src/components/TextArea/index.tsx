import classNames from 'classnames'
import React from 'react'
import { Label } from '../Label'
import styles from './styles.module.css'

interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'required'> {
  label: string
  required?: boolean
  charLimit?: number
}

export const TextArea: React.FC<TextAreaProps> = ({
  className,
  label,
  required,
  charLimit,
  ...inputProps
}) => {
  const inputId = inputProps.id ?? label.toLowerCase()

  const remainingChars =
    (charLimit ?? Number.MAX_SAFE_INTEGER) - (inputProps.value?.toString().length ?? 0)

  return (
    <div className={className}>
      <Label htmlFor={inputId} required={required}>
        {label}
      </Label>
      <div className="mt-2 rounded-md shadow-sm">
        <textarea
          id={inputId}
          {...inputProps}
          rows={4}
          className="resize-none block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <div
        className={classNames(
          'block text-sm font-normal leading-6 text-gray-600 text-right',
          styles.helpText
        )}
      >
        {charLimit != null && remainingChars < 100 && <>{remainingChars} characters remaining</>}
      </div>
    </div>
  )
}

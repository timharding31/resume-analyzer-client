import React from 'react'
import { DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline'
import styles from './styles.css'

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  onRemove: () => void
  required?: boolean
}

export const FileInput: React.FC<FileInputProps> = ({
  label,
  className,
  value,
  required,
  onRemove,
  ...inputProps
}) => {
  const inputId = inputProps.id ?? label

  return (
    <div className={className}>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium leading-6 text-gray-900 text-left"
      >
        {label}
        {!!required && <span className="text-red-600 font-normal ml-0.5">*</span>}
        {value == null && <div>Browse</div>}
      </label>
      {value != null && (
        <div className="flex items-stretch justify-between">
          <div className="flex items-center justify-center p-2 flex-none">
            <DocumentIcon className="w-6 h-6" />
          </div>
          <div className="flex-grow py-2">{value}</div>
          <div
            className="flex items-center justify-center p-2 flex-none cursor-pointer"
            onClick={onRemove}
          >
            <XMarkIcon className="w-6 h-6" />
          </div>
        </div>
      )}
      <input className="hidden" id={inputId} {...inputProps} type="file" />
    </div>
  )
}

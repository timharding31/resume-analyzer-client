import React from 'react'
import classNames from 'classnames'
import { useDropzone } from 'react-dropzone'
import { Button } from '../Button'
import { DocumentIcon, TrashIcon } from '@heroicons/react/24/outline'

interface FileUploadProps {
  file?: File
  onUpload: (acceptedFile: File) => void
  onRemove: () => void
  label: string
  required?: boolean
  className?: string
}

export const FileUpload: React.FC<FileUploadProps> = ({
  file,
  onUpload,
  onRemove,
  label,
  required,
  className
}) => {
  const { getRootProps, getInputProps, isDragAccept, isDragReject, isDragActive } = useDropzone({
    onDrop: files => files.forEach(onUpload),
    accept: { 'application/pdf': [] },
    multiple: false
  })

  return (
    <div className={className} {...getRootProps()}>
      <label
        className="block text-sm font-medium leading-6 text-gray-900 text-left"
        onClick={e => e.stopPropagation()}
      >
        {label}
        {!!required && <span className="text-red-600 font-normal ml-0.5">*</span>}
      </label>
      <input {...getInputProps()} />
      <div
        className={classNames(
          'flex',
          'items-stretch',
          'justify-between',
          'rounded-md',
          'mt-2',
          'py-4',
          'px-2',
          'ring-2',
          'ring-inset',
          {
            'bg-gray-100': isDragActive,
            'bg-gray-50': !isDragActive,
            'ring-green-600': isDragAccept,
            'ring-red-600': isDragReject,
            'ring-gray-50': !isDragAccept && !isDragReject
          }
        )}
      >
        <div
          className="flex items-center justify-center p-2 flex-none"
          onClick={e => e.stopPropagation()}
        >
          <DocumentIcon className="w-6 h-6 text-gray-900" />
        </div>

        <div className="flex-grow font-normal text-indigo-600">
          {file != null ? (
            <div className="py-2 leading-6" onClick={e => e.stopPropagation()}>
              {file.name}
            </div>
          ) : (
            <div className="flex items-center">
              <span className="py-2 leading-6">Drop your file here, or&nbsp;</span>
              <Button variant="secondary" size="small" type="button">
                Browse files
              </Button>
            </div>
          )}
        </div>

        {file != null && (
          <button
            className="flex items-center justify-center p-2 flex-none cursor-pointer"
            onClick={e => {
              e.stopPropagation()
              onRemove()
            }}
          >
            <TrashIcon className="w-4 h-4 text-red-800" />
          </button>
        )}
      </div>
    </div>
  )
}

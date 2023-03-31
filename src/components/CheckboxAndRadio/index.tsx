import React from 'react'
import classNames from 'classnames'

interface CheckboxOrRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const CheckboxOrRadio: React.FC<CheckboxOrRadioProps> = ({
  label,
  className,
  ...checkboxProps
}) => {
  const inputId = checkboxProps.id ?? label

  const getInputClassNames = () => {
    const inputClasses = [
      'w-4',
      'h-4',
      'text-indigo-600',
      'bg-gray-100',
      'border-gray-300',
      'focus:ring-2',
      'focus:ring-indigo-500'
    ]
    if (checkboxProps.type === 'checkbox') {
      inputClasses.push('rounded')
    }
    return inputClasses
  }

  return (
    <div className={classNames('flex', 'items-center', className)}>
      <input id={inputId} className={classNames(getInputClassNames())} {...checkboxProps} />
      <label htmlFor={inputId} className="ml-2 text-sm font-medium text-gray-900">
        {label}
      </label>
    </div>
  )
}

export const Checkbox: React.FC<Omit<CheckboxOrRadioProps, 'type'>> = props => {
  return <CheckboxOrRadio type="checkbox" {...props} />
}

export const Radio: React.FC<Omit<CheckboxOrRadioProps, 'type'>> = props => {
  return <CheckboxOrRadio type="radio" {...props} />
}

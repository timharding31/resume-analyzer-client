import React from 'react'
import styles from './styles.css'

type LabelAttributes = React.HTMLAttributes<HTMLDivElement> &
  React.LabelHTMLAttributes<HTMLLabelElement>

interface LabelProps extends LabelAttributes {
  required?: boolean
}

export const Label: React.FC<LabelProps> = ({ children, required, ...labelAttributes }) => {
  const className = 'block text-sm font-medium leading-6 text-gray-900 text-left'
  const asterisk = <>{required && <span className="text-red-600 font-normal ml-0.5">*</span>}</>

  if (labelAttributes.htmlFor) {
    return (
      <label {...labelAttributes} className={className}>
        {children}
        {asterisk}
      </label>
    )
  }

  return (
    <div {...labelAttributes} className={className}>
      {children}
      {asterisk}
    </div>
  )
}

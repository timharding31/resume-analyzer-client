import React, { useState } from 'react'
import styles from './styles.css'

interface ResumeFormFields {
  name: string
  cv: File | string
  jobPostingUrl?: string
  details?: string
}

const isFieldRequired = (field: keyof ResumeFormFields): boolean => {
  switch (field) {
    case 'name':
    case 'cv':
      return true
  }

  return false
}

interface ResumeFormProps {}

export const ResumeForm: React.FC<ResumeFormProps> = () => {
  const [fields, setFields] = useState<Partial<ResumeFormFields>>({})

  const handleField = (
    field: keyof ResumeFormFields,
    value: ResumeFormFields[keyof ResumeFormFields]
  ) => {
    setFields(prev => ({ ...prev, [field]: value }))
  }

  const canSubmit = fields.name != null && fields.cv != null

  return null
}

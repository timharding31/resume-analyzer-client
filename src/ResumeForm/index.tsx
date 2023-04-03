import React, { useState } from 'react'
import { TextField, FileUpload, Button } from '../components'
import styles from './styles.css'

interface ResumeFormFields {
  name: string
  cv: File | string
  jobPostingUrl?: string
  details?: string
}

interface ResumeFormProps {}

export const ResumeForm: React.FC<ResumeFormProps> = () => {
  const [fields, setFields] = useState<Partial<ResumeFormFields>>({})
  const [error, setError] = useState<string>()
  const [response, setResponse] = useState<JSON>()

  const handleField = (
    field: keyof ResumeFormFields,
    value: ResumeFormFields[keyof ResumeFormFields]
  ) => {
    setFields(prev => ({ ...prev, [field]: value }))
  }

  const canSubmit = fields.name != null && fields.cv != null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) {
      setError('Missing required fields')
      response != null && setResponse(undefined)
    }
    const qs = new URLSearchParams({ name: fields.name! }).toString()
    const url = '/api/new?' + qs
    const body = new FormData()
    body.append('file', fields.cv!)
    const apiResponse = await fetch(url, { method: 'POST', body }).then(res => res.json())
    setResponse(apiResponse)
    setFields({})
  }

  return (
    <form onSubmit={handleSubmit} className="mb-2 flex flex-col items-stretch gap-4">
      <TextField
        label="Name"
        name="name"
        value={fields.name ?? ''}
        onChange={e => handleField('name', e.target.value)}
        className="w-full"
        required
      />
      <FileUpload
        label="Resume"
        file={typeof fields.cv === 'string' ? undefined : fields.cv}
        onRemove={() => handleField('cv', undefined)}
        onUpload={file => handleField('cv', file)}
        className="w-full"
        required
      />
      <div className="flex items-center gap-2 ml-auto">
        <Button variant="primary" size="medium" type="submit">
          Submit
        </Button>
      </div>
    </form>
  )
}

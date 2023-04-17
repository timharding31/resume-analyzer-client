import React, { useState } from 'react'
import { TextField, TextArea, Label, FileUpload, Button } from '../components'
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
  const [errorMessage, setErrorMessage] = useState<string>()
  const [response, setResponse] = useState<JSON>()
  const [loading, setLoading] = useState(false)

  const handleField = (
    field: keyof ResumeFormFields,
    value: ResumeFormFields[keyof ResumeFormFields]
  ) => {
    if (typeof value === 'string' && value.length === 0) {
      value = undefined
    }
    setFields(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)

    const qs = new URLSearchParams()
    const init: RequestInit = { method: 'POST' }

    if (fields.name != null) {
      qs.append('name', fields.name)
    }

    if (fields.cv != null) {
      if (typeof fields.cv === 'string') {
        qs.append('text', fields.cv)
      } else {
        init.body = new FormData()
        init.body.append('file', fields.cv)
      }
    }

    await fetch('/api/new?' + qs.toString(), init).then(res => {
      if (res.ok) {
        res.json().then(setResponse)
        setFields({})
        setErrorMessage(undefined)
      } else {
        res.json().then(error => setErrorMessage(error.detail))
        setResponse(undefined)
      }
    })

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-2 flex flex-col items-stretch gap-4">
      <TextField
        label="Name"
        name="name"
        value={fields.name ?? ''}
        onChange={e => handleField('name', e.target.value)}
        required
      />
      <Label required>Resume</Label>
      <FileUpload
        label="Upload file &hellip;"
        file={typeof fields.cv === 'string' ? undefined : fields.cv}
        onRemove={() => handleField('cv', undefined)}
        onUpload={file => {
          handleField('cv', file)
          setErrorMessage(undefined)
        }}
        onError={() => setErrorMessage('Invalid file type. The accepted file types are: pdf')}
        className="ml-4"
      />
      <TextArea
        label="&hellip; or paste text"
        name="resume"
        value={typeof fields.cv === 'string' ? fields.cv : ''}
        onChange={e => handleField('cv', e.target.value.substring(0, 3000))}
        charLimit={3000}
        className="ml-4"
      />
      <div className="flex items-center gap-2 ml-auto">
        <Button variant="primary" size="medium" type="submit" disabled={loading}>
          Submit
        </Button>
      </div>
      {response != null && <div dangerouslySetInnerHTML={{ __html: `${response}` }} />}
      {errorMessage != null && <div className="text-red-600">{errorMessage}</div>}
    </form>
  )
}

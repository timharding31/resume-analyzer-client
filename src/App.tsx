import { useState } from 'react'
import { TextField, Button, FileUpload, Radio, Checkbox } from './components'

function App() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('Not fetched')

  const handleFetch = async () => {
    if (!name) return setMessage('Not fetched')
    const res = await fetch('/api/hello/' + name)
    const { message: newMessage } = await res.json()
    setMessage(newMessage)
    setName('')
  }

  const [file, setFile] = useState<File>()
  const [response, setResponse] = useState<JSON>()

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile: File | undefined = Array.from(e.target.files ?? [])[0]
    setFile(uploadedFile)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !file) return alert('Missing name and/or file')
    const qs = new URLSearchParams({ name }).toString()
    const url = '/api/new?' + qs
    const body = new FormData()
    body.append('file', file)
    const response = await fetch(url, { method: 'POST', body }).then(res => res.json())
    setResponse(response)
    setName('')
    setFile(undefined)
  }

  const handleGetJoke = async () => {
    const response = await fetch('/api/joke').then(res => res.json())
    setResponse(response)
  }

  return (
    <div className="w-full m-auto max-w-lg">
      <form onSubmit={handleSubmit} className="mb-2 flex flex-col items-stretch gap-4">
        <TextField
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full"
          required
        />
        <FileUpload
          label="Resume"
          file={file}
          onRemove={() => setFile(undefined)}
          onUpload={file => setFile(file)}
          required
          className="w-full"
        />
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="primary" size="medium" type="submit">
            Submit
          </Button>
        </div>
      </form>
      <Button variant="secondary" size="large" type="button" onClick={handleGetJoke}>
        Tell me a joke
      </Button>
      {response != null && <div dangerouslySetInnerHTML={{ __html: `${response}` }} />}
    </div>
  )
}

export default App

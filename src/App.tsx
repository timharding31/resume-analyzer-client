import { useState } from 'react'
import { TextField, Button, FileInput, Radio, Checkbox } from './components'
import axios from 'axios'

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

  return (
    <div className="w-full m-auto max-w-lg">
      <div className="mb-2 flex flex-col items-center gap-4">
        <h2 className="block font-medium text-gray-900">
          <strong>Message: </strong>
          {message}
        </h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full"
            required
          />
          <FileInput
            onChange={handleFile}
            onRemove={() => setFile(undefined)}
            label="Resume"
            value={file?.name}
            required
          />
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="primary" size="medium" type="submit">
              Click me
            </Button>
          </div>
        </form>
      </div>
      {response != null && <pre>{JSON.stringify(response)}</pre>}
    </div>
  )
}

export default App

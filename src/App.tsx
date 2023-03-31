import { useState } from 'react'
import { TextField, Button, Radio, Checkbox } from './components'

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

  return (
    <div className="w-full m-auto max-w-lg">
      <div className="mb-2 flex flex-col items-center gap-4">
        <h2 className="block font-medium text-gray-900">
          <strong>Message: </strong>
          {message}
        </h2>
        <TextField
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full"
          required
        />
        <div className="flex items-center gap-2 ml-auto">
          <Radio label="Radio" defaultChecked={false} />
          <Checkbox label="Checkbox" defaultChecked />
          <Button onClick={handleFetch} variant="primary" size="medium">
            Click me
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App

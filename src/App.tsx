import { useState } from 'react'
import { ResumeForm } from './ResumeForm'
import { Button } from './components'

function App() {
  const [jokeResponse, setJokeResponse] = useState<JSON>()

  const handleGetJoke = async () => {
    const response = await fetch('/api/joke').then(res => res.json())
    setJokeResponse(response)
  }

  return (
    <div className="w-full m-auto max-w-lg">
      <ResumeForm />
      <Button variant="secondary" size="large" type="button" onClick={handleGetJoke}>
        Tell me a joke
      </Button>
      {jokeResponse != null && <div dangerouslySetInnerHTML={{ __html: `${jokeResponse}` }} />}
    </div>
  )
}

export default App

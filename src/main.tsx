import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

/*
gcloud app deploy --project th-resume-analyzer client/client.yaml api/api.yaml dispatch.yaml
*/

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

import { useState } from 'react'
import './App.css'
import { Button } from '@/components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <h2>App!</h2>
      <Button>Click me</Button>
    </>
  )
}

export default App

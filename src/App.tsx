import { useState } from 'react'
import './App.css'
import LabelBottomNavigation from './Components/LabelBottomNavigation'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LabelBottomNavigation></LabelBottomNavigation>
    </>
  )
}

export default App

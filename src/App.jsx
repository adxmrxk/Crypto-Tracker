import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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

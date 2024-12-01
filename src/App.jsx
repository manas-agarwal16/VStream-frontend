import { useState } from 'react'
import { Navbar , Sidebar , Home } from './components'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar/>
      <div className='flex w-full'>
        <Sidebar/>
        <Home/>
      </div>
    </div>
  )
}

export default App

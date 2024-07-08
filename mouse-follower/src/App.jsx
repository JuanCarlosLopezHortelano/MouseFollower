import { useEffect, useState } from 'react'
import './App.css'

const FollowMouse = () =>{

  const [enabled, setEnabled] = useState(false)
  
  const [position, setPosition] = useState({x: 0, y:0})

  //change bodyClass
  useEffect(()=>{
    document.body.classList.toggle('no-cursor', enabled)

    return() =>{
      document.body.classList.remove('no-cursor')
    }
  },[enabled])

  useEffect(()=>{
    console.log("EFECTO", {enabled})
    const handleMove  = (event) => {
      const {clientX, clientY} = event
      console.log('handleMove',{clientX,clientY})
      setPosition({x: clientX,y: clientY })
    }
    if (enabled) 
    { window.addEventListener('pointermove',handleMove)}

    return () => {
      console.log('cleanUp')
      window.removeEventListener('pointermove', handleMove)
    }

  },[enabled])
  
  return (
    <>
    <div style={{
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      border: '1px solid #fff',
      borderRadius: '50%',
      opacity: 0.8,
      pointerEvents: 'none',
      left: -25,
      top: -25,
      width: 50,
      height: 50,
      transform: `translate(${position.x}px, ${position.y}px)`

    }} />
   <button onClick={() => setEnabled(!enabled)}>
    {enabled ? 'Desactivar' : 'Activar'} seguir puntero
    </button>
</>
  )
}


function App() {

 
  return (
    <main>
     <h3 className="h3">Proyecto 3</h3>
      <FollowMouse />
    </main>
   
  )
}

export default App

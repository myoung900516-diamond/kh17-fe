import './App.css'
import heroImg from './assets/hero.png'
import { useState } from 'react';

function App() {
  const [size, setSize] = useState(300);

  return (
    <>
    <h1>이미지 크기 조절 예제</h1>
    <img src={heroImg} width={size}></img>
    <button onClick={()=>setSize(150)}>작게</button>
    <button onClick={()=>setSize(300)}>보통</button>
    <button onClick={()=>setSize(450)}>크게</button>

    </>
  )
}

export default App

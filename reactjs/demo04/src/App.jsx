import './App.css'
import heroImg from './assets/hero.png'
import { useState } from 'react';

function App() {
  const [size, setSize] = useState(300);

  return (
    <>
    <h1>이미지 크기 조절 예제</h1>
    
    <div>현재크기 : {size}px
        &nbsp;&nbsp;
        <button onClick={()=>setSize(size+10)}>+</button>
        <button onClick={()=>setSize(size-10)}>-</button>

    </div>
    <button onClick={()=>setSize(150)}>작게</button>
    <button onClick={()=>setSize(300)}>보통</button>
    <button onClick={()=>setSize(450)}>크게</button>

    <hr/>
    <img src={heroImg} className="target" width={size} height={size}></img>

    </>
  )
}

export default App

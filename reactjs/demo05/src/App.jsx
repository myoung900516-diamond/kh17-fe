import { useState } from 'react'
import './App.css'

function App() {
const [content, setContent] = useState(0);

  return (
    <>
      <h1>계좌이체</h1>
      <input value={content}/>
      <br/>
      <button onClick={()=>setContent(content+10000000)}>천만</button>
      <button onClick={()=>setContent(content+1000000)}>백만</button>
      <button onClick={()=>setContent(content+100000)}>십만</button>
      <button onClick={()=>setContent(content+10000)}>만</button>
      <button onClick={()=>setContent(content+1000)}>천</button>
      <button onClick={()=>setContent(content+100)}>백</button>
      <button onClick={()=>setContent(content+10)}>십</button>
      <button onClick={()=>setContent(content+1)}>일</button>
      <button onClick={()=>setContent(0)}>reset</button>
      <button onClick={()=>setContent()}>remove</button>
    </>
  )
}

export default App

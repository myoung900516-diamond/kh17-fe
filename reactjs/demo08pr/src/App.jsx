import { useState } from "react"
import './App.css'
import { useMemo } from "react";

function App() {
const [content1, setContent1] = useState("");
const [content2, setContent2] = useState("");

const valid1 = useMemo(()=>{return content1.length > 1000? "Yes": "No"}, [content1]);
const valid2 = useMemo(()=>{return content2.length > 1000? "Yes": "No"}, [content2]);
const color1 = useMemo(()=>{return valid1 == "Yes"? "danger": "primary"}, [valid1]);
const color2 = useMemo(()=>{return valid2 == "Yes"? "danger": "primary"}, [valid2]);

const allValid = useMemo(()=>{
  return content1.length <0 && valid1 && content2.length <0 && valid2;
}, [content1, content2, valid1, valid2]);
  return (
    <div className='container my-5'> 

      <div className='row'>
        <div className='col'>
          <div className='p-4 bg-dark text-light rounded'>
            <h1>자기소개서</h1>
            <p>자기소개 입력창과 글자수를 표현합니다. </p>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <p>(Q1)당신의 성장과정에 대해서 소개해주세요</p>
        <textarea className="form-control mt-2" rows={10} value={content1} onChange={e=>setContent1(e.target.value)}/>
        <div className="text-end">
          <span className={`text-${color1}`}>{content1.length}/1000</span>글자
        </div>
      </div>
      <div className="row mt-4">
        <p>(Q2)당신의 성장과정에 대해서 소개해주세요</p>
        <textarea  className="form-control mt-2" rows={10} value={content2} 
              onChange={e=>setContent2(e.target.value)}/>
        <div className="text-end">
          <span className={`text-${color2}`}>{content2.length}/1000</span>글자
        </div>
      </div>

      <div className="row mt-5">
        <div className="col">
          <button className="btn btn-lg btn-success w-100" disabled={allValid === true}>제출하기</button>
        </div>
      </div>
      
      </div>
  )
}

export default App

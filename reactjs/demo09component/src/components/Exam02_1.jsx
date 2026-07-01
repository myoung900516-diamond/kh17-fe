import { useState } from "react";
import Jumbodtron from "./Jumbodtron";
import { useCallback } from "react";
import { useMemo } from "react";



function Exam02_1(){
    const [student, setStudent] = useState({
    name : "",
    korean : 0,
    english : 0,
    math : 0,
    }); 


    const changeStringValue = useCallback(e=>{
      const {name, value} = e. target;

        setStudent({
          ...student, 
          [name] : value 
        });
    }, [student]);

    const changeNumericValue = useCallback(e=>{
      const {name, value} = e. target;

        setStudent({
          ...student, 
          [name] : parseInt(value || 0) 
        });
    }, [student]);
   

    
    const total = useMemo(()=>{return student.korean+student.english+student.math}, [student]);
    const average = useMemo(()=>{return total/3}, [total]);
  
    return(
        <>
        <Jumbodtron title="학생 성적 계산기" content="시험 결과를 입력하시면 평균과 총점을 계산해드립니다"/>
         
         
          {/* 이름 입력화면 */}
      <div className="row mt-4">
        <label className="col-sm-3 col-form-label">이름</label>
        <div className="col-sm-9">
          <input type="text" name="name" className="form-control" 
              value={student.name} onChange={changeStringValue}/>
          <div className="valid-feedback">멋진 이름입니다!</div>
          <div className="invalid-feedback">사용중이거나 사용할 수 없는 이름입니다</div>
        </div>
      </div>
        {/* 국어점수 입력화면 */}
      <div className="row mt-4">
        <label className="col-sm-3 col-form-label">국어점수</label>
        <div className="col-sm-9">
          <input type="text" inputMode="numeric" name="korean" className="form-control" 
              value={student.korean} onChange={changeNumericValue}/>
          <div className="valid-feedback">멋진 아이디입니다!</div>
          <div className="invalid-feedback">사용중이거나 사용할 수 없는 형식입니다</div>
        </div>
      </div>

        {/* 영어점수 입력화면 */}
      <div className="row mt-4">
        <label className="col-sm-3 col-form-label">영어점수</label>
        <div className="col-sm-9">
          <input type="text" inputMode="numeric" name="english" className="form-control" 
              value={student.english} onChange={changeNumericValue}/>
          <div className="valid-feedback">멋진 아이디입니다!</div>
          <div className="invalid-feedback">사용중이거나 사용할 수 없는 형식입니다</div>
        </div>
      </div>

        {/* 수학점수 입력화면 */}
      <div className="row mt-4">
        <label className="col-sm-3 col-form-label">수학점수</label>
        <div className="col-sm-9">
          <input type="text" inputMode="numeric" name="math" className="form-control" 
              value={student.math} onChange={changeNumericValue}/>
          <div className="valid-feedback">멋진 아이디입니다!</div>
          <div className="invalid-feedback">사용중이거나 사용할 수 없는 형식입니다</div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col">
            <div className="shadow p-4 rounded bordered">
                {student.name}님의 성적은 다음과 같습니다. <br/>
                총점은 {total}점이고, 평균은 {average.toFixed(2)}점 입니다. 
            </div>
        </div>
      </div>

        </>
    );
}

export default Exam02_1;
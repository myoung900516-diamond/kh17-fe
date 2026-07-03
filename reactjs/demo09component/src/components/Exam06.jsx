import { useCallback, useState } from "react";
import Jumbodtron from "./Jumbodtron";
import { FaPlus, FaXmark} from "react-icons/fa6";



export default function Exam06(){
    //state가 배열인 경우
    const [numbers, setNumbers] = useState([10, 20, 30, 40, 50]);
    const [more, setMore] = useState("");

    

    const addNumber = useCallback(()=>{
        
        setNumbers([
            ...numbers,
            more
        ]);
        setMore("");
    }, [numbers, more]);
    const deleteNumber = useCallback(index=> {
       const result = numbers.filter((number, idx)=> idx !== index);

       setNumbers(result);
    }, [numbers]);
    return(
        <>
            <Jumbodtron title="반복적인 화면 출력"/>

            <div className="row mt-4">

                <div className="col">
                    <ul className="list-group">
                        {numbers.map((number, index)=>(
                            <li className="list-group-item" key={index}>{number}
                                <FaXmark className="ms-4 text-danger"
                                onClick={e=>deleteNumber(index)}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* 입력창과 버튼을 만들고 추가를 누르면 배열의 마지막 데이터 뒤에 추가되독록 구현 */}
            <div className="row mt-4">
                <div className="col">
                    <div className="input-group">
                        <input type="text" 
                        value={more} onChange={e=>{setMore(e.target.value)}} className="form-control"/>
                        <button type="button" className="btn btn-success" 
                            onClick={addNumber}>
                            <FaPlus className="me-2"/>
                            <span>추가</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
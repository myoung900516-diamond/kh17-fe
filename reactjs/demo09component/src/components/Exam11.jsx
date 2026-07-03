import { useCallback, useEffect, useState } from "react";
import Jumbodtron from "./Jumbodtron";
import { FaArrowDown } from "react-icons/fa";
import { ClimbingBoxLoader } from "react-spinners";
import axios from "axios";


export default function Exam11(){
    const [lectureList, SetLectureList] = useState([]);
    const [last, setLast] = useState(false);
    const [size, setSize] = useState(10);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        
        loadMoreList();
    }, []);
    const loadMoreList = useCallback(()=>{
        setLoading(true);
        const dataSize = lectureList.length;
        const lastLectureNo = dataSize === 0 ? 0 : lectureList[dataSize-1].lectureNo;

        axios({
            url : "http://localhost:8080/api/lecture/listForReact",
            method : "get",
            params : {
                lastLectureNo : lastLectureNo,
                size : size
            }
        })
        .then(response=>{
            SetLectureList([...lectureList, ...response.data.list]);
            setLast(response.data.last);
        })
        .finally(()=> setLoading(false));
    }, [lectureList, size]);

    return(
        <>
            <Jumbodtron title="강좌 목록"/>
        <div className="row mt-4">
            <div className="col">
                <select value={size} onChange={e=>setSize(parseInt(e.target.value))}>
                    <option value="5">5개씩</option>
                    <option value="10">10개씩</option>
                    <option value="20">20개씩</option>
                    <option value="50">50개씩</option>
                </select>
            </div>
        </div>
            <div className="row mt-4">
                <div className="col">
                    <div className="text-nowrap table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>강의명</th>
                                    <th>강의유형</th>
                                    <th>강의시간</th>
                                    <th>강의료</th>
                                    <th>강의형태</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lectureList.map((lecture)=>(
                                <tr key={lecture.lectureNo}>
                                    <td>{lecture.lectureTitle}</td>
                                    <td>{lecture.lectureCategory}</td>
                                    <td>{lecture.lectureDuration}</td>
                                    <td>{lecture.lecturePrice.toLocaleString()}KRW</td>
                                    <td>{lecture.lectureType}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* 더보기 버튼 */}
            { last === false && (
            <div className="row mt-4">
                <div className="col">
                    <button type="button" className="btn btn-success btn-lg w-100"
                    onClick={loadMoreList}>
                        <FaArrowDown/>
                        <span className="mx-2">더보기</span>
                        <FaArrowDown/>
                    </button>
                </div>
            </div>
            )}
            {loading === true && (
            <div className="position-fixed top-0 
                start-0 w-100 h-100 bg-dark bg-opacity-25 
                d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column text-center">
            <ClimbingBoxLoader loading={loading}/>
            <p className="mt-2">등록중</p>
            </div>
            </div>
        )}
        </>
    )
}
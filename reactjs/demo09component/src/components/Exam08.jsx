import { FaTrash } from "react-icons/fa";
import Jumbodtron from "./Jumbodtron";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";


export default function Exam08(){
    const [lectureList, setLectureList] = useState([]);

    useEffect(()=>{
        axios({
            url : "http://localhost:8080/api/lecture/list",
            method:"get"
        })
        .then(response=>{
            // console.log(response);
            setLectureList(response.data);
        });
    }, []);
    const deleteLecture = useCallback((target)=>{

        Swal.fire({
            title: "sure?",
            text : "no back again",
            icon: "warning",
            showCancelButton : true,
                confirmButtonText : "delete",
                cancelButtonText : "candel"
        })
        .then(result=>{
            if(result.isConfirmed){
                setLectureList(lectureList
                    .filter(lecture=>lecture.lectureNo !== target.lectureNo))
            }
            toast.success("done");
        });

    },[lectureList]);
    return(
        <>
            <Jumbodtron title="강좌목록"/>

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
                                    <th>관리</th>
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
                                    <td>
                                        <FaTrash className="text-danger" 
                                        onClick={e=>(deleteLecture(lecture))}/>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
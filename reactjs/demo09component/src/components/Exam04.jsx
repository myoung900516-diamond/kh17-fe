import { useCallback, useEffect, useMemo, useState } from "react";
import Jumbodtron from "./Jumbodtron";
//axios라는 라이브러리에서 제공하는 기본 JS파일을 불러와서 axios라는 이름으로 쓰겠다
import axios from 'axios';
import { toast, Bounce } from "react-toastify";
import Swal from 'sweetalert2';

export default function Exam04(){
    const [lecture, setLecture] = useState({
        lectureTitle : "",
        lectureCategory : "",
        lectureDuration : 0, 
        lecturePrice : 0, 
        lectureType : ""
    });
    const [result, setResult] = useState({
        lectureTitle : "",
        lectureCategory : "",
        lectureDuration : "", 
        lecturePrice : "", 
        lectureType : ""
    });
    const valid = useMemo(()=>{
        if(result.lectureTitle !== "is-valid") return false;
        if(result.lectureCategory !== "is-valid") return false;
        if(result.lectureDuration !== "is-valid") return false;
        if(result.lecturePrice !== "is-valid") return false;
        if(result.lectureType !== "is-valid") return false;
        return true;
    }, [result]);

    const changeStringValue = useCallback(e=>{
        const {name, value} = e.target;
        setLecture({
            ...lecture,
            [name] : value
        });
    }, [lecture]);
    const changeNumericValue = useCallback(e=>{
        const {name, value} = e.target;
        const regex = /[^0-9]/g;
        const replacement = value.replace(regex, "");

        setLecture({
            ...lecture,
            [name] : parseInt(replacement)
        });
    }, [lecture]);

    const checkLectureTitle = useCallback(()=>{
        const valid = lecture.lectureTitle.length > 0;

        setResult({
            ...result,
            lectureTitle : valid? "is-valid" : "is-invalid"
        });
    }, [lecture.lectureTitle, result.lectureTitle]);
    const checkLectureCategory = useCallback(()=>{
        //const regex = /^(이론|실습|시험)$/;
        //const valid = regex.test(lecture.lectureCategory);
        const valid = ['이론', '실습', '시험'].includes(lecture.lectureCategory);
        setResult({
            ...result,
            lectureCategory : valid? "is-valid" : "is-invalid"
        });
    }, [lecture.lectureCategory, result.lectureCategory]);
    const checkLectureDuration = useCallback(()=>{
        // const valid = lecture.lectureDuration <= 300 && lecture.lectureDuration >0;
        const valid = lecture.lectureDuration !== ""
                        && lecture.lectureDuration % 30 ===0
                        && lecture.lectureDuration > 0
                        && lecture.lectureDuration <= 300;
        setResult({
            ...result,
            lectureDuration : valid? "is-valid" : "is-invalid"
        });
    }, [lecture.lectureDuration, result.lectureDuration]);
    const checkLecturePrice = useCallback(()=>{
        const valid = lecture.lecturePrice > 0 && lecture.lecturePrice <= 10000000000;
        setResult({
            ...result,
            lecturePrice : valid? "is-valid" : "is-invalid"
        });
    }, [lecture.lecturePrice, result.lecturePrice]);
    const checkLectureType = useCallback(()=>{
        const regex = /^(온라인|오프라인|혼합)$/;
        const valid = regex.test(lecture.lectureType);
        setResult({
            ...result,
            lectureType : valid? "is-valid" : "is-invalid"
        });
    }, [lecture.lectureType, result.lectureType]);

    //데이터전송(등록)
    const send=useCallback(()=>{
        // $.ajax({
        //     url : "http://localhost:8080/api/lecture/insert",
        //     method : "post", 
        //     data : lecture, 
        //     success : function(response){
        //         window.alert("등록완료!");
        //     }
        // });
        axios({
            url : "http://localhost:8080/api/lecture/insert",
            method : "post",
            data : lecture,

        })
        .then(
            response=>{
                //window.alert("등록완료!");

                //react-toastify생성코드

                //toast('🦄 등록 완료!');
                //toast.success("등록완료!");
                //toast.error("등록완료!");


                //sweetalert2 생성 코드
                Swal.fire({
                title: 'Success!',
                text: '강좌등록이 완료되었습니다.',
                icon: 'success',
                confirmButtonText: '확인'
                })
                //입력값 정리
                setLecture({
                    lectureTitle : "",
                    lectureCategory : "",
                    lectureDuration : "", 
                    lecturePrice : "", 
                    lectureType : ""
                })
                setResult({
                    lectureTitle : "",
                    lectureCategory : "",
                    lectureDuration : "", 
                    lecturePrice : "", 
                    lectureType : ""
                })
                }
        );
    }, [lecture]);
    useEffect(()=>{
        if(lecture.lectureCategory === "" && result.lectureCategory === "") return;
        checkLectureCategory();
    }, [lecture.lectureCategory, result.lectureCategory]);
    useEffect(()=>{
        if(lecture.lectureType === "" && result.lectureType === "") return;
        checkLectureType();
    }, [lecture.lectureType, result.lectureType]);

    return(
        <>
        <Jumbodtron title="강좌등록" content="신규 강좌를 등록합니다"/>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">강좌이름</label>
            <div className="col-sm-9">
                <input type="text" name="lectureTitle" className={`form-control ${result.lectureTitle}`} 
                    value={lecture.lectureTitle} onChange={changeStringValue} 
                    onBlur={checkLectureTitle}/>
                <div className="invalid-feedback">필수 입력사항입니다!</div>
            </div>
        </div>
        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">강좌유형</label>
            <div className="col-sm-9">
                <select name="lectureCategory" className={`form-select ${result.lectureCategory}`} 
                    value={lecture.lectureCategory} onChange={changeStringValue} >
                        <option value="">선택하세요</option>
                        <option>이론</option>
                        <option>실습</option>
                        <option>시험</option>
                </select>
                <div className="invalid-feedback">필수 입력사항입니다</div>
            </div>
        </div>
        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">강좌기간</label>
            <div className="col-sm-9">
                <input type="text" inputMode="numeric"
                    name="lectureDuration" className={`form-control ${result.lectureDuration}`} 
                    value={lecture.lectureDuration} onChange={changeNumericValue} 
                    onBlur={checkLectureDuration}/>
                <div className="invalid-feedback">30시간 단위로 작성해주세요(최대300시간)</div>
            </div>
        </div>
        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">강좌가격</label>
            <div className="col-sm-9">
                <input type="text" inputMode="numeric"
                    name="lecturePrice" className={`form-control ${result.lecturePrice}`} 
                    value={lecture.lecturePrice} onChange={changeNumericValue} 
                    onBlur={checkLecturePrice}/>
                <div className="invalid-feedback">0원 이상 10억 이하로 작성해주세요</div>
            </div>
        </div>
        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">강좌형태</label>
            <div className="col-sm-9">
                <select name="lectureType" className={`form-select ${result.lectureType}`} 
                    value={lecture.lectureType} onChange={changeStringValue} >
                        <option value="">선택하세요</option>
                        <option>온라인</option>
                        <option>오프라인</option>
                        <option>혼합</option>
                </select>
                <div className="invalid-feedback">필수 입력사항입니다.</div>
            </div>
        </div>
            <div className="row mt-5">
                <div className="col">
                <button className="btn btn-lg btn-success w-100" 
                disabled={valid ===false} 
                onClick={send}>등록하기</button>
                </div>
            </div>
        </>
    )

};
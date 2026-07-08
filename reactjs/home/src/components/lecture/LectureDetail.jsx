import { Link, Navigate, useLinkClickHandler, useNavigate, useParams } from "react-router-dom";
import Jumbotron from "@templates/Jumbotron";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import { FaList, FaTrash, FaPenToSquare } from "react-icons/fa6";
import Swal from "sweetalert2";
import { toast } from "react-toastify";


export default function LectureDetail() {
    //파라미터를 다 뽑아다 객체에 넣어줌 
    const { lectureNo } = useParams();

    if (/^[0-9]+$/.test(lectureNo) === false) {
        return <Navigate to="/lecture/list" replace />;
    }

    const navigate = useNavigate(() => { }, []);

    const [lecture, setLecture] = useState(null);

    useEffect(() => {
        loadData();
        // axios({
        //     url: "http://localhost:8080/api/lecture/detail",
        //     method: "get",
        //     params: { lectureNo: lectureNo }
        // })
        //     .then(response => {
        //         setLecture(response.data);
        //     });
    }, []);
    //[1] 일반 함수에서 비동기 작업을 호출 : .then()으로 후속작업을 지정
    // const loadData = useCallback(()=>{
    //     axios({
    //         url : `http://localhost:8080/api/lecture/detail`,
    //         method : "get",
    //         params : { lectureNo : lectureNo}
    //     })
    //     .then(response=>{
    //         setLecture(response.data);
    //     });
    // }, []);
    //[2] 비동기 함수를 사용
    //-함수 앞에 async 키워드 추가
    //-then대신 awail키워드 사용 가능 
    const loadData = useCallback(async ()=> {
        // const response = await axios({
        //     url : `http://localhost:8080/api/lecture/detail/${lectureNo}`,
        //     method : "get"
        // });
        const response = await axios.get(`/api/lecture/detail/${lectureNo}`)
        setLecture(response.data);
    }, []);
    // const deleteLecture = useCallback(() => {

    //     Swal.fire({
    //         title: "sure?",
    //         text: "no back again",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonText: "delete",
    //         cancelButtonText: "candel"
    //     })
    //         .then(result => {
    //             if (result.isConfirmed) {
    //                 axios({
    //                     url: "http://localhost:8080/api/lecture/delete",
    //                     method: "get",
    //                     params: { lectureNo: lectureNo }
    //                 });
    //             }
    //         })
    //         .then(() => {
    //             toast.success("done");
    //             navigate("/lecture/list");
    //         });
    // }, [lecture, navigate]);
    const deleteLecture = useCallback(async ()=>{
        const result = await Swal.fire({
            title: "sure?",
            text: "no back again",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "delete",
            cancelButtonText: "candel"
        });
        if(result.isConfirmed === false) return;
        const response = await axios.get(`/api/lecture/delete/${lectureNo}`);
        toast.success("done");
        navigate("/lecture/list");
    },[lectureNo]);
    return (<>
        <Jumbotron title="강의 상세 정보" content={`${lectureNo}번 강의의 상세 정보 화면입니다.`} />
        {/* 상태를 나누어서 출력 */}
        {lecture === null ? (
            <h1>로딩중입니다...</h1>
        ) : (
            <>
                <Row className="mt-4 fs-2">
                    <Col sm={3} className="text-info fw-bold">
                        강의명
                    </Col>
                    <Col sm={9}>
                        {lecture.lectureTitle}
                    </Col>
                </Row>

                <Row className="mt-4 fs-2">
                    <Col sm={3} className="text-info fw-bold">
                        강의유형
                    </Col>
                    <Col sm={9}>
                        {lecture.lectureCategory}
                    </Col>
                </Row>
                <Row className="mt-4 fs-2">
                    <Col sm={3} className="text-info fw-bold">
                        강의시간
                    </Col>
                    <Col sm={9}>
                        {lecture.lectureDuration.toLocaleString()}분
                    </Col>
                </Row>
                <Row className="mt-4 fs-2">
                    <Col sm={3} className="text-info fw-bold">
                        강의료
                    </Col>
                    <Col sm={9}>
                        {lecture.lecturePrice.toLocaleString()}원
                    </Col>
                </Row>
                <Row className="mt-4 fs-2">
                    <Col sm={3} className="text-info fw-bold">
                        강의형태
                    </Col>
                    <Col sm={9}>
                        {lecture.lectureType}
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col sm={3} className="text-end">
                        <Button as={Link} to="/lecture/list" className="ms-2" variant="secondary">
                            <FaList />
                            <span>목록으로</span></Button>
                        <Button className="ms-2" variant="warning">
                            <FaPenToSquare />
                            <span>수정하기</span></Button>
                        <Button className="ms-2" variant="danger" onClick={deleteLecture}>
                            <FaTrash />
                            <span>삭제하기</span></Button>
                    </Col>
                </Row>
            </>
        )}
    </>)
}
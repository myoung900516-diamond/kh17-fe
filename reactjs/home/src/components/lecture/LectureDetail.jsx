import { Link, Navigate, useLinkClickHandler, useNavigate, useParams } from "react-router-dom";
import Jumbotron from "../../templates/Jumbotron";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import { FaList, FaTrash, FaPenToSquare } from "react-icons/fa6";
import Swal from "sweetalert2";
import { toast } from "react-toastify";


export default function LectureDetail() {
    //Route에 선언된 파라미터 변수를 읽으려면 useParams()를 사용해야 한다.
    //<Route path="/country/detail/:countryNo">로 써있으면 구조분해할당으로 추출이 가능
    const { lectureNo } = useParams();

    //만약 countryNo가 원치 않는 값(ex:숫자가 아닌 경우)을 가지면 다른 화면을 반환시켜야 한다
    //스프링에서는 redirect라고 불렀는데... React에서는 어떻게 처리하느냐? 
    //useNavigate()와 이용해서 처리가 가능한가? (불가능)
    //-> 이런상황을 대비해서 화면이면서 이동이 가능한 태그를 제공 : <Navigate>
    if (/^[0-9]+$/.test(lectureNo) === false) {
        return <Navigate to="/lecture/list" replace />;
    }

    const navigate = useNavigate(() => { }, []);

    //countryNo가 정상적인 숫자인 경우의 처리내용 작성
    const [lecture, setLecture] = useState(null);

    useEffect(() => {
        axios({
            url: "http://localhost:8080/api/lecture/detail",
            method: "get",
            params: { lectureNo: lectureNo }
        })
            .then(response => {
                setLecture(response.data);
            });
    }, []);
    const deleteLecture = useCallback(() => {
        Swal.fire({
            title: "sure?",
            text: "no back again",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "delete",
            cancelButtonText: "candel"
        })
            .then(result => {
                if (result.isConfirmed) {
                    axios({
                        url: "http://localhost:8080/api/lecture/delete",
                        method: "get",
                        params: { lectureNo: lectureNo }
                    });
                }
            })
            .then(() => {
                toast.success("done");
                navigate("/lecture/list");
            });
    }, [lecture, navigate]);
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
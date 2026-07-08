import { Link, Navigate, useLinkClickHandler, useNavigate, useParams } from "react-router-dom";
import Jumbotron from "@templates/Jumbotron";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Row, Form } from "react-bootstrap";
import { FaList, FaTrash, FaPenToSquare, FaSquarePen, FaCheck, FaXmark } from "react-icons/fa6";
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
    }, []);
    const loadData = useCallback(async () => {
        const response = await axios.get(`/api/lecture/${lectureNo}`)
        setLecture(response.data);
    }, []);
    const deleteLecture = useCallback(async () => {
        const result = await Swal.fire({
            title: "sure?",
            text: "no back again",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "delete",
            cancelButtonText: "candel"
        });
        if (result.isConfirmed === false) return;
        const response = await axios.delete(`/api/lecture/${lectureNo}`);
        toast.success("done");
        navigate("/lecture/list");
    }, [lectureNo]);
    const [backup, setBackup] = useState(null);
    const [editMode, setEditMode] = useState({
        lectureTitle: false,
        lectureCategory: false,
        lectureDuration: false,
        lecturePrice: false,
        lectureType: false,
    });
    const changeStringValue = useCallback(e => {
        const { name, value } = e.target;
        setLecture({
            ...lecture,
            [name]: value
        });
    }, [lecture]);
    const changeNumericValue = useCallback(e => {
        const { name, value } = e.target;
        const regex = /[^0-9]+/g;
        const replacement = value.replace(regex, "");
        const number = parseInt(replacement || 0);
        setLecture({
            ...lecture,
            [name]: number
        });
    }, [lecture]);
    const updateLecture = useCallback(async (field) => {
        const response = await axios.patch(
            `/api/lecture/${lectureNo}`,
            { [field]: lecture[field] }
        );
        setBackup({ ...backup, [field]: lecture[field] });
        setEditMode({ ...editMode, [field]: false });
        toast.success("정보가 변경되었습니다");
    }, [lecture, backup]);
    const cancelUpdate = useCallback((field) => {
        setLecture({ ...lecture, [field]: backup[field] });
        setEditMode({ ...editMode, [field]: false });
        toast.error("취소 되었습니다")
    }, [lecture, backup, editMode]);
    const startUpdate = useCallback((field) => {
        setEditMode({ ...editMode, [field]: true })
    }, [editMode]);
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
                        {editMode.lectureTitle !== true ? (<>
                            <span>{lecture.lectureTitle}</span>
                            <FaSquarePen className="text-warning ms-2"
                                onClickCapture={e => startUpdate("lectureTitle")} />
                        </>) : (<>
                            <Form.Control type="text" className="w-auto d-inline-block"
                                name="lectureTitle" value={lecture.lectureTitle}
                                onChange={changeStringValue} />
                            <FaCheck className="text-success ms-2"
                                onClick={e => updateLecture("lectureTitle")} />
                            <FaXmark className="test-danger ms-2"
                                onClick={e => cancelUpdate("lectureTitle")} />
                        </>)}
                    </Col>
                </Row>

                <Row className="mt-4 fs-2">
                    <Col sm={3} className="text-info fw-bold">
                        강의유형
                    </Col>
                    <Col sm={9}>
                        {editMode.lectureCategory !== true ? (<>
                            <span>{lecture.lectureCategory}</span>
                            <FaSquarePen className="text-warning ms-2"
                                onClickCapture={e => startUpdate("lectureCategory")} />
                        </>) : (<>
                            <Form.Select type="text" className="w-auto d-inline-block"
                                name="lectureCategory" value={lecture.lectureCategory}
                                onChange={changeStringValue}>
                                <option>이론</option>
                                <option>실습</option>
                                <option>시험</option>
                            </Form.Select>
                            <FaCheck className="text-success ms-2"
                                onClick={e => updateLecture("lectureCategory")} />
                            <FaXmark className="test-danger ms-2"
                                onClick={e => cancelUpdate("lectureCategory")} />
                        </>)}
                    </Col>
                </Row>
                <Row className="mt-4 fs-2">
                    <Col sm={3} className="text-info fw-bold">
                        강의시간
                    </Col>
                    <Col sm={9}>
                        {editMode.lectureDuration !== true ? (<>
                            <span>{lecture.lectureDuration.toLocaleString()}분</span>
                            <FaSquarePen className="text-warning ms-2"
                                onClickCapture={e => startUpdate("lectureDuration")} />
                        </>) : (<>
                            <Form.Control type="text" className="w-auto d-inline-block"
                                name="lectureDuration" value={lecture.lectureDuration}
                                onChange={changeNumericValue} />
                            <FaCheck className="text-success ms-2"
                                onClick={e => updateLecture("lectureDuration")} />
                            <FaXmark className="test-danger ms-2"
                                onClick={e => cancelUpdate("lectureDuration")} />
                        </>)}
                    </Col>
                </Row>
                <Row className="mt-4 fs-2">
                    <Col sm={3} className="text-info fw-bold">
                        강의료
                    </Col>
                    <Col sm={9}>
                        {editMode.lecturePrice !== true ? (<>
                            <span>{lecture.lecturePrice.toLocaleString()}원</span>
                            <FaSquarePen className="text-warning ms-2"
                                onClickCapture={e => startUpdate("lecturePrice")} />
                        </>) : (<>
                            <Form.Control type="text" className="w-auto d-inline-block"
                                name="lecturePrice" value={lecture.lecturePrice}
                                onChange={changeNumericValue} />
                            <FaCheck className="text-success ms-2"
                                onClick={e => updateLecture("lecturePrice")} />
                            <FaXmark className="test-danger ms-2"
                                onClick={e => cancelUpdate("lecturePrice")} />
                        </>)}
                    </Col>
                </Row>
                <Row className="mt-4 fs-2">
                    <Col sm={3} className="text-info fw-bold">
                        강의형태
                    </Col>
                    <Col sm={9}>
                        {editMode.lectureType !== true ? (<>
                            <span>{lecture.lectureType}</span>
                            <FaSquarePen className="text-warning ms-2"
                                onClickCapture={e => startUpdate("lectureType")} />
                        </>) : (<>
                            <Form.Select type="text" className="w-auto d-inline-block"
                                name="lectureType" value={lecture.lectureType}
                                onChange={changeStringValue}>
                                <option>온라인</option>
                                <option>오프라인</option>
                                <option>혼합</option>
                            </Form.Select>
                            <FaCheck className="text-success ms-2"
                                onClick={e => updateLecture("lectureType")} />
                            <FaXmark className="test-danger ms-2"
                                onClick={e => cancelUpdate("lectureType")} />
                        </>)}
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col sm={3} className="text-end">
                        <Button as={Link} to="/lecture/list" className="ms-2" variant="secondary">
                            <FaList />
                            <span>목록으로</span></Button>
                        <Button as={Link} to={`/lecture/edit/${lectureNo}`} className="ms-2" variant="warning">
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
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { FaAsterisk, FaList, FaPlus, FaSquarePen, FaXmark } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import Jumbotron from "@templates/Jumbotron";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { apiClient } from "@utils/reaxios";

export default function LectureEdit() {
    const { lectureNo } = useParams();

    if (/^[0-9]+$/.test(lectureNo) === false) {
        return <Navigate to="/lecture/list" replace />;
    }

    const navigate = useNavigate(() => { }, []);

    const [lecture, setLecture] = useState({
        lectureTitle: "",
        lectureCategory: "",
        lectureDuration: 0,
        lecturePrice: 0,
        lectureType: ""
    });

    useEffect(() => {
        loadData();
    }, []);
    const [validated, setValidated] = useState(false);
    const loadData = useCallback(async () => {
        const response = await apiClient.get(`/lecture/${lectureNo}`)
        setLecture(response.data);
    }, []);
    const [result, setResult] = useState({
        lectureTitle: "",
        lectureCategory: "",
        lectureDuration: "",
        lecturePrice: "",
        lectureType: ""
    });
    const valid = useMemo(() => {
        if (result.lectureTitle !== "is-valid") return false;
        if (result.lectureCategory !== "is-valid") return false;
        if (result.lectureDuration !== "is-valid") return false;
        if (result.lecturePrice !== "is-valid") return false;
        if (result.lectureType !== "is-valid") return false;
        return true;
    }, [result]);

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

        setLecture({
            ...lecture,
            [name]: parseInt(replacement || 0)
        });
    }, [lecture]);

    const checkLectureTitle = useCallback(() => {
        const valid = lecture.lectureTitle.length > 0;

        setResult({
            ...result,
            lectureTitle: valid ? "is-valid" : "is-invalid"
        });
    }, [lecture.lectureTitle, result.lectureTitle]);
    const checkLectureCategory = useCallback(() => {
        //const regex = /^(이론|실습|시험)$/;
        //const valid = regex.test(lecture.lectureCategory);
        const valid = ['이론', '실습', '시험'].includes(lecture.lectureCategory);
        setResult({
            ...result,
            lectureCategory: valid ? "is-valid" : "is-invalid"
        });
    }, [lecture.lectureCategory, result.lectureCategory]);
    const checkLectureDuration = useCallback(() => {
        // const valid = lecture.lectureDuration <= 300 && lecture.lectureDuration >0;
        const valid = lecture.lectureDuration !== ""
            && lecture.lectureDuration % 30 === 0
            && lecture.lectureDuration > 0
            && lecture.lectureDuration <= 300;
        setResult({
            ...result,
            lectureDuration: valid ? "is-valid" : "is-invalid"
        });
    }, [lecture.lectureDuration, result.lectureDuration]);
    const checkLecturePrice = useCallback(() => {
        const valid = lecture.lecturePrice > 0 && lecture.lecturePrice <= 10000000000;
        setResult({
            ...result,
            lecturePrice: valid ? "is-valid" : "is-invalid"
        });
    }, [lecture.lecturePrice, result.lecturePrice]);
    const checkLectureType = useCallback(() => {
        const regex = /^(온라인|오프라인|혼합)$/;
        const valid = regex.test(lecture.lectureType);
        setResult({
            ...result,
            lectureType: valid ? "is-valid" : "is-invalid"
        });
    }, [lecture.lectureType, result.lectureType]);

    //데이터전송(등록)
    const send = useCallback(async () => {
        const response = await apiClient.post(`/lecture/`, lecture);
        const result = await Swal.fire({
            title: 'Success!',
            text: '강좌등록이 완료되었습니다.',
            icon: 'success',
            confirmButtonText: '확인'
        });
        navigate(`/lecture/detail/${response.data.lectureNo}`);
    }, [lecture]);
    useEffect(() => {
        if (lecture.lectureCategory === "" && result.lectureCategory === "") return;
        checkLectureCategory();
    }, [lecture.lectureCategory, result.lectureCategory]);
    useEffect(() => {
        if (lecture.lectureType === "" && result.lectureType === "") return;
        checkLectureType();
    }, [lecture.lectureType, result.lectureType]);

    return (<>
        <Jumbotron title="강좌등록" content="신규 강좌를 등록합니다" />

        <Row className="mt-4">
            <Form.Label sm={3}>
                <span>강의명</span>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="lectureTitle"
                    className={result.lectureTitle}
                    value={lecture.lectureTitle} onChange={changeStringValue}
                    onBlur={checkLectureTitle} />
                <div className="invalid-feedback">필수 입력사항입니다!</div>
            </Col>
        </Row>
        <Row className="mt-4">
            <Form.Label sm={3}>
                <span>강의유형</span>
            </Form.Label>
            <Col sm={9}>
                <Form.Select name="lectureCategory" className={validated ? result.lectureCategory : ""}
                    value={lecture.lectureCategory} onChange={e=>{
                        changeStringValue(e);
                        setValidated(true);
                    }} >
                    <option value="">선택하세요</option>
                    <option>이론</option>
                    <option>실습</option>
                    <option>시험</option>
                </Form.Select>
                <div className="invalid-feedback">필수 입력사항입니다</div>
            </Col>
        </Row>
        <Row className="mt-4">
            <Form.Label sm={3}>
                <span>강의시간</span>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" inputMode="numeric"
                    name="lectureDuration" className={result.lectureDuration}
                    value={lecture.lectureDuration} onChange={changeNumericValue}
                    onBlur={checkLectureDuration} />
                <div className="invalid-feedback">30시간 단위로 작성해주세요(최대300시간)</div>
            </Col>
        </Row>
        <Row className="mt-4">
            <Form.Label sm={3}>
                <span>강의료</span>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" inputMode="numeric"
                    name="lecturePrice" className={result.lecturePrice}
                    value={lecture.lecturePrice} onChange={changeNumericValue}
                    onBlur={checkLecturePrice} />
                <div className="invalid-feedback">0원 이상 10억 이하로 작성해주세요</div>
            </Col>
        </Row>
        <Row className="mt-4">
            <Form.Label sm={9}>
                <span>강의형태</span>
            </Form.Label>
            <Col sm={9}>
                <Form.Select name="lectureType" className={validated ? result.lectureType : ""}
                    value={lecture.lectureType} onChange={e=>{
                        changeStringValue(e);
                        setValidated(true);
                    }} >
                    <option value="">선택하세요</option>
                    <option>온라인</option>
                    <option>오프라인</option>
                    <option>혼합</option>
                </Form.Select>
                <div className="invalid-feedback">필수 입력사항입니다.</div>
            </Col>
        </Row>
        <Row className="mt-5">
            <Col>
                <Button as={Link} to={"/lecture/list"} variant="secondary">
                    <FaList className="me-2" />
                    목록으로</Button>
                <Button as={Link} to={`/lecture/detail/${lectureNo}`}
                    className="ms-2" variant="danger">
                    <FaXmark className="me-2" />
                    취소하기</Button>
                <Button type="button" variant="success"
                    className="ms-2" disabled={valid === false}
                    onClick={send} ><FaSquarePen className="me-2" />수정하기</Button>

                
            </Col>
        </Row>
    </>)
}
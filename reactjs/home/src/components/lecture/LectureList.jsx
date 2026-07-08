import { useCallback, useEffect, useState } from "react";
import { FaArrowDown, FaPlus } from "react-icons/fa";
import { ClimbingBoxLoader } from "react-spinners";
import axios from "axios";
import Jumbodtron from "@templates/Jumbotron";
import { Col, Row, Form, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function LectureList() {
    const [lectureList, SetLectureList] = useState([]);
    const [last, setLast] = useState(false);
    const [size, setSize] = useState(10);
    const [loading, setLoading] = useState(false);
    useEffect(() => {

        loadMoreList();
    }, []);
    const loadMoreList = useCallback(async () => {
        setLoading(true);
        const dataSize = lectureList.length;
        const lastLectureNo = dataSize === 0 ? 0 : lectureList[dataSize - 1].lectureNo;

        const response = await axios.get(`/api/lecture/listForReact`,{
            params: {
                lastLectureNo: lastLectureNo,
                size: size
            }
        })
        
        SetLectureList([...lectureList, ...response.data.list]);
        setLast(response.data.last);
        setLoading(false);
    }, [lectureList, size]);

    return (
        <>
            <Row className="mt-4">
                <Col xs={6}>
                    <Form.Select className="w-auto" value={size} onChange={e => setSize(parseInt(e.target.value))}>
                        <option value="5">5개씩</option>
                        <option value="10">10개씩</option>
                        <option value="20">20개씩</option>
                        <option value="50">50개씩</option>
                    </Form.Select>
                </Col>
                <Col xs={6} className="text-end">
                    <Button as={Link} to="/lecture/add" variant="success">
                        <FaPlus />
                        <span className="ms-2">신규등록</span>
                    </Button>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Table responsive hover striped className="text-nowrap">
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
                            {lectureList.map((lecture) => (
                                <tr key={lecture.lectureNo}>
                                    <td>
                                        <Link to={`/lecture/detail/${lecture.lectureNo}`}>
                                            {lecture.lectureTitle}
                                        </Link>
                                    </td>
                                    <td>{lecture.lectureCategory}</td>
                                    <td>{lecture.lectureDuration}</td>
                                    <td>{lecture.lecturePrice.toLocaleString()}KRW</td>
                                    <td>{lecture.lectureType}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            {/* 더보기 버튼 */}
            {last === false && (
                <Row className="mt-4">
                    <Col>
                        <Button variant="outline-success" size="lg" className="w-100"
                            onClick={loadMoreList}>
                            <FaArrowDown />
                            <span className="mx-2">더보기</span>
                            <FaArrowDown />
                        </Button>
                    </Col>
                </Row>
            )}
            {loading === true && (
                <div className="position-fixed top-0 
                start-0 w-100 h-100 bg-dark bg-opacity-25 
                d-flex justify-content-center align-items-center">
                    <div className="d-flex flex-column text-center">
                        <ClimbingBoxLoader loading={loading} />
                        <p className="mt-2">등록중</p>
                    </div>
                </div>
            )}
        </>
    )
}
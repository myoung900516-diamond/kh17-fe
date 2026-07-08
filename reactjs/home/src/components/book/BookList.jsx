import { FaArrowDown, FaPlus } from "react-icons/fa";
import { ClimbingBoxLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Jumbotron from "@templates/Jumbotron";
import { Col, Row, Form, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function BookList() {
    const [bookList, SetBookList] = useState([]);
    const [last, setLast] = useState(false);
    const [size, setSize] = useState(10);
    const [loading, setLoading] = useState(false);
    useEffect(() => {

        loadMoreList();
    }, []);
    const loadMoreList = useCallback(async () => {
        setLoading(true);
        const dataSize = bookList.length;
        const lastBookId = dataSize === 0 ? 0 : bookList[dataSize - 1].bookId;

        
        const response = await axios.post(
            "/api/book/list-more", {lastNo : lastBookId, size : size}
        )
        
        SetBookList([...bookList, ...response.data.list]);
        setLast(response.data.last);
        setLoading(false);
    }, [bookList, size]);
    return (
        <>
            <Jumbotron title="도서 목록" content="등록된 도서 목록을 확인할 수 있습니다"/>
            <Row className="mt-4">
                <Col xs={6}>
                    <Form.Select className="w-auto" value={size}
                        onChange={e => setSize(parseInt(e.target.value))}>
                        <option value="5">5개씩</option>
                        <option value="10">10개씩</option>
                        <option value="20">20개씩</option>
                        <option value="50">50개씩</option>
                    </Form.Select>
                </Col>
                <Col xs={6} className="text-end">
                    <Button as={Link} to="/book/add" variant="success">
                        <FaPlus />
                        <span className="ms-2">신규등록</span>
                    </Button>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Table responsive striped hover className="text-nowrap">
                        <thead>
                            <tr>
                                <th>도서제목</th>
                                <th>지은이</th>
                                <th>출판일</th>
                                <th>출판사</th>
                                <th>도서가격</th>
                                <th>페이지수</th>
                                <th>장르</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookList.map(book => (
                                <tr key={book.bookId}>
                                    <td>
                                        <Link to={`/book/detail/${book.bookId}`}>
                                            {book.bookTitle}
                                        </Link>
                                    </td>
                                    <td>{book.bookAuthor}</td>
                                    <td>{book.bookPublicationDate}</td>
                                    <td>{book.bookPublisher}</td>
                                    <td>{book.bookPrice.toLocaleString()}KRW</td>
                                    <td>{book.bookPageCount}</td>
                                    <td>{book.bookGenre}</td>
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
                        <Button variant="outline-success" className="w-100" size="lg"
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
import { Link, Navigate, useLinkClickHandler, useNavigate, useParams } from "react-router-dom";
import Jumbotron from "@templates/Jumbotron";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Row, Form } from "react-bootstrap";
import { FaList, FaTrash, FaPenToSquare, FaSquarePen, FaCheck, FaXmark } from "react-icons/fa6";
import Swal from "sweetalert2";
import { toast } from "react-toastify";


export default function BookDetail() {
    //Route에 선언된 파라미터 변수를 읽으려면 useParams()를 사용해야 한다.
    //<Route path="/country/detail/:countryNo">로 써있으면 구조분해할당으로 추출이 가능
    const { bookId } = useParams();

    //만약 countryNo가 원치 않는 값(ex:숫자가 아닌 경우)을 가지면 다른 화면을 반환시켜야 한다
    //스프링에서는 redirect라고 불렀는데... React에서는 어떻게 처리하느냐? 
    //useNavigate()와 이용해서 처리가 가능한가? (불가능)
    //-> 이런상황을 대비해서 화면이면서 이동이 가능한 태그를 제공 : <Navigate>
    if (/^[0-9]+$/.test(bookId) === false) {
        return <Navigate to="/book/list" replace />;
    }

    const navigate = useNavigate(() => { }, []);

    //countryNo가 정상적인 숫자인 경우의 처리내용 작성
    const [book, setBook] = useState(null);

    useEffect(() => {
        loadData();
    }, []);
    const loadData = useCallback(async () => {
        const response = await axios.get(`/api/book/${bookId}`);
        setBook(response.data);
    }, []);
    const deleteBook = useCallback(async () => {
        const result = await Swal.fire({
            title: "sure?",
            text: "no back again",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "delete",
            cancelButtonText: "candel"
        })
        if (result.isConfirmed === false) return;
        const response = await axios.delete(`/api/book/${bookId}`)
        toast.success("done");
        navigate("/book/list");
    }, [book, navigate]);

    const [backup, setBackup] = useState(null);
    const [editMode, setEditMode] = useState({
        bookTitle : false,
        bookAuthor : false,
        bookPublicationDate : false,
        bookPrice : false,
        bookPublisher : false,
        bookPageCount : false,
        bookGenre : false
    });
    const changeStringValue = useCallback(e=>{
        const {name, value} = e.target;
        setBook({
            ...book,
            [name]:value
        });
    }, [book]);
    const changeNumericValue = useCallback(e=>{
        const {name, value} = e.target;
        const regex = /[^0-9]+/g;
        const replacement = value.replace(regex, "");
        const number = parseInt(replacement || 0);
        setBook({
            ...book,
            [name]:number
        });
    }, [book]);
    const updateBook = useCallback(async (field)=>{
        const response = await axios.patch(
            `/api/book/${bookId}` , 
            { [field] : book[field]}
        );
        setBackup({...backup, [field]:book[field]});
        setEditMode({...editMode, [field]:false});
        toast.success("정보가 변경되었습니다");
    }, [book, backup]);

    const cancelUpdate = useCallback((field)=>{
        setBook({...book, [field] : backup[field]});
        setEditMode({...editMode, [field]: false});
        toast.error("취소 되었습니다")
    },[book, backup, editMode]);
    const startUpdate = useCallback((field)=>{
        setEditMode({...editMode, [field] : true})
    }, [editMode]);
    return (<>
        <Jumbotron title="도서 상세 정보" content={`${bookId}번 도서의 상세 정보 화면입니다.`} />
        {/* 상태를 나누어서 출력 */}
        {book === null ? (
            <h1>로딩중입니다...</h1>
        ) : (
            <>
                <Row className="mt-4 fs-2">
                    <Col sm={3} className="text-info fw-bold">
                        도서명
                    </Col>
                    <Col sm={9}>
                    {editMode.bookTitle !== true ? (<>
                            <span>{book.bookTitle}</span>
                            <FaSquarePen className="text-warning ms-2" 
                            onClickCapture={e=>startUpdate("bookTitle")}/>
                        </>) : (<>
                            <Form.Control type="text" className="w-auto d-inline-block" 
                            name="bookTitle" value={book.bookTitle} 
                            onChange={changeStringValue}/>
                            <FaCheck className="text-success ms-2" 
                            onClick={e=>updateBook("bookTitle")}/>
                            <FaXmark className="test-danger ms-2" 
                            onClick={e=>cancelUpdate("bookTitle")}/>
                        </>)}
                    </Col>
                </Row>

                <Row className="mt-4 fs-2">
                    <Col sm={3} className="text-info fw-bold">
                        지은이
                    </Col>
                    <Col sm={9}>
                        {editMode.bookAuthor !== true ? (<>
                            <span>{book.bookAuthor}</span>
                            <FaSquarePen className="text-warning ms-2" 
                            onClickCapture={e=>startUpdate("bookAuthor")}/>
                        </>) : (<>
                            <Form.Control type="text" className="w-auto d-inline-block" 
                            name="bookAuthor" value={book.bookAuthor} 
                            onChange={changeStringValue}/>
                            <FaCheck className="text-success ms-2" 
                            onClick={e=>updateBook("bookAuthor")}/>
                            <FaXmark className="test-danger ms-2" 
                            onClick={e=>cancelUpdate("bookAuthor")}/>
                        </>)}
                    </Col>
                </Row>
                <Row className="mt-4 fs-2">
                    <Col sm={3} className="text-info fw-bold">
                        출판사
                    </Col>
                    <Col sm={9}>
                        {editMode.bookPublisher !== true ? (<>
                            <span>{book.bookPublisher}</span>
                            <FaSquarePen className="text-warning ms-2" 
                            onClickCapture={e=>startUpdate("bookPublisher")}/>
                        </>) : (<>
                            <Form.Control type="text" className="w-auto d-inline-block" 
                            name="bookPublisher" value={book.bookPublisher} 
                            onChange={changeStringValue}/>
                            <FaCheck className="text-success ms-2" 
                            onClick={e=>updateBook("bookPublisher")}/>
                            <FaXmark className="test-danger ms-2" 
                            onClick={e=>cancelUpdate("bookPublisher")}/>
                        </>)}
                    </Col>
                </Row>
                <Row className="mt-4 fs-2">
                    <Col sm={3} className="text-info fw-bold">
                        출판일
                    </Col>
                    <Col sm={9}>
                        {editMode.bookPublicationDate !== true ? (<>
                            <span>{book.bookPublicationDate}</span>
                            <FaSquarePen className="text-warning ms-2" 
                            onClickCapture={e=>startUpdate("bookPublicationDate")}/>
                        </>) : (<>
                            <Form.Control type="date" className="w-auto d-inline-block" 
                            name="bookPublicationDate" value={book.bookPublicationDate} 
                            onChange={changeStringValue}/>
                            <FaCheck className="text-success ms-2" 
                            onClick={e=>updateBook("bookPublicationDate")}/>
                            <FaXmark className="test-danger ms-2" 
                            onClick={e=>cancelUpdate("bookPublicationDate")}/>
                        </>)}
                    </Col>
                </Row>
                <Row className="mt-4 fs-2">
                    <Col sm={3} className="text-info fw-bold">
                        도서가격
                    </Col>
                    <Col sm={9}>
                        {editMode.bookPrice !== true ? (<>
                            <span>{book.bookPrice.toLocaleString()}원</span>
                            <FaSquarePen className="text-warning ms-2" 
                            onClickCapture={e=>startUpdate("bookPrice")}/>
                        </>) : (<>
                            <Form.Control type="text" className="w-auto d-inline-block" 
                            name="bookPrice" value={book.bookPrice.toLocaleString()} 
                            onChange={changeNumericValue}/>
                            <FaCheck className="text-success ms-2" 
                            onClick={e=>updateBook("bookPrice")}/>
                            <FaXmark className="test-danger ms-2" 
                            onClick={e=>cancelUpdate("bookPrice")}/>
                        </>)}
                    </Col>
                </Row>
                <Row className="mt-4 fs-2">
                    <Col sm={3} className="text-info fw-bold">
                        페이지수
                    </Col>
                    <Col sm={9}>
                        {editMode.bookPageCount !== true ? (<>
                            <span>{book.bookPageCount}</span>
                            <FaSquarePen className="text-warning ms-2" 
                            onClickCapture={e=>startUpdate("bookPageCount")}/>
                        </>) : (<>
                            <Form.Control type="text" className="w-auto d-inline-block" 
                            name="bookPrice" value={book.bookPageCount} 
                            onChange={changeNumericValue}/>
                            <FaCheck className="text-success ms-2" 
                            onClick={e=>updateBook("bookPageCount")}/>
                            <FaXmark className="test-danger ms-2" 
                            onClick={e=>cancelUpdate("bookPageCount")}/>
                        </>)}
                    </Col>
                </Row>
                <Row className="mt-4 fs-2">
                    <Col sm={3} className="text-info fw-bold">
                        장르
                    </Col>
                    <Col sm={9}>
                        {editMode.bookGenre !== true ? (<>
                            <span>{book.bookGenre}</span>
                            <FaSquarePen className="text-warning ms-2" 
                            onClickCapture={e=>startUpdate("bookGenre")}/>
                        </>) : (<>
                            <Form.Select type="date" className="w-auto d-inline-block" 
                            name="bookGenre" value={book.bookGenre} 
                            onChange={changeStringValue}>
                                <option>판타지</option>
                                <option>교양</option>
                                <option>소설</option>
                                <option>역사</option>
                                <option>교양</option>
                                <option>추리소설</option>
                                <option>자기계발</option>
                            </Form.Select>
                            <FaCheck className="text-success ms-2" 
                            onClick={e=>updateBook("bookGenre")}/>
                            <FaXmark className="test-danger ms-2" 
                            onClick={e=>cancelUpdate("bookGenre")}/>
                        </>)}
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col sm={3} className="text-end">
                        <Button as={Link} to="/book/list" className="ms-2" variant="secondary">
                            <FaList />
                            <span>목록으로</span></Button>
                        <Button as={Link} to={`/book/edit/${bookId}`} className="ms-2" variant="warning">
                            <FaPenToSquare />
                            <span>수정하기</span></Button>
                        <Button className="ms-2" variant="danger" onClick={deleteBook}>
                            <FaTrash />
                            <span>삭제하기</span></Button>
                    </Col>
                </Row>
            </>
        )}
    </>)
}
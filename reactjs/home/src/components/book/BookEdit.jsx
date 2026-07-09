import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { FaAsterisk, FaList, FaPlus, FaSquarePen, FaXmark } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import Jumbotron from "@templates/Jumbotron";
import { toast } from "react-toastify";
import { ClimbingBoxLoader } from "react-spinners";
import Swal from "sweetalert2";



export default function BookEdit(){
    const { bookId } = useParams();

    if (/^[0-9]+$/.test(bookId) === false) {
        return <Navigate to="/book/list" replace />;
    }

    const navigate = useNavigate();

    const [book, setBook] = useState({
        bookTitle : "",
        bookAuthor : "",
        bookPublicationDate : "",
        bookPrice : 0,
        bookPublisher : "",
        bookPageCount : 0,
        bookGenre : "",
        bookCover : ""
    });
    useEffect(() => {
        loadData();
    }, []);
    const loadData = useCallback(async ()=>{
        const response = await axios.get(`/api/book/${bookId}`)
        setBook(response.data);
    }, []);

    const [result, setResult] = useState({
        bookTitle : "",
        bookAuthor : "",
        bookPublicationDate : "",
        bookPrice : "",
        bookPublisher : "is-valid",
        bookPageCount : "",
        bookGenre : "",
        bookCover : ""
    });
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const valid = useMemo(()=>{
        if(result.bookTitle !== "is-valid") return false;
        if(result.bookAuthor !== "is-valid") return false;
        if(result.bookPublicationDate !== "is-valid") return false;
        if(result.bookPrice !== "is-valid") return false;
        if(result.bookPageCount !== "is-valid") return false;
        if(result.bookGenre !== "is-valid") return false;
        if(result.bookCover !== "is-valid") return false;
        return true;
    }, [result]);

    const changeStringValue = useCallback(e=>{
        const {name, value} = e.target;

        setBook({
            ...book,
            [name] : value
        });
    }, [book]);
    const changeNumericValue = useCallback(e=>{
        const {name, value} = e.target;
        const regex = /[^0-9]+/g;
        const replacement = value.replace(regex, "");
        const result = parseInt(replacement || 0);

        setBook({
            ...book,
            [name] : result
        });
    }, [book]);
    
    const checkBookTitle = useCallback(()=>{
        const valid = book.bookTitle.length > 0 && book.bookTitle.length <= 300;

        setResult({
            ...result, 
            bookTitle : valid ? "is-valid" : "is-invalid"
        });
    }, [book.bookTitle, result]);
    const checkBookAuthor = useCallback(()=>{
        const regex = /^[^!@#$]+$/;
        const valid = regex.test(book.bookAuthor);

        setResult({
            ...result,
            bookAuthor : valid? "is-valid": "is-invalid"
        });
    }, [book.bookAuthor, result]);
    const checkBookPublicationDate = useCallback(()=>{
        const regex = /^([0-9]{4})-(((02)-(0[1-9]|1[0-9]|2[0-9]))|((0[469]|11)-(0[1-9]|1[0-9]|2[0-9]|30))|((0[13578]|1[02])-(0[1-9]|1[0-9]|2[0-9]|3[01])))$/;
        const valid = regex.test(book.bookPublicationDate);

        setResult({
            ...result,
            bookPublicationDate : valid ? "is-valid" : "is-invalid"
        });
    }, [book.bookPublicationDate, result]);
    const checkBookPrice = useCallback(()=>{
        const valid = book.bookPrice >= 0 && book.bookPrice <= 1000000000;
        setResult({
            ...result,
            bookPrice : valid ? "is-valid" : "is-invalid"
        });
    }, [book.bookPrice, result]);
    const checkBookPageCount = useCallback(()=>{
        const valid = book.bookPageCount > 0;
        setResult({
            ...result,
            bookPageCount : valid ? "is-valid" : "is-invalid"
        });
    }, [book.bookPageCount, result]);
    const checkBookGenre = useCallback(()=>{
        const valid = ['판타지', '교양', '소설', '역사', '과학', '추리소설', '자기계발']
            .includes(book.bookGenre);
        setResult({
            ...result,
            bookGenre : valid ? "is-valid" : "is-invalid"
        });
    }, [book.bookGenre, result]);
    const checkBookCover = useCallback(()=>{
        const valid = book.bookCover !== 0;
        setResult({
            ...result,
            bookCover : valid ? "is-valid" : "is-invalid"
        });
    }, [book.bookCover, result]);

    const send = useCallback(async()=>{
        //로딩 상태로 변경
        setLoading(true);
        const response = await axios.put(`/api/book/${bookId}`, book);
        toast.success("도서 수정이 완료되었습니다");
        navigate("/book/list");
        setLoading(false);
    }, [book]);
    
    
    useEffect(()=>{
        if(book.bookGenre === "" && result.bookGenre === "") return;

        checkBookGenre();
    }, [book.bookGenre, result.bookGenre]);
    
    return(<>
    <Jumbotron title="도서등록" content="새로운 도서를 등록할 수 있습니다"/>

        <Row className="mt-5">
            <Form.Label sm={3}>
                <span>도서명<FaAsterisk className="text-danger"/>
                </span>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="bookTitle" autoComplete="off"
                className={result.bookTitle} value={book.bookTitle}
                onChange={changeStringValue} onBlur={checkBookTitle}/>
                <div className="valid-feedback"></div>
                <div className="invalid-feedback"></div>
            </Col>
        </Row>
        <Row className="mt-5">
            <Form.Label sm={3}>
                <span>
                    지은이
                </span>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="bookAuthor" 
                className={result.bookAuthor} value={book.bookAuthor}
                onChange={changeStringValue} onBlur={checkBookAuthor}/>
                <div className="valid-feedback"></div>
                <div className="invalid-feedback"></div>
            </Col>
        </Row>
        <Row className="mt-5">
            <Form.Label sm={3}>
                <span>출간일</span>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="date" name="bookPublicationDate" 
                className={result.bookPublicationDate} value={book.bookPublicationDate} 
                onChange={changeStringValue} onBlur={checkBookPublicationDate}/>
                <div className="valid-feedback"></div>
                <div className="invalid-feedback"></div>
            </Col>
        </Row>
        <Row className="mt-5">
            <Form.Label sm={3}>
                <span>도서가격</span>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" inputMode="numeric" name="bookPrice" 
                className={result.bookPrice} onChange={changeNumericValue} 
                onBlur={checkBookPrice} value={book.bookPrice.toLocaleString()}/>
                <div className="valid-feedback"></div>
                <div className="invalid-feedback"></div>
            </Col>
        </Row>
        <Row className="mt-5">
            <Form.Label sm={3}>
                <span>출판사</span>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="bookPublisher" 
                className={result.bookPublisher} value={book.bookPublisher} 
                onChange={changeStringValue}/>
            </Col>
        </Row>
        <Row className="mt-5">
            <Form.Label sm={3}>
                <span>페이지수</span>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="bookPageCount" 
                className={result.bookPageCount} value={book.bookPageCount}
                onChange={changeStringValue} onBlur={checkBookPageCount}/>
                <div className="valid-feedback"></div>
                <div className="invalid-feedback"></div>
            </Col>
        </Row>
        <Row className="mt-5">
            <Form.Label sm={3}>
                <span>장르</span>
            </Form.Label>
            <Col sm={9}>
                <Form.Select name="bookGenre" onChange={e=>{
                    changeStringValue(e);
                    setValidated(true);
                }} value={book.bookGenre}
                className={validated ? result.bookGenre : ""}>
                    <option value="">선택하세요</option>
                    <option>판타지</option>
                    <option>교양</option>
                    <option>교양</option>
                    <option>소설</option>
                    <option>역사</option>
                    <option>교양</option>
                    <option>추리소설</option>
                    <option>자기계발</option>
                </Form.Select>
                <div className="invalid-feedback">필수 선택사항입니다</div>
            </Col>
        </Row>
        <Row className="mt-5">
            <Form.Label sm={3}>
                <span>표지</span>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="file" name="bookCover" 
                className={result.bookCover} 
                accept=".png, .jpg" multiple
                onChange={changeStringValue} onBlur={checkBookCover}/>
                <div className="valid-feedback"></div>
                <div className="invalid-feedback"></div>
            </Col>
        </Row>
        <Row className="mt-5">
            <Col>
            <Button as={Link} to={"/book/list"} variant="secondary">
                <FaList className="me-2"/>
                목록으로</Button>
                <Button as={Link} to={`/book/detail/${bookId}`} 
                className="ms-2" variant="danger">
                <FaXmark className="me-2"/>
                취소하기</Button>
            <Button type="button" variant="success"
            className="ms-2" disabled={valid===false} 
            onClick={send} ><FaSquarePen className="me-2"/>수정하기</Button>
            </Col>
        </Row>
        
        {loading === true && (
            <div className="position-fixed top-0 
                start-0 w-100 h-100 bg-dark bg-opacity-25 
                d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column text-center">
            <ClimbingBoxLoader loading={loading}/>
            <p className="mt-2">수정중</p>
            </div>
            </div>
        )}
    </>)
}
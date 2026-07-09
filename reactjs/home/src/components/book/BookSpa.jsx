import Jumbotron from "@templates/Jumbotron";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Badge, Button, Col, ListGroup, Row, Form, Container } from "react-bootstrap";
import { FaAsterisk, FaChevronDown, FaPen, FaPlus, FaSquarePen, FaTrash, FaXmark } from "react-icons/fa6";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function BookSpa() {
    //모달을 띄우기 위한 state
    const [modal, setModal] = useState(false);

    const closeModal = useCallback(() => {
        resetBook();
        setModal(false);
    }, []);

    //목록
    const [bookList, setBookList] = useState([]);
    const [last, setLast] = useState(false);
    const [size, setSize] = useState(10);
    const lastBookId = useMemo(() => {
        return bookList.length > 0 ? bookList[bookList.length - 1].bookId : 0;
    }, [bookList]);
    const loadList = useCallback(async () => {
        const response = await axios.post(
            "/api/book/list-more",
            { lastNo: lastBookId, size: size }
        );
        setBookList([...bookList, ...response.data.list]);
        setLast(response.data.last);
    }, [lastBookId, size]);
    useEffect(() => {
        loadList();
    }, []);


    //등록
    const [book, setBook] = useState({
        bookTitle: "",
        bookAuthor: "",
        bookPublisher: "",
        bookPublicationDate: "",
        bookPrice: 0,
        bookPageCount: 0,
        bookGenre: ""
    }); const [result, setResult] = useState({
        bookTitle: null,
        bookAuthor: null,
        bookPublisher: null,
        bookPublicationDate: null,
        bookPrice: null,
        bookPageCount: null,
        bookGenre: null
    });
    const changeStringValue = useCallback(e => {
        const { name, value } = e.target; //구조분해할당
        //const name = e.target.name;
        //const value = e.target.value;
        setBook({
            ...book,
            [name]: value
        });
    }, [book]);
    const changeNumericValue = useCallback(e => {
        const { name, value } = e.target;
        const replacement = value.replace(/[^0-9]+/g, "");
        const number = parseInt(replacement || 0);
        setBook({ ...book, [name]: number });

    }, [book]);
    const checkBookTitle = useCallback(() => {
        const valid = book.bookTitle.length > 0 && book.bookTitle.length <= 300;

        // setResult({
        //     ...result,
        //     bookTitle: valid ? "is-valid" : "is-invalid"
        // });
        setResult(prev => ({
            ...prev,
            bookTitle: valid ? "is-valid" : "is-invalid"
        }));
    }, [book.bookTitle, result]);
    const checkBookAuthor = useCallback(() => {
        const regex = /^[^!@#$]+$/;
        const valid = book.bookAuthor?.length === 0 || regex.test(book.bookAuthor);
        // const valid = !book.bookAuthor || regex.test(book.bookAuthor);

        // setResult({
        //     ...result,
        //     bookAuthor: valid ? "is-valid" : "is-invalid"
        // });
        setResult(prev => ({
            ...prev,
            bookAuthor: valid ? "is-valid" : "is-invalid"
        }));
    }, [book.bookAuthor, result]);
    const checkBookPublicationDate = useCallback(() => {
        const regex = /^([0-9]{4})-(((02)-(0[1-9]|1[0-9]|2[0-9]))|((0[469]|11)-(0[1-9]|1[0-9]|2[0-9]|30))|((0[13578]|1[02])-(0[1-9]|1[0-9]|2[0-9]|3[01])))$/;
        const valid = book.bookPublicationDate?.length == 0 || regex.test(book.bookPublicationDate);
        // const valid = !book.bookPublicationDate || regex.test(book.bookPublicationDate);

        setResult(prev => ({
            ...prev,
            bookPublicationDate: valid ? "is-valid" : "is-invalid"
        }));
    }, [book.bookPublicationDate, result]);
    const checkBookPublisher = useCallback(() => {
        setResult(prev => ({
            ...prev,
            bookPublisher: "is-valid"
        }));
    }, [book, result]);
    const checkBookPrice = useCallback(() => {
        const valid = book.bookPrice >= 0 && book.bookPrice <= 1000000000;
        setResult(prev => ({
            ...prev,
            bookPrice: valid ? "is-valid" : "is-invalid"
        }));
    }, [book.bookPrice, result]);
    const checkBookPageCount = useCallback(() => {
        const valid = book.bookPageCount > 0;
        setResult(prev => ({
            ...prev,
            bookPageCount: valid ? "is-valid" : "is-invalid"
        }));
    }, [book.bookPageCount, result]);
    const checkBookGenre = useCallback(() => {
        const valid = ['판타지', '교양', '소설', '역사', '과학', '추리소설', '자기계발']
            .includes(book.bookGenre);
        setResult(prev => ({
            ...prev,
            bookGenre: valid ? "is-valid" : "is-invalid"
        }));
    }, [book.bookGenre, result]);


    const allValid = useMemo(() => {
        if (result.bookTitle !== "is-valid") return false;
        if (result.bookAuthor === "is-invalid") return false;
        if (result.bookPublisher === "is-invalid") return false;
        if (result.bookPublicationDate === "is-invalid") return false;
        if (result.bookPrice !== "is-valid") return false;
        if (result.bookPageCount !== "is-valid") return false;
        if (result.bookGenre !== "is-valid") return false;
        return true;
    }, [result]);

    const resetBook = useCallback(() => {
        setBook({
            bookTitle: "",
            bookAuthor: "",
            bookPublisher: "",
            bookPublicationDate: "",
            bookPrice: 0,
            bookPageCount: 0,
            bookGenre: ""
        })
        setResult({
            bookTitle: null,
            bookAuthor: null,
            bookPublisher: null,
            bookPublicationDate: null,
            bookPrice: null,
            bookPageCount: null,
            bookGenre: null
        })
    }, []);
    useEffect(() => {
        if (book.bookGenre === "" && result.bookGenre === null) return;

        checkBookGenre();
    }, [book.bookGenre, result.bookGenre]);

    const save = useCallback(async () => {
        const response = await axios.post("/api/book/", book);
        toast.success("신규 도서가 등록되었습니다.");

        closeModal();

        //목록 갱신을 어떻게 할 것인가? 
        //1. 연관 항목으로 설정되어 있어 기존 값을 알아낼 수 있음 
        // setBookList([response.data, ...bookList]);

        setBookList(prev => ([response.data, ...prev]));
    }, [book, /* bookList */]);
    const edit = useCallback(async () => {
        const response = await axios.put(`/api/book/${book.bookId}`, book);
        toast.success(`${book.bookId}번 도서 정보 변경완료`);
        closeModal();

        setBookList(prev => prev.map(
            book => {
                if (book.bookId === response.data.bookId) {
                    return { ...response.data };
                }
                return { ...book };
            }
        ));
    }, [book]);

    //만약 개별항목별로 수정이 가능하게 하려면 목록과 똑같은 상태배열이 있거나, 목록에 상태가 포함되어야 한다
    // const [editMode, setEditMode] = useState([]);
    // useEffect(()=>{
    //     setEditMode(bookList.map(book=>({
    //         bookTitle : false,
    //         bookAuthor : false,
    //         bookPublisher : false,
    //         bookPublicationDate : false,
    //         bookPrice : false,
    //         bookPageCount : false,
    //         bookGenre: false
    //     })
    // ));
    // },[bookList]);

    //수정용으로 모달을 띄우는 함수
    const openModal = useCallback(() => {
        setModal(true);
    }, []);
    const openModalToEdit = useCallback(target => {
        // setBook(target);//얕은복사 shallow copy
        setBook({ ...target });//깊은복사 deep copy
        openModal();
    }, []);

    const isAddMode = useMemo(() => {
        return book.bookId === undefined;
    }, [book]);
    useEffect(() => {
        if (isAddMode === true) return;
        checkBookTitle();
        checkBookAuthor();
        checkBookPublisher();
        checkBookPublicationDate();
        checkBookPrice();
        checkBookPageCount();
        checkBookGenre();
    }, [isAddMode]);

    //도서 삭제 함수
    const deleteBook = useCallback(async(target)=>{
        const result = await Swal.fire({
            title : "해당 도서를 삭제하시겠습니까?",
            text : "삭제한 도서는 다시 복구할 수 없습니다.",
            icon : "warning",
            confirmButtonText : "Yes",
            showCancelButton : true,
            cancelButtonText:"No"

        });
        if(result.isConfirmed === false) return;
        const response = await axios.delete(`/api/book/${target.bookId}`);
        setBookList(prev=>prev.filter(
            book=> book.bookId !== target.bookId
        ))
        toast.success("도서 삭제가 완료되었습니다. ")
    },[]);
    return (<>
        <Jumbotron title="도서 CRUD 통합 구현" content="한 페이지에서 CRUD를 모두 처리해봅니다" />

        {/* 등록을 위한 모달을 띄우는 버튼 */}
        <Row className="mt-4">
            <Col className="text-end">
                <Button variant="success" onClick={openModal}>
                    <FaPlus />
                    <span>신규 등록</span>
                </Button>
            </Col>
        </Row>

        {/* 목록 */}
        <Row className="mt-4">
            <Col>
                <ListGroup>
                    {bookList.map(book => (
                        <ListGroup.Item key={book.bookId}>
                            <div className="p-4">
                                <h2 className="d-flex align-items-end">
                                    <Badge>{book.bookId}</Badge>
                                    <span className="ms-2">{book.bookTitle}</span>

                                    <small className="text-muted ms-4 fs-5">{book.bookGenre}</small>
                                </h2>
                                <hr />
                                <p className="text-muted">
                                    <span>{book.bookAuthor || "작자 미상"}</span>
                                    <span className="ms-4">{book.bookPublisher}</span>
                                </p>
                                <p className="mt-2">설명 테스트 테스트</p>
                                <hr />
                                <p className="text-info">
                                    <span className="me-4">{book.bookPrice.toLocaleString()}원</span>
                                    <span className="me-4">{book.bookPageCount.toLocaleString()}p</span>
                                    {book.bookPublicationDate && (
                                        <span>{book.bookPublicationDate}출간</span>
                                    )}
                                </p>
                                {/* 수정 삭제 패널 */}
                                <div className="text-end">
                                    <FaSquarePen className="text-warning" size={40}
                                        onClick={e => openModalToEdit(book)} />
                                    <FaTrash className="text-danger ms-4" size={36}
                                        onClick={e => deleteBook(book)} />
                                </div>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                {/* 더보기 */}
                {last !== true && (
                    <Button variant="outline-info" className="w-100" onClick={loadList}>
                        <FaChevronDown />
                        <span className="mx-2">더보기</span>
                        <FaChevronDown />
                    </Button>
                )}
            </Col>
        </Row>

        {/* 모달 */}
        <Modal
            show={modal}
            onHide={closeModal}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{isAddMode ? "신규 도서 등록" : `${book.bookId}번 도서 정보 수정`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid>
                    <Row className="mt-4">
                        <Form.Label column sm={3}>
                            <span>도서명</span>
                            <FaAsterisk className="text-danger" />
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control type="text" name="bookTitle" value={book.bookTitle}
                                onChange={changeStringValue} onBlur={checkBookTitle}
                                placeholder="e.g., 어린왕자"
                                className={result.bookTitle} />
                            <div className="valid-feedback">도서명이 설정되었습니다</div>
                            <div className="invalid-feedback">필수 작성항목입니다.</div>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Form.Label column sm={3}>지은이</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="text" name="bookAuthor" value={book.bookAuthor}
                                onChange={changeStringValue} onBlur={checkBookAuthor}
                                placeholder="e.g., 생택쥐베리"
                                className={result.bookAuthor} />
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Form.Label column sm={3}>출판사</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="text" name="bookPublisher" value={book.bookPublisher}
                                onChange={changeStringValue} onBlur={checkBookPublisher}
                                placeholder="e.g., 열린책들"
                                className={result.bookPublisher} />
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Form.Label column sm={3}>출간일</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="date" name="bookPublicationDate" value={book.bookPublicationDate}
                                onChange={changeStringValue} onBlur={checkBookPublicationDate}
                                className={result.bookPublicationDate} />
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Form.Label column sm={3}>
                            <span>판매가</span>
                            <FaAsterisk className="text-danger" />
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control type="text" name="bookPrice" value={book.bookPrice}
                                onChange={changeNumericValue} onBlur={checkBookPrice}
                                inputMode="numeric"
                                placeholder="e.g., 10000" className={result.bookPrice} />
                            <div className="valid-feedback">판매가 설정이 완료되었습니다</div>
                            <div className="invalid-feedback">숫자 형태로 작성하세요</div>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Form.Label column sm={3}>
                            <span>페이지수</span>
                            <FaAsterisk className="text-danger" />
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control type="text" name="bookPageCount" value={book.bookPageCount}
                                onChange={changeNumericValue} onBlur={checkBookPageCount}
                                inputMode="numeric"
                                placeholder="e.g., 100" className={result.bookPageCount} />
                            <div className="valid-feedback">페이지수 설정이 완료되었습니다</div>
                            <div className="invalid-feedback">숫자 형태로 작성하세요</div>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Form.Label column sm={3}>
                            <span>장르</span>
                            <FaAsterisk className="text-danger" />
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Select type="text" name="bookGenre" value={book.bookGenre}
                                onChange={changeStringValue} className={result.bookGenre}>
                                <option value="">선택하세요</option>
                                <option>판타지</option>
                                <option>교양</option>
                                <option>소설</option>
                                <option>역사</option>
                                <option>교양</option>
                                <option>추리소설</option>
                                <option>자기계발</option>
                            </Form.Select>
                            <div className="invalid-feedback">필수 선택 항목입니다</div>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    <FaXmark />
                    <span>취소하기</span>
                </Button>
                {isAddMode ? (
                    <Button variant="success" disabled={allValid === false}
                        onClick={save}>
                        <FaPlus />
                        <span>등록하기</span>
                    </Button>
                ) : (
                    <Button variant="warning" disabled={allValid === false}
                        onClick={edit}>
                        <FaPlus />
                        <span>수정하기</span>
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    </>)
}
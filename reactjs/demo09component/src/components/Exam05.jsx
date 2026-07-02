import { useCallback, useEffect, useMemo, useState } from "react";
import Jumbodtron from "./Jumbodtron";
import axios from "axios";
import Swal from "sweetalert2";


export default function Exam05(){
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
        const regex = /[^0-9]/g;
        const replacement = value.replace(regex, "");
        const result = parseInt(replacement);

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

    const send = useCallback(()=>{
        axios({
            url : "http://localhost:8080/api/book/insert",
            method : "post",
            data : book,

        })
        .then(
            response=>{
                Swal.fire({
                title: 'Success!',
                text: '도서등록이 완료되었습니다.',
                icon: 'success',
                confirmButtonText: '확인'
                });

                setBook({
                    bookTitle : "",
                    bookAuthor : "",
                    bookPublicationDate : "",
                    bookPrice : 0,
                    bookPublisher : "",
                    bookPageCount : 0,
                    bookGenre : "",
                    bookCover : ""
                })
                setResult({
                    bookTitle : "",
                    bookAuthor : "",
                    bookPublicationDate : "",
                    bookPrice : "",
                    bookPublisher : "is-valid",
                    bookPageCount : "",
                    bookGenre : "",
                    bookCover : ""
                })

            }
        )
    }, [book]);
    
    useEffect(()=>{
        if(book.bookGenre === "" && result.bookGenre === "") return;

        checkBookGenre();
    }, [book.bookGenre, result.bookGenre]);

    return(
        <>
        <Jumbodtron title="도서등록" content="새로운 도서를 등록할 수 있습니다"/>

        <div className="row mt-5">
            <label className="col-sm-3 col-form-label">도서명</label>
            <div className="col-sm-9">
                <input type="text" name="bookTitle" className={`form-control ${result.bookTitle}`} 
                onChange={changeStringValue} onBlur={checkBookTitle}/>
                <div className="valid-feedback"></div>
                <div className="invalid-feedback"></div>
            </div>
        </div>
        <div className="row mt-5">
            <label className="col-sm-3 col-form-label">지은이</label>
            <div className="col-sm-9">
                <input type="text" name="bookAuthor" className={`form-control ${result.bookAuthor}`}
                onChange={changeStringValue} onBlur={checkBookAuthor}/>
                <div className="valid-feedback"></div>
                <div className="invalid-feedback"></div>
            </div>
        </div>
        <div className="row mt-5">
            <label className="col-sm-3 col-form-label">출간일</label>
            <div className="col-sm-9">
                <input type="date" name="bookPublicationDate" className={`form-control ${result.bookPublicationDate}`} 
                onChange={changeStringValue} onBlur={checkBookPublicationDate}/>
                <div className="valid-feedback"></div>
                <div className="invalid-feedback"></div>
            </div>
        </div>
        <div className="row mt-5">
            <label className="col-sm-3 col-form-label">도서가격</label>
            <div className="col-sm-9">
                <input type="text" inputMode="numeric" name="bookPrice" 
                className={`form-control ${result.bookPrice}`} onChange={changeNumericValue} 
                onBlur={checkBookPrice}/>
                <div className="valid-feedback"></div>
                <div className="invalid-feedback"></div>
            </div>
        </div>
        <div className="row mt-5">
            <label className="col-sm-3 col-form-label">출판사</label>
            <div className="col-sm-9">
                <input type="text" name="bookPublisher" className={`form-control ${result.bookPublisher}`} 
                onChange={changeStringValue}/>
                <div className="valid-feedback"></div>
                <div className="invalid-feedback"></div>
            </div>
        </div>
        <div className="row mt-5">
            <label className="col-sm-3 col-form-label">페이지수</label>
            <div className="col-sm-9">
                <input type="text" name="bookPageCount" className={`form-control ${result.bookPageCount}`} 
                onChange={changeStringValue} onBlur={checkBookPageCount}/>
                <div className="valid-feedback"></div>
                <div className="invalid-feedback"></div>
            </div>
        </div>
        <div className="row mt-5">
            <label className="col-sm-3 col-form-label">장르</label>
            <div className="col-sm-9">
                <select name="bookGenre" onChange={changeStringValue} 
                className={`form-select ${result.bookGenre}`}>
                    <option value="">선택하세요</option>
                    <option>판타지</option>
                    <option>교양</option>
                    <option>소설</option>
                    <option>역사</option>
                    <option>교양</option>
                    <option>추리소설</option>
                    <option>자기계발</option>
                </select>
                <div className="valid-feedback"></div>
                <div className="invalid-feedback"></div>
            </div>
        </div>
        <div className="row mt-5">
            <label className="col-sm-3 col-form-label">표지</label>
            <div className="col-sm-9">
                <input type="file" name="bookCover" className={`form-control ${result.bookCover}`} 
                accept=".png, .jpg" multiple
                onChange={changeStringValue} onBlur={checkBookCover}/>
                <div className="valid-feedback"></div>
                <div className="invalid-feedback"></div>
            </div>
        </div>
        <div className="row mt-5">
            <div className="col">
            <button className="btn btn-lg btn-success w-100" disabled={valid===false} 
            onClick={send} >등록하기</button>
            </div>
        </div>
        </>
    );

};


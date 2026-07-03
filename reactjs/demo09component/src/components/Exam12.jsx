import { FaArrowDown } from "react-icons/fa";
import Jumbodtron from "./Jumbodtron";
import { ClimbingBoxLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";


export default function Exam12(){
    const [bookList, SetBookList] = useState([]);
    const [last, setLast] = useState(false);
    const [size, setSize] = useState(10);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        
        loadMoreList();
    }, []);
    const loadMoreList = useCallback(()=>{
        setLoading(true);
        const dataSize = bookList.length;
        const lastBookId = dataSize === 0 ? 0 : bookList[dataSize-1].bookId;

        axios({
            url : "http://localhost:8080/api/book/listForReact",
            method : "get",
            params : {
                lastBookId : lastBookId,
                size : size
            }
        })
        .then(response=>{
            SetBookList([...bookList, ...response.data.list]);
            setLast(response.data.last);
        })
        .finally(()=> setLoading(false));
    }, [bookList, size]);
    return(
        <>
            <Jumbodtron title="도서 목록"/>
            <div className="row mt-4">
            <div className="col">
                <select value={size} onChange={e=>setSize(parseInt(e.target.value))}>
                    <option value="5">5개씩</option>
                    <option value="10">10개씩</option>
                    <option value="20">20개씩</option>
                    <option value="50">50개씩</option>
                </select>
            </div>
        </div>
            <div className="row mt-4">
                <div className="col">
                    <div className="text-nowrap table-reponsive">
                        <table className="table">
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
                                {bookList.map(book=>(
                                    <tr key={book.bookId}>
                                        <td>{book.bookTitle}</td>
                                        <td>{book.bookAuthor}</td>
                                        <td>{book.bookPublicationDate}</td>
                                        <td>{book.bookPublisher}</td>
                                        <td>{book.bookPrice.toLocaleString()}KRW</td>
                                        <td>{book.bookPageCount}</td>
                                        <td>{book.bookGenre}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* 더보기 버튼 */}
            { last === false && (
            <div className="row mt-4">
                <div className="col">
                    <button type="button" className="btn btn-success btn-lg w-100"
                    onClick={loadMoreList}>
                        <FaArrowDown/>
                        <span className="mx-2">더보기</span>
                        <FaArrowDown/>
                    </button>
                </div>
            </div>
            )}
            {loading === true && (
            <div className="position-fixed top-0 
                start-0 w-100 h-100 bg-dark bg-opacity-25 
                d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column text-center">
            <ClimbingBoxLoader loading={loading}/>
            <p className="mt-2">등록중</p>
            </div>
            </div>
        )}
        </>
    )
}
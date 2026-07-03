import { FaTrash } from "react-icons/fa";
import Jumbodtron from "./Jumbodtron";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";


export default function Exam09(){
    const [ bookList, setBookList] = useState([]);

    useEffect(()=>{

        axios({
            url : "http://localhost:8080/api/book/list",
            method : "get",
        })
        .then(response=>{
            setBookList(response.data);
        });

    }, []);
    const deleteBook = useCallback((target)=>{
    
            Swal.fire({
                title: "sure?",
                text : "no back again",
                icon: "warning",
                showCancelButton : true,
                    confirmButtonText : "delete",
                    cancelButtonText : "candel"
            })
            .then(result=>{
                if(result.isConfirmed){
                    setBookList(bookList
                        .filter(book=>book.bookId !== target.bookId))
                }
                toast.success("done");
            });
    
        },[bookList]);
    return(
        <>
            <Jumbodtron title="도서목록"/>

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
                                    <th>관리</th>
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
                                        <td>
                                            <FaTrash className="text-danger" 
                                            onClick={e=>(deleteBook(book))}/>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
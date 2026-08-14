import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

//게시판 목록 
export default function PostList(){
    const baseURL = import.meta.env.VITE_SERVER_URL;
    const [ postList, setPostList ] = useState([]);

    const loadData = useCallback(async()=>{
        const { data } = await axios.get(`${baseURL}/api/post/`);
        console.log(data.list);
        setPostList(data.list);
    }, [postList]);

    useEffect(()=>{
        loadData();
    }, []);


    return(<>
    <Row className="mt-4">
        <Col>
            <Button as={Link} to="/anonymous/add">
                <FaPlus/>
                <span className="ms-2">게시판 등록</span>
            </Button>
        </Col>
    </Row>
    <Row className="mt-4">
        <Col>
            <Table responsive striped hover className="text-nowrap">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>만든시각</th>
                        <th>수정시각</th>
                    </tr>
                </thead>
                <tbody>
                    {postList.map((post)=>(
                        <tr key={post.postNo}>
                            <td>{post.postNo}</td>
                            <td>
                                <Link to={`/anonymous/detail/${post.postNo}`}>
                                {post.postTitle}
                                </Link>
                            </td>
                            <td>{post.postCtime}</td>
                            <td>{post.postUtime}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Col>
    </Row>

    </>);
}
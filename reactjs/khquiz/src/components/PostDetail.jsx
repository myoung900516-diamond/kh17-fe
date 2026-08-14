import { useCallback, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaList, FaTrash } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";


export default function PostDetail(){
    const {postNo} = useParams();

    const navigate = useNavigate();

    const[post, setPost] = useState(null); 
    const baseURL = import.meta.env.VITE_SERVER_URL;
    const loadData = useCallback(async()=>{
        const {data} = await axios.get(`${baseURL}/api/post/${postNo}`);
        // console.log(data);
        setPost(data);
    }, [postNo, post, baseURL]);
    useEffect(()=>{
        loadData();
    }, []);

    const deletePost = useCallback(async()=>{
        const {data} = await axios.post(`${baseURL}/api/post/${postNo}`);
        navigate("/anonymous");

    }, [baseURL]);

    if(post === null){
        return(<>
            <h1>로딩중...</h1>
        </>);
    }

    return(<>
    
    <Row className="mt-4">
        <Col sm={3}>번호</Col>
        <Col sm={9}>
            <span>{post.postNo}</span>
        </Col>
    </Row>
    <Row className="mt-4">
        <Col sm={3}>만든시각</Col>
        <Col sm={9}>
            <span>{post.postCtime}</span>
        </Col>
    </Row>
    <Row className="mt-4">
        <Col sm={3}>수정시각</Col>
        <Col sm={9}>
            <span>{post.postUtime}</span>
        </Col>
    </Row>
    <Row className="mt-4">
        <Col sm={3}>제목</Col>
        <Col sm={9}>
            <span>{post.postTitle}</span>
        </Col>
    </Row>
    <Row className="mt-4">
        <Col sm={3}>내용</Col>
        <Col sm={9}>
            <span>{post.postContent}</span>
        </Col>
    </Row>

        <Row className="mt-5">
        <Col>
            <Button as={Link} to={`/anonymous/edit/${postNo}`}>
                <FaPenToSquare />
                <span className="ms-2">수정</span>
            </Button>
        </Col>
        <Col>
            <Button onClick={deletePost}>
                <FaTrash/>
                <span className="ms-2">삭제</span>
            </Button>
        </Col>
        <Col>
            <Button as={Link} to={"/anonymous"}>
                <FaList/>
                <span className="ms-2">목록</span>
            </Button>
        </Col>
    </Row>
    
    
    </>);
}
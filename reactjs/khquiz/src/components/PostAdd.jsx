import axios from "axios";
import { useCallback, useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import {  useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export default function PostAdd() {
    //state
    const [post, setPost] = useState(
        {postTitle : "",
        postContent : "", 
        postPassword : ""}
    );
    const changeStringValue = useCallback(e=>{
        const {name , value} = e.target;
        setPost({
            ...post,
            [name] : value
        });
    }, [post]);



    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_SERVER_URL;
    const addPost = useCallback(async()=>{
        try{
            await axios.post(`${baseURL}/api/post/`, post);
            navigate("/anonymous");
        }
        catch(e){
            if(e.status === 400){
                await Swal.fire("정보를 알맞게 입력해주세요.");
                return;
            }
            else if(e.status === 500){
                await Swal.fire("일시적인 서버 오류입니다. \n잠시후 시도해 주세요.");
            }
        }
    }, [baseURL, post]);

    return (<>


        <Row className="mt-5">
            <Col sm={3}>제목</Col>
            <Col sm={9} className="">
                <Form.Control type="text" name="postTitle" value={post.postTitle} 
                    onChange={changeStringValue}
                ></Form.Control>
            </Col>
        </Row>
        <Row className="mt-5">
            <Col sm={3}>내용</Col>
            <Col sm={9}>
                <Form.Control type="text" name="postContent" 
                value={post.postContent} onChange={changeStringValue}></Form.Control>
            </Col>
        </Row>
        <Row className="mt-5">
            <Col sm={3}>비밀번호</Col>
            <Col sm={9}>
                <Form.Control type="password" name="postPassword"
                value={post.postPassword} onChange={changeStringValue}></Form.Control>
            </Col>
        </Row>

        <Row className="mt-5">
            <Col>
                <Button onClick={addPost}>
                    <FaPlus />
                    <span className="ms-2">등록하기</span>
                </Button>
            </Col>
        </Row>
    </>);
}
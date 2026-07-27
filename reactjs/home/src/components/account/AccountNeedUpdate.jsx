import Jumbotron from "@templates/Jumbotron";
import { Button, Col, Row } from "react-bootstrap";
import { FaRotate } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function AccountNeedUpdate(){
    return (<>
        <Jumbotron title="비밀번호 변경 안내" content="비밀번호를 변경하신지 30일이 지났습니다."/>

        <Row className="mt-4">
            <Col className="d-flex text-end">
                <Button as={Link} to="/account/password" variant="success">
                    <FaRotate/>
                    <span>비밀번호 변경하기</span>
                </Button>
                <Button as={Link} to="/" variant="primary" className="ms-3">
                    <span>나중에 변경하기</span>
                </Button>
            </Col>
        </Row>
    </>);
}
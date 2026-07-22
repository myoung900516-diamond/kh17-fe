import Jumbotron from "@templates/Jumbotron";
import { Col, Form, Row } from "react-bootstrap";

export default function accountPassword(){
    return(<>
        <Jumbotron title="비밀번호변경하기"/>
        <Row className="mt-4">
            <Col sm={3}>현재 비밀번호</Col>
            <Col sm={9}>
                <Form.Control/>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3}>새 비밀번호</Col>
            <Col sm={9}>
                <Form.Control/>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3}>새 비밀번호 확인</Col>
            <Col sm={9}>
                <Form.Control/>
            </Col>
        </Row>
        
    </>)
}
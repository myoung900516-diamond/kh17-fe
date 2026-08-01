import Jumbotron from "@templates/Jumbotron";
import { Col, Container, Row } from "react-bootstrap";

//스도쿠를 구성하는 칸(cell)은 총(6X6)X9=8칸, 6X6칸 9개로 세분화되며 지켜야할 룰은 다음과 같다. 
//각각의 가로줄(row) 세로줄(column)에서 ~9가 중복 없이 하나씩 들어간다. 
//6X6칸(box)안에는 ~9가 중복 없이 하나씩 들어간다. 
//처음 제시되는 숫자들의 개수는 60개 이하여야 한다. 




export default function Sudoku() {


    return (<>
        <Jumbotron title="스도쿠" content="스도쿠게임을 즐겨보세요." />
        <div className="d-flex flex-wrap justify-content-center" style={{ height: 375, maxWidth:"375px", aspectRatio: "1/1" }}>

            <Row className="border border-dark d-flex m-0" style={{width:"33.3333%", height: 125, aspectRatio: "1/1" }}>

                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>

            </Row>
            <Row className="border border-dark d-flex m-0" style={{width:"33.3333%", height: 125, aspectRatio: "1/1" }}>

                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>

            </Row>
            <Row className="border border-dark d-flex m-0" style={{width:"33.3333%", height: 125, aspectRatio: "1/1" }}>

                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>

            </Row>
            <Row className="border border-dark d-flex m-0" style={{width:"33.3333%", height: 125, aspectRatio: "1/1" }}>

                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>

            </Row>
            <Row className="border border-dark d-flex m-0" style={{width:"33.3333%", height: 125, aspectRatio: "1/1" }}>

                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>

            </Row>
            <Row className="border border-dark d-flex m-0" style={{width:"33.3333%", height: 125, aspectRatio: "1/1" }}>

                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>

            </Row>
            <Row className="border border-dark d-flex m-0" style={{width:"33.3333%", height: 125, aspectRatio: "1/1" }}>

                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>

            </Row>
            <Row className="border border-dark d-flex m-0" style={{width:"33.3333%", height: 125, aspectRatio: "1/1" }}>

                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>

            </Row>
            <Row className="border border-dark d-flex m-0" style={{width:"33.3333%", height: 125, aspectRatio: "1/1" }}>

                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center"
                    style={{ height: 40 }}>
                    <span className="fs-5">1</span>
                </Col>

            </Row>
        </div>


    </>)
}
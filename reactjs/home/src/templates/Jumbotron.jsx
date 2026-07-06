import { Col, Row } from "react-bootstrap";


export default function Jumbotron({title="테스트제목", content=""}){
    return(
        <Row>
            <Col>
                <div className="p-4 text-primary rounded">
                    {/* <h1>{props.title}</h1> */}
                    {/* <p>{props.content}</p> */}
                    <h1>{title}</h1>
                    <p className="text-muted">{content}</p>
                </div>
            </Col>
        </Row>
    )

    
}


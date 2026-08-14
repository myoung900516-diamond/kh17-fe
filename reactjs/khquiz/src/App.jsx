import './App.css';
import Body from "./templates/Body";
import Menu from "./templates/Menu";
import {Row, Col, Container} from "react-bootstrap";

function App() {

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Menu/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Body/>
          </Col>

        </Row>

      </Container>
    </>
  )
}

export default App

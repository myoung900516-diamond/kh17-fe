
import './App.css'
import Header from "./templates/Header"
import Menu from "./templates/Menu"
import Body from "./templates/Body"
import Footer from "./templates/Footer"
import Container from "react-bootstrap/esm/Container"
import { Row, Col } from "react-bootstrap"

export default function App() {


  return (
    <Container fluid>
      <Row className=" d-none d-md-block my-4">
        <Col className="py-2">
          <Header/>
        </Col>
      </Row>

      <Menu/>
      <Row className="mt-40" style={
        { 
          minHeight : 450
        }
      }>
        <Col>
          <Body/>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Footer/>
        </Col>
      </Row>
    </Container>
  )
}


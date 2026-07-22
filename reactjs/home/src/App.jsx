
import './App.css'
import Header from "./templates/Header"
import Menu from "./templates/Menu"
import Body from "./templates/Body"
import Footer from "./templates/Footer"
import {Bounce, ToastContainer} from "react-toastify";
import { Row, Col, Container } from "react-bootstrap";
import { useAtomValue } from "jotai"
import { loginUserState } from "@utils/storage"

export default function App() {
  const loginUser = useAtomValue(loginUserState);
  // console.log("loginUser", loginUser);

  return (
    <Container fluid>
      <Row className=" d-none d-md-block my-4">
        <Col className="py-2">
          <Header />
        </Col>
      </Row>

      <Menu />
      <Row className="my-4" style={
        {
          minHeight: 450
        }
      }>
        <Col sm={{span:10, offset:1}} md={{span:8, offset:2}}>
          <Body />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Footer />
        </Col>
      </Row>

      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        // pauseOnFocusLoss
        // draggable
        // pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </Container>
  )
}


import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function Menu(){
    return(<>
        <Navbar expand="md" className="bg-body-tertiary sticky-top"
            bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">홈</Nav.Link>
                            <Nav.Link as={Link} to="/anonymous">게시판 목록</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>

        </Navbar>

    </>);
}
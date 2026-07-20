import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { loginUserState, logoutActionState } from "@utils/storage";
import { isLoginState } from "@utils/storage";
import { isAdminState } from "@utils/storage";
import { useCallback } from "react";
import axios from "axios";


export default function Menu() {
  const [loginUser, SetLoginUser] = useAtom(loginUserState);

  const isLogin = useAtomValue(isLoginState);
  const isAdmin = useAtomValue(isAdminState);

  const logoutAction = useSetAtom(logoutActionState);

  //서버에 로그아웃 요청 및 jotai 저장소 초기화 요청을 수행하는 함수
  const logout = useCallback(async ()=>{
    try{
      await axios.delete("/service/auth/logout");//쿠키 삭제 요청
    }
    catch(e){}
    finally{
      logoutAction();//에러여부와 관계없이 화면상의 데이터는 삭제
    }
  }, []);

  return (
    <>
      <Navbar expand="md" className="bg-body-tertiary sticky-top"
        bg="dark" data-bs-theme="dark">
        {/* 메뉴 메인 컴테이너 */}
        <Container fluid>
          {/* 메인 브렌드 로고 */}
          <Navbar.Brand as={Link} to="/">KH정보교육원</Navbar.Brand>
          {/* 접이식 버튼(접은 화면에서만 보임) */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {/* 접이식 영역(좁은 화면에서만 보임) */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/*
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/country/list">국가정보</Nav.Link>
            <Nav.Link as={Link} to="/country/search">국가명검색</Nav.Link>
            <Nav.Link as={Link} to="/lecture/list">강의정보</Nav.Link>
            <Nav.Link as={Link} to="/book/list">도서정보</Nav.Link>
            <Nav.Link as={Link} to="/book/spa">도서정보2</Nav.Link>
            */}
              <NavDropdown title="데이터베이스" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/country/list">국가정보</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/country/search">국가명검색</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/country/complex">국가복합검색</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/lecture/list">강의정보</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/book/list">도서정보</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/book/spa">도서정보(SPA)</NavDropdown.Item>
              </NavDropdown>
                <Nav.Link as={Link} to="/session/test">세션테스트</Nav.Link>
            </Nav>
            <Nav>
              {isLogin === true && (<>
              {isAdmin === true && (<>
              
              <Nav.Link as={Link} to="">관리메뉴</Nav.Link>
              </>)}
              {isAdmin === false && (<>
              <Nav.Link as={Link} to="/account/mypage">내정보</Nav.Link>
              
              </>)}
              <Nav.Link onClick={logout}>로그아웃</Nav.Link>
              </>)}
              {isLogin !== true && (<>
              
              <Nav.Link as={Link} to="/account/join">sign up</Nav.Link>
              <Nav.Link as={Link} to="/account/login">sign in</Nav.Link>
              </>)}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


    </>
  )
}
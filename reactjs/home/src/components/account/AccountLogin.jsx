import { useAtom, useSetAtom } from "jotai";
import { useCallback, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import Jumbotron from "@templates/Jumbotron";
import { useNavigate } from "react-router-dom";
import { FaRightToBracket } from "react-icons/fa6";
import { loginActionState } from "@utils/storage";
import axios from "axios";



export default function AccountLogin() {
    const [account, setAccount] = useState({
        accountId: "",
        accountPassword: ""
    });
    //jotai state
    // const [login, setLogin] = useAtom(loginState);

    // const [_, loginAction] = useAtom(loginActionState);
    const loginAction = useSetAtom(loginActionState); 

    const navigate = useNavigate();

    const changeStringValue = useCallback(e => {
        const { name, value } = e.target;

        setAccount(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);
    const sendLogin = useCallback(async () => {
        if (account.accountId === "" && account.accountPassword === "") {
            await Swal.fire("정보를 입력하세요");
            return;
            navigate("/")
        }
        try {
            // setLogin(data);
            const { data } = await axios.post("/service/auth/login", account);
            // console.log(data);
            loginAction(data);
            navigate("/");
        }
        catch (e) {
            await Swal.fire("정보가 일치하지 않습니다.");
        }
    }, [account]);
    return (<>
        <Jumbotron title="로그인 화면" content="로그인을 위한 정보를 입력해주세요" />
        <Row className="mt-4">
            <Form.Label column={3}>아이디</Form.Label>
            <Col>
                <Form.Control type="text" name="accountId" value={account.accountId}
                    onChange={changeStringValue} placeholder="User ID"/>
            </Col>
        </Row>
        <Row className="mt-4">
            <Form.Label column={3}>비밀번호</Form.Label>
            <Col>
                <Form.Control type="password" name="accountPassword" value={account.accountPassword}
                    onChange={changeStringValue} placeholder="User Password"/>
            </Col>
        </Row>
        <Row className="mt-5">
            <Col className="text-end">
                <Button variant="success" size="lg" onClick={sendLogin}>
                    <FaRightToBracket/>
                    <span className="ms-2">로그인</span>
                </Button>
            </Col>
        </Row>
    </>)
}
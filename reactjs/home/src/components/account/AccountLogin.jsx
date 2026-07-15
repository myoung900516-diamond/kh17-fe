import { useAtom } from "jotai";
import { useCallback, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { loginState } from "@utils/storage";
import Jumbotron from "@templates/Jumbotron";
import { useNavigate } from "react-router-dom";



export default function AccountLogin() {
    const [account, setAccount] = useState({
        accountId: "",
        accountPassword: ""
    });
    //jotai state
    const [login, setLogin] = useAtom(loginState);

    const navigate = useNavigate();

    const changeStringValue = useCallback(e => {
        const { name, value } = e.target;

        setAccount(prev => ({
            ...prev,
            [name]: value
        }));
    }, [account]);
    const sendLogin = useCallback(async () => {
        if (account.accountId === "" && account.accountPassword === "") {
            await Swal.fire("정보를 입력하세요");
            return;
            navigate("/")
        }
        try {
            const { data } = await axios.post("/service/auth/login", account);
            setLogin(data);
        }
        catch (e) {
            await Swal.fire("정보가 일치하지 않습니다.");
        }
    }, [account]);
    return (<>
        <Jumbotron title="로그인 화면" content="로그인을 위한 정보를 입력해주세요" />
        <Row className="mt-4">
            <Form.Label/>
        </Row>
        <Row>
            <Col className="text-end">
                <Button></Button>
            </Col>

        </Row>
    </>)
}
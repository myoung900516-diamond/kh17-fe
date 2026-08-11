import { useAtom, useSetAtom } from "jotai";
import { useCallback, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import Jumbotron from "@templates/Jumbotron";
import { useNavigate } from "react-router-dom";
import { FaRightToBracket } from "react-icons/fa6";
import { loginActionState } from "@utils/storage";
import { authClient } from "@utils/reaxios";



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
            // const { data } = await axios.post("/service/auth/login", account);
            const { data } = await authClient.post("/login", account);
            // console.log(data.needUpdate);
            // loginAction(data);
            //data에서 needUpdate와 나머지를 뽑아내서 나눠서 사용(구조분해할당)
            const {needUpdate, ...userData} = data;
            loginAction(userData);

            //로그인 성공시에도 경우가 나눠진다
            //-data에 needUpdate항목의 값에 따라 이동하는 페이지가 달라진다.
            if(needUpdate == true){
                navigate("/account/needupdate");
                return;
            }
            
            navigate("/");
        }
        catch (e) {
            // console.log(e);
            //로그인 실패가 경우가 나눠진다
            //-404:정보 불일치
            //-403:차단된 회원
            //console.log(Object.keys(e));
            //console.log(e.response);
            //console.log(e.status);
            //console.log(typeof e.status);//자료형 확인

            // if (e.response?.status === 403) {
            //     navigate("/account/block");
            //     return;
            // }
            // await Swal.fire("정보가 일치하지 않습니다.");

            if(e.status === 403){
                navigate("/account/block");
                return;
            }
            else if(e.status === 404){
                await Swal.fire("정보가 일치하지 않습니다.");
            }
            else{
                await Swal.fire("일시적인 서버 오류입니다. \n잠시후 시도해 주세요.");
            }
            console.log("e : ", e);

        }
    }, [account]);
    return (<>
        <Jumbotron title="로그인 화면" content="로그인을 위한 정보를 입력해주세요" />
        <Row className="mt-4">
            <Form.Label column={3}>아이디</Form.Label>
            <Col>
                <Form.Control type="text" name="accountId" value={account.accountId}
                    onChange={changeStringValue} placeholder="User ID"
                    autoFocus/>
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
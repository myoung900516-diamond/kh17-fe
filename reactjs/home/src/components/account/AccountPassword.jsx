import Jumbotron from "@templates/Jumbotron";
import { useCallback, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { apiClient } from "@utils/reaxios";
import { Link, useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { loginUserState } from "@utils/storage";
import { FaAsterisk, FaEye, FaEyeSlash } from "react-icons/fa6";

export default function accountPassword() {
    const { accountId, accountNickname, accountLevel } = useAtomValue(loginUserState);
    
    const [accountPassword, setAccountPassword] = useState("");

    const [password, setPassword] = useState({
        password: "",
        password2: ""
    });
    const [result, setResult] = useState({
        accountPassword:null,
        password: null,
        password2: null
    });
    const navigate = useNavigate();

    const changeStringValue = useCallback(e => {
        const { name, value } = e.target;

        setPassword(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const [visible, setVisible] = useState({
        password: false,
        password2: false,
    });

    const confirmPassword = useCallback(async()=>{

        const {data} = await apiClient.get("/account/findPassword", {
            params : {
                accountPassword: accountPassword
            }
        });

        console.log(data);
        setResult(prev=>({
            ...prev,
            accountPassword : data? "is-valid": "is-invalid"
        }));
        
    }, [accountPassword, result]);


    const checkPassword = useCallback(e => {
        const regex = /^(?=.*[A-Za-z])(?=.*[0-9])|(?=.*[A-Za-z])(?=.*[!@#$%^&*])|(?=.*[0-9])(?=.*[!@#$%^&*]).{8,16}$/;
        const valid = regex.test(password.password);
        const clazz = valid ? "is-valid" : "is-invalid";

        const valid2 = password.password.length > 0
            && password.password === password.password2;
        const clazz2 = valid2 ? "is-valid" : "is-invalid";
        setResult(prev => ({
            ...prev,
            password: clazz,
            password2: clazz2
        }));

    }, [password]);
    const changePassword = useCallback(async () => {
        const { data } = await apiClient.patch(`/account/password/${accountId}`);
        toast.success("비밀번호 변경이 완료되었습니다");
        navigate("/account/mypage");
    }, [accountPassword]);
    
    return (<>
        <Jumbotron title="비밀번호변경하기" />
        <Row className="mt-4">
            <Col sm={3} >현재 비밀번호</Col>
            <Col sm={9}>
                <Form.Control type="password" name="accountPassword" 
                value={accountPassword} onChange={e => setAccountPassword(e.target.value)}
                className={`${result.accountPassword} w-50`}
                placeholder="현재 비밀번호를 입력하세요." onBlur={confirmPassword}/>
                <div className="valid-feedback">비밀번호가 일치합니다.</div>
                <div className="invalid-feedback">비밀번호가 일치하지 않습니다. </div>
            </Col>
        </Row>
        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>새 비밀번호</span>
                <FaAsterisk className="text-danger" />
                {visible.password === true ? (
                    <FaEye className="text-danger ms-4" onClick={e => {
                        setVisible(prev => ({ ...prev, password: false }));
                    }} />

                ) : (
                    <FaEyeSlash className="text-info ms-4" onClick={e => {
                        setVisible(prev => ({ ...prev, password: true }));
                    }} />

                )}
            </Form.Label>
            <Col sm={9}>
                <Form.Control type={visible.password ? "text" : "password"} name="password"
                    value={password.password} onChange={changeStringValue}
                    onBlur={checkPassword} className={`${result.password} w-50`}
                    placeholder="새 비밀번호를 입력하세요."
                />
                <div className="valid-feedback">비밀번호 설정이 완료되었습니다</div>
                <div className="invalid-feedback">8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.</div>
            </Col>
        </Row>
        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>새 비밀번호확인</span>
                <FaAsterisk className="text-danger" />
                {visible.password2 === true ? (
                    <FaEye className="text-danger ms-4" onClick={e => {
                        setVisible(prev => ({ ...prev, password2: false }));
                    }} />

                ) : (
                    <FaEyeSlash className="text-info ms-4" onClick={e => {
                        setVisible(prev => ({ ...prev, password2: true }));
                    }} />

                )}
            </Form.Label>
            <Col sm={9}>
                <Form.Control type={visible.password2 ? "text" : "password"} name="password2"
                    value={password.password2} onChange={changeStringValue}
                    onBlur={checkPassword} className={`${result.password2} w-50`}
                    placeholder="비밀번호를 한 번 더 입력하세요." />
                <div className="valid-feedback">비밀번호가 일치합니다</div>
                <div className="invalid-feedback">비밀번호를 입력하지 않았거나 일치하지 않습니다</div>
            </Col>
        </Row>

        <Row className="mt-5">
            <Col className="text-center">
                <Button variant="success" onClick={changePassword}>
                    <span>변경하기</span>
                </Button>
                <Button as={Link} to="/account/mypage" variant="danger" className="ms-2">
                    <span>취소하기</span>
                </Button>
            </Col>
        </Row>

    </>)
}
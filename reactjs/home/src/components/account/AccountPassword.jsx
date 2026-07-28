import Jumbotron from "@templates/Jumbotron";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { apiClient } from "@utils/reaxios";
import { Link, useNavigate } from "react-router-dom";
import { FaAsterisk, FaEye, FaEyeSlash, FaLock } from "react-icons/fa6";
import { toast } from "react-toastify";

export default function accountPassword() {
    // const { accountId, accountNickname, accountLevel } = useAtomValue(loginUserState);
    
    // const [accountPassword, setAccountPassword] = useState("");

    // const [password, setPassword] = useState({

    //     password: "",
    //     password2: ""
    // });
    // const [result, setResult] = useState({
    //     accountPassword:null,
    //     password: null,
    //     password2: null
    // });
    // const navigate = useNavigate();

    // const changeStringValue = useCallback(e => {
    //     const { name, value } = e.target;

    //     setPassword(prev => ({
    //         ...prev,
    //         [name]: value
    //     }));
    // }, []);

    // const [visible, setVisible] = useState({
    //     password: false,
    //     password2: false,
    // });

    // const confirmPassword = useCallback(async()=>{

    //     const {data} = await apiClient.get("/account/findPassword", {
    //         params : {
    //             accountPassword: accountPassword
    //         }
    //     });

    //     console.log(data);
    //     setResult(prev=>({
    //         ...prev,
    //         accountPassword : data? "is-valid": "is-invalid"
    //     }));
        
    // }, [accountPassword, result]);


    // const checkPassword = useCallback(e => {
    //     const regex = /^(?=.*[A-Za-z])(?=.*[0-9])|(?=.*[A-Za-z])(?=.*[!@#$%^&*])|(?=.*[0-9])(?=.*[!@#$%^&*]).{8,16}$/;
    //     const valid = regex.test(password.password);
    //     const clazz = valid ? "is-valid" : "is-invalid";

    //     const valid2 = password.password.length > 0
    //         && password.password === password.password2;
    //     const clazz2 = valid2 ? "is-valid" : "is-invalid";
    //     setResult(prev => ({
    //         ...prev,
    //         password: clazz,
    //         password2: clazz2
    //     }));

    // }, [password]);
    // const changePassword = useCallback(async () => {
    //     const { data } = await apiClient.patch(`/account/password/${accountId}`);
    //     toast.success("비밀번호 변경이 완료되었습니다");
    //     navigate("/account/mypage");
    // }, [accountPassword]);
    const navigate = useNavigate();

    const [ account, setAccount] = useState({
        prevAccountPassword : "",
        newAccountPassword : ""
    });
    const [result, setResult] = useState(null); //서버에서 받은 메세지 

    const changeStringValue = useCallback(e=>{
        const{name , value} = e.target;
        setAccount(prev=>({
            ...prev,
            [ name ] : value 
        }));
    }, []);

    // function PasswordChange() {

    // const passwordRef = useRef(null);

    // useEffect(() => {
    //     passwordRef.current.focus();
    // }, []);

    const sendRequest = useCallback(async(e)=>{
        e.preventDefault();//form 기본이벤트 차단 페이지 이동없음. 


        if(account.prevAccountPassword === "")return;
        if(account.newAccountPassword === "")return;



        //axios는 더이상 사용할 수 없다. 
        const {data} = await apiClient.patch("/account/password", account);
        setResult(data);

    }, [account]);

    //성공일 때만 토스트 메세지 + 내정보로 이동
    useEffect(()=>{
        if(result === null) return;//검사전 pass
        if(result.result !== true) return;//변경 실패 pass

        toast.success("비밀번호가 변경되었습니다.");
        navigate("/account/mypage");
    }, [result, navigate]);
    return (<>
        <Jumbotron title="비밀번호변경하기" content="현재 비밀번호와 변경하실 비밀번호를 입력하세요."/>
        
        {/* result의 상태에 따라 메세지를 표시 */}
        {result !== null && (
            <Row className="mt-5">
                <Col>
                    <Alert variant={result.result? "success" : "danger"}>
                        {result.message}
                    </Alert>
                </Col>
            </Row>
        )}
        
        
        
        <Form autoComplete="off" onSubmit={sendRequest}>

        <Row className="mt-4">
            <Form.Label column sm={3} >현재 비밀번호</Form.Label>
            <Col sm={9}>
                <Form.Control type="password" name="prevAccountPassword" 
                value={account.prevAccountPassword} onChange={changeStringValue}
                // className={`${result.accountPassword} w-50`}
                placeholder="현재 비밀번호를 입력하세요." 
                // onBlur={confirmPassword}
                autoFocus/>
            </Col>
        </Row>
        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>새 비밀번호</span>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="password" name="newAccountPassword"
                    value={account.newAccountPassword} onChange={changeStringValue}
                    placeholder="새 비밀번호를 입력하세요."
                    />
            </Col>
        </Row>
        

        <Row className="mt-5 text-end">
            <Col>
                <Button variant="success" size="lg" type="submit"
                    // onClick={sendRequest} 
                    className="w-md-auto">
                    <FaLock/>
                    <span>변경하기</span>
                </Button>
                <Button as={Link} to="/account/mypage" size="lg" variant="danger" 
                className="w-md-auto">
                    <span>취소하기</span>
                </Button>
            </Col>
        </Row>
    </Form>

    </>)
}
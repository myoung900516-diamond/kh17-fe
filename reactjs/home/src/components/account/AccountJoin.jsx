import Jumbotron from "@templates/Jumbotron";
import axios from "axios";
import { useCallback, useState, useMemo, useRef } from "react";
import { Button, Col, Form, Row, Toast } from "react-bootstrap";
import { FaAsterisk, FaCheck, FaEye, FaEyeSlash, FaMagnifyingGlass, FaPaperPlane, FaRotateRight, FaSpinner, FaUserPlus, FaXmark } from "react-icons/fa6";
import { useKakaoPostcodePopup } from 'react-daum-postcode';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@utils/reaxios";




export default function AccountJoin() {

    //kakao post
    const open = useKakaoPostcodePopup("//t1.kakaocdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

    //state
    const [account, setAccount] = useState({
        accountId: "",
        accountPassword: "",
        accountPassword2: "",
        accountEmail: "",
        accountNickname: "",
        accountBirth: "",
        accountContact: "",
        accountPost: "",
        accountAddress1: "",
        accountAddress2: "",
        accountMessage: "",
    });
    const [result, setResult] = useState({
        //accountId : null,
        accountId: { clazz: null, code: null },
        accountPassword: null,
        accountPassword2: null,
        accountEmail: {clazz:null, code:null},
        accountNickname: { clazz: null, code: null },
        accountBirth: null,
        accountContact: null,
        accountPost: null,
        accountAddress1: null,
        accountAddress2: null,
        accountMessage: null,
    });
    const [visible, setVisible] = useState({
        accountPassword: false,
        accountPassword2: false,
    });
    const changeStringValue = useCallback(e => {
        const { name, value } = e.target;

        setAccount(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const changeAccountEmail = useCallback(e=>{
        //인증이 완료되었는데 입력을 또 한 경우 -> 인증완료를 없었던 일로 한다
        if(result.accountEmail.clazz === "is-valid"){
            setResult(prev=>({
                ...prev,
                accountEmail : {clazz : null, code: null}
            }))
        }
        setAccount(prev=>({
            ...prev,
            accountEmail : e.target.value
        }));
    }, [result]);


    //-검사
    const checkAccountId = useCallback(async e => {
        const regex = /^[a-z][a-z0-9]{4,19}$/;
        const valid = regex.test(account.accountId);

        if (valid === false) {
            setResult(prev => ({
                ...prev,
                accountId: { clazz: "is-invalid", code: "format" }

            }));
            return;
        }
        //형식 통과 
        const response = await apiClient.get(`/account/check-id/${account.accountId}`);

        const clazz = response.data === true ? "is-valid" : "is-invalid";
        const code = response.data === true ? null : "duplicate";
        setResult(prev => ({
            ...prev,
            accountId: { clazz: clazz, code: code }
        }));

    }, [account]);

    const checkAccountPassword = useCallback(e => {
        const regex = /^(?=.*[A-Za-z])(?=.*[0-9])|(?=.*[A-Za-z])(?=.*[!@#$%^&*])|(?=.*[0-9])(?=.*[!@#$%^&*]).{8,16}$/;
        const valid = regex.test(account.accountPassword);
        const clazz = valid ? "is-valid" : "is-invalid";

        const valid2 = account.accountPassword.length > 0
            && account.accountPassword === account.accountPassword2;
        const clazz2 = valid2 ? "is-valid" : "is-invalid";
        setResult(prev => ({
            ...prev,
            accountPassword: clazz,
            accountPassword2: clazz2
        }));

    }, [account]);


    const checkAccountEmail = useCallback(async e => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,}$/;
        const valid = regex.test(account.accountEmail);
        if(valid === false){
            setResult(prev=>({
                ...prev,
                accountEmail : {clazz : "is-invalid", code : "format"}
            }));
            return;
        }
        const {data} = await apiClient.get(`/account/check-email/${account.accountEmail}`)
        const clazz = data ? "" : "is-invalid";
        const code = data ? null : "duplicate";
        setResult(prev => ({ 
            ...prev, 
            accountEmail: {
                clazz : clazz,
                code : code
            },
        }));
    }, [account]);

    const checkAccountNickname = useCallback(async e => {
        const regex = /^[가-힣A-Za-z0-9]{1,10}$/;
        const valid = regex.test(account.accountNickname);

        if (valid === false) {
            setResult(prev => ({
                ...prev,
                accountNickname: { clazz: "is-invalid", code: "format" }

            }));
            return;
        }
        // const response = await axios.get(`/api/account/check-nickname/${account.accountNickname}`);
        const { data } = await apiClient.get(`/account/check-nickname/${account.accountNickname}`);

        const clazz = data ? "is-valid" : "is-invalid";
        const code = data ? null : "duplicate";
        setResult(prev => ({
            ...prev,
            accountNickname: { clazz: clazz, code: code }
        }));
    }, [account]);

    const checkAccountBirth = useCallback(e => {
        const regex = /^([0-9]{4})-(((02)-(0[1-9]|1[0-9]|2[0-9]))|((0[469]|11)-(0[1-9]|1[0-9]|2[0-9]|30))|((0[13578]|1[02])-(0[1-9]|1[0-9]|2[0-9]|3[01])))$/;
        const valid = account.accountBirth.length === 0 || regex.test(account.accountBirth);
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult(prev => ({ ...prev, accountBirth: clazz }));
    }, [account]);

    const checkAccountContact = useCallback(e => {
        const regex = /^010[1-9][0-9]{7}$/;
        const valid = account.accountContact.length === 0 || regex.test(account.accountContact);
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult(prev => ({ ...prev, accountContact: clazz }));
    }, [account]);

    const checkAccountAddress = useCallback(e => {
        const empty = account.accountPost === "" && account.accountAddress1 === ""
            && account.accountAddress2 === "";
        const fill = account.accountPost !== "" && account.accountAddress1 !== ""
            && account.accountAddress2 !== "";
        const valid = empty || fill;
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult(prev => ({
            ...prev,
            accountPost: clazz,
            accountAddress1: clazz,
            accountAddress2: clazz
        }));
    }, [account]);
    const checkAccountMessage = useCallback(e => {
        setResult(prev => ({
            ...prev,
            accountMessage: "is-valid"
        }));
    }, [account]);

    

    //ref
    //-태그 참조용 동기방식의 데이터 - 많이 쓸수록 느려짐
    //-태그를 제어하는 리모컨으로 사용
    //-언제 어디서나 일정한 값을 가져야 하는 데이터에 사용(로딩중과 같은 상태 데이터)
    //-문법 : const 변수 : useRef(초기값);
    const address2ref = useRef();

    //우편번호처리
    const addressSearch = useCallback((e) => {
        // console.log(e);
        const { tagName, value } = e.target;

        if (tagName === "INPUT" && value !== "") return;
        open({
            onComplete: (data) => {
                // console.log(data);
                //-userSelectedType : 주소의 유형 R(도로명) J(지번주소)
                const address = data.userSelectedType === "R" ?
                    data.roadAddress : data.jibunAddress;
                const zonecode = data.zonecode;

                //주소변경
                setAccount(prev => ({
                    ...prev,
                    accountPost: zonecode,
                    accountAddress1: address,
                    accountAddress2: ""
                }));

                //상세주소창에 포커스를 줄수 있나? 
                // document.querySelector("[name=accountAddress2]").focus();
                //ref를 사용 
                address2ref.current.focus();
            }
        });
    }, []);

    const clearAddress = useCallback(e => {
        console.log(e.target);
        console.log(e.currentTarget.style.opacity);
        if (parseInt(e.currentTarget.style.opacity) === 0) return;
        //입력값 초기화
        setAccount(prev => ({
            ...prev,
            accountPost: "",
            accountAddress1: "",
            accountAddress2: "",
        }))
        setResult(prev => ({
            ...prev,
            accountPost: null,
            accountAddress1: null,
            accountAddress2: null,
        }))
    }, []);

    //주소 삭제버튼이 나와야되는지 판정하기 위한 memo
    //memo는 연관항목을 타이트하게 줘야한다
    const isAddressWritten = useMemo(() => {
        if (account.accountPost !== "") return true;
        if (account.accountAddress1 !== "") return true;
        if (account.accountAddress2 !== "") return true;
        return false;
    }, [
        account.accountPost,
        account.accountAddress1,
        account.accountAddress2,
    ]);
    //이메일 인증 관련 기능들
    const sendCert = useCallback(async () => {
        //다시보내기일 수도 있으니 result와 accountEmail의 상태를 초기화한다
        setResult(prev=>({
            ...prev,
            accountEmail : {clazz : null, code : null}
        }));
        setCertNumberResult(null);
        // setCertNumber("");
        try {
            setSending(true);
            const response = await apiClient.post(
                "/service/cert/send",
                { certEmail: account.accountEmail }
            );

        }
        catch (e) {
            toast.error("이메일 발송 오류");
        }
        finally {
            setSending(false);
        }

    }, [account.accountEmail]);

    //인증번호 state
    const [certNumber, setCertNumber] = useState("");
    const [certNumberResult, setCertNumberResult] = useState(null);
    //이메일이 발송 중인지 확인하겠다.(null/true/false)
    const [sending, setSending] = useState(null);

    const changeCertNumber = useCallback(e => {
        const replacement = e.target.value.replace(/[^0-9]+/g, "");
        setCertNumber(replacement);
    }, []);
    const checkCert = useCallback(async () => {
        const { data } = await apiClient.post("/service/cert/check",
            {
                certEmail: account.accountEmail,
                certNumber: certNumber
            }
        );
        // console.log("결과 : ", data.valid);
        setCertNumberResult(data.valid ? "is-valid" : "is-invalid");
        setCertNumber("");
        if(data.valid){
            setResult(prev=>({
                ...prev,
                accountEmail : {clazz : "is-valid", code : null}
            }))
        }
    },
        [account.accountEmail, certNumber]);
    //memo는 파생정보를 알아내는 
    //아날로그 시계를 만들면 memo연습용 
    const allValid = useMemo(() => {
        if (result.accountId.clazz !== "is-valid") return false;
        if (result.accountPassword !== "is-valid") return false;
        if (result.accountPassword2 !== "is-valid") return false;
        // if (result.accountNickname !== "is-valid") return false;
        if (result.accountEmail.clazz !== "is-valid") return false;
        if (certNumberResult !== "is-valid")return false;

        if (result.accountBirth === "is-invalid") return false;
        if (result.accountContact === "is-invalid") return false;
        if (result.accountPost === "is-invalid") return false;
        if (result.accountAddress1 === "is-invalid") return false;
        if (result.accountAddress2 === "is-invalid") return false;
        if (result.accountMessage === "is-invalid") return false;
        return true;
    }, [result, certNumberResult]);

    //최종가입
    const navigate = useNavigate();
    const sendJoin = useCallback(async()=>{
        try{
            // const copy = {...account};
            // delete copy.accountPassword2;
            const {accountPassword2, ...copy} = account;
            const response = await apiClient.post("/account/", copy);
            toast.success("회원 가입이 완료되었습니다.");
            navigate("/account/joinSuccess");
        }
        catch(e){
            toast.error("회원 가입 과정에서 오류가 발생했습니다.")
            navegate("/account/joinFail");
        }
        //앤드포인트
        // console.log(result);
    }, [account]);
    //view
    return (<>
        <Jumbotron title="가입 정보 입력" content="부정확한 정보 입력이 확인된 경우 계정 이용이 제한될 수 있습니다. " />
        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>아이디</span>
                <FaAsterisk className="text-danger" />
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="accountId"
                    value={account.accountId} onChange={changeStringValue}
                    placeholder="알파벳 소문자 시작 숫자포함 5~20자이내"
                    onBlur={checkAccountId} className={result.accountId.clazz} />
                <div className="valid-feedback">아이디 설정이 완료되었습니다</div>
                <div className="invalid-feedback">
                    {result.accountId.code === "format" && (<>
                        아이디는 영문소문자로 시작하며 숫자 포함 5~20글자로 작성해야 합니다
                    </>)}
                    {result.accountId.code === "duplicate" && (<>
                        아이디가 이미 사용중입니다.
                    </>)}
                </div>
            </Col>
        </Row>
        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>비밀번호</span>
                <FaAsterisk className="text-danger" />
                {visible.accountPassword === true ? (
                    <FaEye className="text-danger ms-4" onClick={e => {
                        setVisible(prev => ({ ...prev, accountPassword: false }));
                    }} />

                ) : (
                    <FaEyeSlash className="text-info ms-4" onClick={e => {
                        setVisible(prev => ({ ...prev, accountPassword: true }));
                    }} />

                )}
            </Form.Label>
            <Col sm={9}>
                <Form.Control type={visible.accountPassword ? "text" : "password"} name="accountPassword"
                    value={account.accountPassword} onChange={changeStringValue}
                    onBlur={checkAccountPassword} className={result.accountPassword}
                />
                <div className="valid-feedback">비밀번호 설정이 완료되었습니다</div>
                <div className="invalid-feedback">8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.</div>
            </Col>
        </Row>
        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>비밀번호확인</span>
                <FaAsterisk className="text-danger" />
                {visible.accountPassword2 === true ? (
                    <FaEye className="text-danger ms-4" onClick={e => {
                        setVisible(prev => ({ ...prev, accountPassword2: false }));
                    }} />

                ) : (
                    <FaEyeSlash className="text-info ms-4" onClick={e => {
                        setVisible(prev => ({ ...prev, accountPassword2: true }));
                    }} />

                )}
            </Form.Label>
            <Col sm={9}>
                <Form.Control type={visible.accountPassword2 ? "text" : "password"} name="accountPassword2"
                    value={account.accountPassword2} onChange={changeStringValue}
                    onBlur={checkAccountPassword} className={result.accountPassword2}
                    placeholder="비밀번호를 한 번 더 입력하세요." />
                <div className="valid-feedback">비밀번호가 일치합니다</div>
                <div className="invalid-feedback">비밀번호를 입력하지 않았거나 일치하지 않습니다</div>
            </Col>
        </Row>
        {/* 이메일은 인증번호 처리가 추가로 필요 */}
        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>이메일</span>
                <FaAsterisk className="text-danger" />
            </Form.Label>
            <Col sm={9}>
                <div className="d-flex flex-wrap">
                    <Form.Control type="text" inputMode="email" name="accountEmail"
                        value={account.accountEmail} onChange={changeAccountEmail}
                        onBlur={checkAccountEmail} 
                        className={`${result.accountEmail.clazz} w-auto d-inline-block`}
                        placeholder="testuser1@kh.com"
                        readOnly={sending} />
                    {/* 인증번호 발송버튼 */}
                    <Button variant={sending === false ? "danger" : "info"}
                        className="ms-2" onClick={sendCert}
                        disabled={
                            result.accountEmail.clazz === null 
                            || result.accountEmail.clazz === "is-invalid" 
                            || sending === true
                            }>

                        {sending === null && (<>
                            <FaPaperPlane />
                            <span className="ms-2 d-none d-sm-inline">인증번호 보내기</span>
                        </>)}
                        {sending === false && (<>
                            <FaRotateRight />
                            <span className="ms-2 d-none d-sm-inline">메일 다시 보내기</span>
                        </>)}
                        {sending === true && (<>
                            <FaSpinner className="spin" />
                            <span className="ms-2 d-none d-sm-inline">인증메일 발송중</span>
                        </>)}
                    </Button>
                    <div className="valid-feedback">이메일 인증 완료</div>
                    <div className="invalid-feedback">
                        {result.accountEmail.code === "format" && (<>
                                올바르지 않은 이메일 형식입니다
                        </>)}
                        {result.accountEmail.code === "duplicate" && (<>
                                이미 사용중인 이메일입니다. 
                        </>)}
                    </div>
                </div>
            </Col>
        </Row>
        {/* 인증번호 입력화면은 발송이 완료된 경우 + 인증완료가 안된 상황에서만 나와야 함 */}
        {(certNumberResult !== "is-valid" && sending == false)  && (

            <Row className="mt-2">
                <Col sm={{ span: 9, offset: 3 }}>
                    <div className="d-flex flex-wrap">
                        <Form.Control type="text" placeholder="인증번호" 
                        className={`${certNumberResult} w-auto`}
                            value={certNumber} onChange={changeCertNumber} />
                        <Button variant="success" className="ms-2" onClick={checkCert}>
                            <FaCheck />
                            <span className="ms-2 d-none d-sm-inline">인증번호 확인</span>
                        </Button>
                        <div className="valid-feedback">인증번호확인이 완료되었습니다</div>
                        <div className="invalid-feedback">인증번호가 일치하지 않습니다</div>
                    </div>
                </Col>
            </Row>
        )}
        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>닉네임</span>
                <FaAsterisk className="text-danger" />
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="accountNickname"
                    value={account.accountNickname} onChange={changeStringValue}
                    onBlur={checkAccountNickname} className={result.accountNickname.clazz}
                    placeholder="테스트유저" />
                <div className="valid-feedback">사용할 수 있는 닉네임입니다</div>
                <div className="invalid-feedback">
                    {result.accountNickname.code === "format" && (<>
                        닉네임은 특수문자를 제외한 1~10글자입니다
                    </>)}
                    {result.accountNickname.code === "duplicate" && (<>
                        닉네임이 이미 사용중입니다.
                    </>)}
                </div>
            </Col>
        </Row>
        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>생년월일</span>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="date" name="accountBirth"
                    value={account.accountBirth} onChange={changeStringValue}
                    onBlur={checkAccountBirth} className={result.accountBirth}
                    placeholder="2006-06-14" />
                <div className="invalid-feedback">올바른 날짜 형식이 아닙니다</div>
            </Col>
        </Row>
        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>연락처</span>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" inputMode="tel" name="accountContact"
                    value={account.accountContact} onChange={changeStringValue}
                    onBlur={checkAccountContact} className={result.accountContact}
                    placeholder="000-0000-0000" />
                <div className="invalid-feedback">올바른 연락처 형식이 아닙니다</div>
            </Col>
        </Row>
        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>주소</span>
            </Form.Label>
            <Col sm={9}>
                <div className="d-flex">
                    <Form.Control type="text" inputMode="numeric"
                        name="accountPost"
                        value={account.accountPost} readOnly onClick={addressSearch}
                        className={`${result.accountPost} w-auto d-inline-block`}
                        placeholder="우편번호"
                    // disabled={account.accountPost !== ""}
                    />
                    <Button variant="success" className="ms-2"
                        onClick={addressSearch}>
                        <FaMagnifyingGlass />
                        <span className="d-none d-md-inline-block">우편번호 검색</span>
                    </Button>
                    {/* {inAddressWritten === true && (
                        <Button variant="danger" className="ms-2" onClick={clearAddress}>
                        <FaXmark />
                        <span className="d-none d-md-inline-block">작성내역 지우기</span>
                    </Button>
                    ) } */}
                    {/* {account.accountPost && account.accountAddress1 && account.accountAddress2 !== null ? (
                    <Button variant="danger" className="ms-2" onClick={clearAddress}>
                        <FaXmark />
                        <span className="d-none d-md-inline-block">작성내역 지우기</span>
                    </Button>
                    ) : ""} */}
                    <Button variant="danger" className="ms-2" onClick={clearAddress}
                        style={
                            {
                                opacity: isAddressWritten === true ? 100 : 0,
                                transition: "opacity 0.1s ease-out",
                            }
                        }>
                        <FaXmark />
                        <span className="d-none d-md-inline-block">작성내역 지우기</span>
                    </Button>
                </div>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col sm={{ span: 9, offset: 3 }}>
                <Form.Control type="text" name="accountAddress1"
                    value={account.accountAddress1} readOnly onClick={addressSearch}
                    className={result.accountAddress1}
                    placeholder="기본주소"
                // disabled={account.accountAddress1 !== ""}
                />
            </Col>
        </Row>
        <Row className="mt-4">
            {/* <Col sm={9} className="offset-sm-3"> */}
            <Col sm={{ span: 9, offset: 3 }}>
                <Form.Control type="text" name="accountAddress2"
                    value={account.accountAddress2} onChange={changeStringValue}
                    onBlur={checkAccountAddress} className={result.accountAddress2}
                    placeholder="상세주소"
                    ref={address2ref}
                />
                <div className="invalid-feedback">주소는 비우거나 모두 작성해야 합니다</div>
            </Col>
        </Row>
        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>상태메세지</span>
            </Form.Label>
            <Col sm={9}>
                <Form.Control as="textarea" name="accountMessage"
                    value={account.accountMessage} onChange={changeStringValue}
                    onBlur={checkAccountMessage} className={result.accountMessage}
                    placeholder="자기소개" rows={5} />
            </Col>
        </Row>
        <Row className="mt-5">
            <Col>
                <Button variant="success" size="lg" className="w-100"
                    disabled={allValid === false} onClick={sendJoin}>
                    <FaUserPlus />
                    <span className="ms-2">회원 가입하기</span>
                </Button>
            </Col>
        </Row>
    </>)
}
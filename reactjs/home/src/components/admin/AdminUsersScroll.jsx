import Jumbotron from "@templates/Jumbotron";


import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { FaEraser, FaPlus, FaSearchengin } from "react-icons/fa6";
import { TbTilde } from "react-icons/tb";
import { apiClient } from "@utils/reaxios";
import { throttle } from "lodash-es";

import "./AdminUsersScroll.css";
import { Link } from "react-router-dom";

//등급을 미리 정의(갱신의 여지가 없고 화면의 변화와 관계가 없으므로 바깥에 만듦)
//등급이 추가되거나 변하지 않을게 확실한 경우
// const levelList = ["브론즈", "실버", "골드", "플래티넘", "다이아"];
// const fruitList = ["딸기", "바나나", "사과"];
const dataList = {
    accountLevels: ["브론즈", "실버", "골드", "플래티넘", "다이아"],
    fruits: ["딸기", "바나나", "사과"],
};

export default function AdminUsersScroll() {
    const [account, setAccount] = useState({
        accountId: "",
        accountNickname: "",
        accountEmail: "",
        accountContact: "",
        accountAddress: "",
        accountBirthBegin: "", accountBirthEnd: "",
        accountJoinBegin: "", accountJoinEnd: "",
        accountLoginBegin: "", accountLoginEnd: "",
        accountPointMin: "", accountPointMax: "",
        accountLevels: [],
        accountBlock: "",

        // size : 10,
        // orders: [],
        fruits: []
    });



    const [list, setList] = useState([]);
    // const [last, setLast] = useState(true);
    const last = useRef(true);//연관항목없이도 아무데서나 접근 가능한 동기식 데이터
    const [size, setSize] = useState(10);
    const lastAccountId = useMemo(() => {
        if (list.length === 0) return null;
        // return list[list.length-1].accountId;
        return list.at(-1).accountId;
    }, [list]);

    const changeStringValue = useCallback(e => {
        const { name, value } = e.target;

        setAccount(prev => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const changeNumericValue = useCallback(e => {
        const { name, value } = e.target;
        const regex = /[^0-9]+/g;
        const replacement = value.replace(regex, "");
        const result = parseInt(replacement || 0);

        setAccount(prev => ({
            ...prev,
            [name]: result,
        }));

    }, []);

    const changeListValue = useCallback(e => {
        const { name, value, checked } = e.target;

        if (e.target.checked) {
            setAccount(prev => ({
                ...prev,
                // [name] : [ ...prev.accountLevels, value]
                // [name] : [ ...prev["accountLevels"], value]
                [name]: [...prev[name], value]
            }))
        }
        else {
            setAccount(prev => ({
                ...prev,
                // [name]:prev.accountLevels.filter(level => level !== value)
                [name]: prev[name].filter(level => level !== value)
            }))
        }

    }, []);

    const changeListValueAll = useCallback(e => {
        const { name, checked } = e.target;

        if (checked) {
            setAccount(prev => ({
                ...prev,
                // [name] : ["브론즈", "실버", "골드", "다이아", "플래티넘"]
                // [name] : levelList //얕은 복사 shallow copy
                // [name] : {...levelList} //깊은 복사 deep copy
                [name]: [...dataList[name]]
            }))
        }
        else {
            setAccount(prev => ({
                ...prev,
                [name]: []
            }))
        }
    }, []);

    const checkedAll = useMemo(() => {
        // return account.accountLevels.length ==levelList.length;
        return {
            accountLevels: account.accountLevels.length === dataList.accountLevels.length,
            fruits: account.fruits.length === dataList.fruits.length,
        }
    }, [account]);

    
    const sendSearch = useCallback(async e => {
        if(loading.current === true)return;//이미 로딩중이면 하지마! 

        loading.current = true;//로딩시작했다. 


        e.preventDefault();//기본 form 전송 차단
        // const { data } = await apiClient.post("/account/search", account);
        // const copy = {...condition};
        // copy.lastAccountId = lastAccountId;
        // copy.size = size;
        // const { data } = await apiClient.post("/account/search", copy);


        const { data } = await apiClient.post("/account/search", {
            ...account,
            //객체에 데이터를 추가할 때 이름을 적지 않으면 해당 변수명과 동일하게 생김
            size,
            lastAccountId,
        });
        // console.log("data", data);
        setList(data.list); //덮어쓰기
        // setList(prev=>[...prev, ...data.list])//이어쓰기
        // setLast(data.last);
        last.current = data.last;
        loading.current = false;
    }, [account, lastAccountId, size]);


    const sendMore = useCallback(async e => {
        console.log("더보기가 실행하려고 생각합니다");
        if(loading.current === true)return;//이미 로딩중이면 하지마! 

        loading.current = true;//로딩시작했다. 
        console.log("더보기가 실행되었습니다");

        const { data } = await apiClient.post("/account/search", {
            ...account,
            //객체에 데이터를 추가할 때 이름을 적지 않으면 해당 변수명과 동일하게 생김
            size,
            lastAccountId,
        });
        // console.log("data", data);
        // setList(data.list); //덮어쓰기
        setList(prev => [...prev, ...data.list])//이어쓰기
        // setLast(data.last);
        last.current = data.last;
        loading.current = false;

    }, [account, lastAccountId, size]);

    const getScrollPercent = useCallback(()=>{
        //필요한 데이터들을 추출
        const { scrollY } = window;
        const { scrollTop, scrollHeight, clientHeight } = window.document.documentElement;
        //콘텐츠가 창보자 작은 경우(스크롤이 없는 경우) 처리
        if (scrollHeight <= clientHeight) return 0;
        //현재 스크롤의 위치 확인
        const current = scrollY || scrollTop;
        //스크롤 가능한 최대 위치 계산 
        const max = scrollHeight - clientHeight;
        //부동소수점 방식에서 발생하는 오차를 제거 
        if (max - current < 1) return 100;
        //비율을 계산해서 반환
        return current * 100 / max;
    }, []);


    //로딩중 상태를 표시하기 위한 값
    // const [loading, setLoading] = useState(false); //실행빈도가 낮을 때 (비동기로 자유롭게 마트에서 사도 되는 상황)
    //scroll처럼 발생빈도가 아주 높은 이벤트는 Ref로 처리 (동기로 마트에서 줄을 서야하는 상황)
    const loading = useRef(false); //실행빈도가 매우 높을 때 (예: scroll, resize)






    //화면이 시작되면 스크롤 이벤트를 설정 + 화면이 사라지면 스크롤 이벤트를 제거 
    //→클린업 함수를 포함하여 useEffect 훅을 작성해야함
    //


    //문제발생 : 스크롤이벤트를 등록하는 시점의 sendMore에는 lastAccountNo = null, size = 10이다. 
    //-갱신이 스스로 안된다. 
    //-해결책1. 사용되는 데이터를 Ref로 변경(하책)
    //-해결책2. 사용되는 함수를 Ref로 변경(상책...?)
    //-해결책3. 

    const sendMoreRef = useRef(null);
    useEffect(()=>{
        sendMoreRef.current = sendMore;
    }, [sendMore]);

    // 로딩플레그, 트로틀 
    //스크롤이 너무 많이 발생해서 조절해줘야함

    useEffect(()=>{
        console.log("화면시작했다.");

        const listner = throttle(()=>{
            console.log("스크롤 움직였어!");
            const percent = getScrollPercent();
            console.log("현재 스크롤의 위치 : " + percent.toFixed(2) + "%");
            // if(last === false && percent >= 99){
            //     console.log("더보기 실행");
            //     sendMore();
            // }
            //useRef로 만든 데이터는 연관항목에 없어도 마음대로 접근할 수 있다
            if(last.current === false && percent >= 99){
                if(sendMoreRef.current){
                    // console.log("더보기 실행");
                    sendMoreRef.current();
                }
                // console.log("더보기 실행");
                // sendMore();
            }
        },[]);
            window.addEventListener("scroll", listner);
        
        //클린업(clean-up)함수
        return()=>{
            console.log("화면 끝났다");
            window.removeEventListener("scroll", listner);
        }
    }, []);


    return (<>
        <Jumbotron title="회원 검색" content="키워드로 회원정보를 검색 및 조회할 수 있습니다." />
        <Form onSubmit={sendSearch} >
            <Row className="mt-4">
                <Form.Label column sm={3}>아이디</Form.Label>
                <Col sm={9}>
                    <Form.Control type="text" name="accountId" value={account.accountId}
                        onChange={changeStringValue}
                        placeholder="정확히 일치한 값 입력">

                    </Form.Control>
                </Col>
            </Row>
            <Row className="mt-4">
                <Form.Label column sm={3}>닉네임</Form.Label>
                <Col sm={9}>
                    <Form.Control type="text" name="accountNickname"
                        value={account.accountNickname}
                        onChange={changeStringValue}
                        placeholder="정확히 일치한 값 입력">

                    </Form.Control>
                </Col>
            </Row>
            <Row className="mt-4">
                <Form.Label column sm={3}>연락처</Form.Label>
                <Col sm={9}>
                    <Form.Control type="text" inputMode="tel"
                        name="accountContact" value={account.accountContact}
                        onChange={changeStringValue}></Form.Control>
                </Col>
            </Row>
            <Row className="mt-4">
                <Form.Label column sm={3}>이메일</Form.Label>
                <Col sm={9}>
                    <Form.Control type="email" inputMode="email" name="accountEmail"
                        value={account.accountEmail}
                        onChange={changeStringValue}
                        placeholder="일부분만 일치해도 검색"></Form.Control>
                </Col>
            </Row>
            <Row className="mt-4">
                <Form.Label column sm={3}>주소</Form.Label>
                <Col sm={9}>
                    <Form.Control type="text" name="accountAddress"
                        value={account.accountAddress}
                        onChange={changeStringValue}
                        placeholder="일부분만 일치해도 검색"></Form.Control>
                </Col>
            </Row>
            <Row className="mt-4">
                <Form.Label column sm={3}>생년월일</Form.Label>
                <Col sm={9}>
                    <div className="d-flex align-items-center">
                        <DatePicker name="accountBirthBegin"
                            locale={ko}
                            selected={account.accountBirthBegin}
                            onChange={(date) => {
                                //date가 우리가 원하는 형식이 아님(내일 변경 후 설정)
                                //->day.js를 이용해서 "YYYY-MM-DD"형태로 변경
                                const convertDate = dayjs(date).format("YYYY-MM-DD");
                                // console.log("convertDate", convertDate);
                                setAccount(prev => ({ ...prev, accountBirthBegin: convertDate }))
                            }}
                            dateFormat={"yyyy-MM-dd"}
                            customInput={<Form.Control />}
                            wrapperClassName="w-100"
                            showYearDropdown
                            showMonthDropdown
                            dropdownMode="select"
                        />
                        <TbTilde size={24} />
                        <DatePicker name="accountBirthEnd"
                            locale={ko}
                            selected={account.accountBirthEnd}
                            onChange={(date) => {
                                //date가 우리가 원하는 형식이 아님(내일 변경 후 설정)
                                //->day.js를 이용해서 "YYYY-MM-DD"형태로 변경
                                const convertDate = dayjs(date).format("YYYY-MM-DD");
                                // console.log("convertDate", convertDate);
                                setAccount(prev => ({ ...prev, accountBirthEnd: convertDate }))
                            }}
                            dateFormat={"yyyy-MM-dd"}
                            customInput={<Form.Control />}
                            wrapperClassName="w-100"
                            showYearDropdown
                            showMonthDropdown
                            dropdownMode="select"
                        />
                        {/* <Form.Control className="me-2" type="date" name="accountBirthBegin"
                            value={account.accountBirthBegin}
                            onChange={changeStringValue}></Form.Control>
                        <TbTilde size={24} />
                        <Form.Control className="ms-2" type="date" name="accountBirthEnd"
                            value={account.accountBirthEnd}
                            onChange={changeStringValue}></Form.Control> */}
                    </div>
                </Col>
            </Row>
            <Row className="mt-4">
                <Form.Label column sm={3}>가입일</Form.Label>
                <Col sm={9}>
                    <div className="d-flex align-items-center">
                        <DatePicker name="accountJoinBegin"
                            locale={ko}
                            selected={account.accountJoinBegin}
                            onChange={(date) => {
                                //date가 우리가 원하는 형식이 아님(내일 변경 후 설정)
                                //->day.js를 이용해서 "YYYY-MM-DD"형태로 변경
                                const convertDate = dayjs(date).format("YYYY-MM-DD");
                                // console.log("convertDate", convertDate);
                                setAccount(prev => ({ ...prev, accountJoinBegin: convertDate }))
                            }}
                            dateFormat={"yyyy-MM-dd"}
                            customInput={<Form.Control />}
                            wrapperClassName="w-100"
                            showYearDropdown
                            showMonthDropdown
                            dropdownMode="select"
                        />
                        <TbTilde size={24} />
                        <DatePicker name="accountJoinEnd"
                            locale={ko}
                            selected={account.accountJoinEnd}
                            onChange={(date) => {
                                //date가 우리가 원하는 형식이 아님(내일 변경 후 설정)
                                //->day.js를 이용해서 "YYYY-MM-DD"형태로 변경
                                const convertDate = dayjs(date).format("YYYY-MM-DD");
                                // console.log("convertDate", convertDate);
                                setAccount(prev => ({ ...prev, accountJoinEnd: convertDate }))
                            }}
                            dateFormat={"yyyy-MM-dd"}
                            customInput={<Form.Control />}
                            wrapperClassName="w-100"
                            showYearDropdown
                            showMonthDropdown
                            dropdownMode="select"
                        />
                        {/* <Form.Control className="me-2" type="date"
                            name="accountJoinBegin" value={account.accountJoinBegin}
                            onChange={changeStringValue}></Form.Control>
                        <TbTilde size={24} />
                        <Form.Control className="ms-2" type="date"
                            name="accountJoinEnd" value={account.accountJoinEnd}
                            onChange={changeStringValue}></Form.Control> */}
                    </div>
                </Col>
            </Row>
            <Row className="mt-4">
                <Form.Label column sm={3}>로그인일자</Form.Label>
                <Col sm={9}>
                    <div className="d-flex align-items-center">
                        <DatePicker name="accountLoginBegin"
                            locale={ko}
                            selected={account.accountLoginBegin}
                            onChange={(date) => {
                                //date가 우리가 원하는 형식이 아님(내일 변경 후 설정)
                                //->day.js를 이용해서 "YYYY-MM-DD"형태로 변경
                                const convertDate = dayjs(date).format("YYYY-MM-DD");
                                // console.log("convertDate", convertDate);
                                setAccount(prev => ({ ...prev, accountLoginBegin: convertDate }))
                            }}
                            dateFormat={"yyyy-MM-dd"}
                            customInput={<Form.Control />}
                            wrapperClassName="w-100"
                            showYearDropdown
                            showMonthDropdown
                            dropdownMode="select"
                        />
                        <TbTilde size={24} />
                        <DatePicker name="accountLoginEnd"
                            locale={ko}
                            selected={account.accountLoginEnd}
                            onChange={(date) => {
                                //date가 우리가 원하는 형식이 아님(내일 변경 후 설정)
                                //->day.js를 이용해서 "YYYY-MM-DD"형태로 변경
                                const convertDate = dayjs(date).format("YYYY-MM-DD");
                                // console.log("convertDate", convertDate);
                                setAccount(prev => ({ ...prev, accountLoginEnd: convertDate }))
                            }}
                            dateFormat={"yyyy-MM-dd"}
                            customInput={<Form.Control />}
                            wrapperClassName="w-100"
                            showYearDropdown
                            showMonthDropdown
                            dropdownMode="select"
                        />
                        {/* <Form.Control className="me-2" type="date"
                            name="accountLoginBegin" value={account.accountLoginBegin}
                            onChange={changeStringValue}></Form.Control>
                        <TbTilde size={24} />
                        <Form.Control className="ms-2" type="date"
                            name="accountLoginEnd" value={account.accountLoginEnd}
                            onChange={changeStringValue}></Form.Control> */}
                    </div>
                </Col>
            </Row>
            <Row className="mt-4">
                <Form.Label column sm={3}>포인트</Form.Label>
                <Col sm={9} className="d-flex">
                    <div className="d-flex align-items-center">
                        <Form.Control className="me-2" type="text" inputMode="numeric"
                            name="accountPointMin" value={account.accountPointMin}
                            onChange={changeNumericValue}></Form.Control>
                        <TbTilde size={24} />
                        <Form.Control className="ms-2" type="text" inputMode="numeric"
                            name="accountPointMax" value={account.accountPointMax}
                            onChange={changeNumericValue}></Form.Control>
                    </div>
                </Col>
            </Row>

            <Row className="mt-4">
                <Form.Label column sm={3}>차단여부</Form.Label>
                <Col sm={9} className="d-flex">
                    <Form.Check type="radio" label="전체" name="accountBlock"
                        value="" checked={account.accountBlock === ""}
                        onChange={e => setAccount(prev => ({ ...prev, accountBlock: "" }))}></Form.Check>
                    <Form.Check type="radio" label="차단된 회원만" name="accountBlock"
                        value="Y" checked={account.accountBlock === "Y"}
                        onChange={e => setAccount(prev => ({ ...prev, accountBlock: "Y" }))}></Form.Check>
                    <Form.Check type="radio" label="차단되지 않은 회원만" name="accountBlock"
                        value="N" checked={account.accountBlock === "N"}
                        onChange={e => setAccount(prev => ({ ...prev, accountBlock: "N" }))}></Form.Check>
                </Col>
            </Row>
            <Row className="mt-4">
                <Form.Label column sm={3}>등급</Form.Label>
                <Col sm={9} className="d-flex">
                    <Form.Check type="checkbox" label="전체선택"
                        onChange={changeListValueAll}
                        name="accountLevels"
                        checked={checkedAll.accountLevels}
                    ></Form.Check>
                    {/* {levelList.map((level, index)=>( */}
                    {dataList.accountLevels.map((level, index) => (
                        <Form.Check type="checkbox" label={level}
                            key={index}
                            onChange={changeListValue}
                            name="accountLevels"
                            checked={account.accountLevels.includes(level)}
                            value={level}
                        ></Form.Check>
                    ))}
                    {/* <Form.Check type="checkbox" label="실버"
                        onChange={changeListValue} 
                        name="accountLevels"
                        checked={account.accountLevels.includes("실버")}
                        value={"실버"}></Form.Check>
                    <Form.Check type="checkbox" label="골드" value={"골드"}></Form.Check>
                    <Form.Check type="checkbox" label="플래티넘" value={"플래티넘"}></Form.Check>
                    <Form.Check type="checkbox" label="다이아" value={"다이아"}></Form.Check>
                    <Form.Check type="checkbox" label="마스터" value={"마스터"}></Form.Check> */}
                </Col>
            </Row>
            <Row className="mt-4">
                <Form.Label column sm={3}>연습용</Form.Label>
                <Col sm={9} className="d-flex">
                    <Form.Check type="checkbox" label="전체선택"
                        onChange={changeListValueAll}
                        name="fruits"
                        checked={checkedAll.fruits}
                    ></Form.Check>
                    {dataList.fruits.map((fruit, index) => (
                        <Form.Check type="checkbox" label={fruit}
                            key={index}
                            onChange={changeListValue}
                            name="fruits"
                            checked={account.fruits.includes(fruit)}
                            value={fruit}
                        ></Form.Check>
                    ))}
                </Col>
            </Row>
            <Row className="mt-2">
                <Form.Label column sm={3}>더보기</Form.Label>
                <Col sm={9}>
                    <Form.Select onChange={e => setSize(parseInt(e.target.value))}
                        value={size}>
                        <option value="10">10개</option>
                        <option value="20">20개</option>
                        <option value="50">50개</option>
                        <option value="100">100개</option>
                    </Form.Select>
                </Col>
            </Row>


            <Row className="mt-5 text-end">
                <Col sm={9}>
                    {/* <Button type="reset" variant="danger" size="lg" 
                className="w-md-auto">
                    <FaEraser className="me-2" />
                    <span>초기화</span>
                </Button> */}
                    <Button type="submit" variant="success" size="lg"
                        className="w-md-auto">
                        <FaSearchengin className="me-2" />
                        <span>검색하기</span>
                    </Button>
                </Col>
            </Row>
        </Form>
        <hr />
        <Jumbotron title="회원정보 검색 결과↓" />
        <Row className="mt-5">
            <Col>
                <Table responsive striped hover className="text-nowrap">
                    <thead>
                        <tr>
                            <th>아이디</th>
                            <th>닉네임</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map(account => (
                            <tr key={account.accountId}>
                                <td>
                                    <Link to={`/admin/detail/${account.accountId}`}>
                                    {account.accountId}
                                    </Link>
                                </td>
                                <td>{account.accountNickname}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
        </Row>

        
    </>)
}


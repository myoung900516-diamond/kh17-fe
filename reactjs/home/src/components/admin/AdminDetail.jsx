import Jumbotron from "@templates/Jumbotron";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Col, Placeholder, Row } from "react-bootstrap";
import { FaKey, FaLock, FaMagnifyingGlass, FaPenToSquare, FaSpinner, FaUserLock } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiClient } from "@utils/reaxios";
import { certClient } from "@utils/reaxios";
import { toast } from "react-toastify";
import LoadingText from "@templates/LoadingText";
import Swal from "sweetalert2";


export default function AdminDetail() {

    //딱 한번만 최초 시점에 그 누구보다 빠르게 불러오는 처리 담당 (변경 불가)
    const { accountId } = useParams();


    const [account, setAccount] = useState(null);

    // const navigate = useNavigate();

    useEffect(() => {
        loadData();

    }, []);

    //[]안에 params와 ref는 쓰지 않는 관리되는 데이터만 씀. 

    const loadData = useCallback(async () => {
        const { data } = await apiClient.get(`/admin/${accountId}`);
        setAccount(data);
        console.log(data);
    }, [accountId]);

    const unionAddress = useMemo(() => {
        if (account === null) return undefined;
        if (account.accountPost === null) return "";
        if (account.accountAddress1 === null) return "";
        if (account.accountAddress2 === null) return "";
        return `[${account.accountPost}] ${account.accountAddress1} ${account.accountAddress2}`;
    }, [account]);

    const changeBlock = useCallback(async () => {
        // const { data } = 
        const result = await Swal.fire({
            title: `정말 ${account?.accountBlock === "N" ? "차단" : "차단해제"}하시겠습니까?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "실행하기",
            confirmButtonColor: "#d63031",
            cancelButtonText: "취소하기",
            cancelButtonColor: "#b2bec3"
        });
        if (result.isConfirmed === false) return;
        const { data } = 
        await apiClient.patch(`/admin/block/${accountId}`);
        // await apiClient.get(`/admin/${accountId}`);
        // console.log(data);
        setAccount(data);


        toast.success("변경 완료!");
        // navigate(0);

    }, [account]);
    //useparams는 항시 제어되는 값이라 연관항목에 넣지 않아도 됨. 


    //플래그는 모르겠으면  ref로 하고 발생빈도가 높지 않다면 성능을 위해 state
    // const sending = useRef(false);
    const [sending, setSending] = useState(false);



    const tempPassword = useCallback(async () => {
        if(sending === true) return;
        setSending(true);

        try{
            const { data } = await apiClient.post(`/admin/tempPassword/${accountId}`);
        toast.success("임시비밀번호 발급 완료!");
        }
        catch{
           toast.error("임시비밀번호 발급에 실패하였습니다. "); 
        }

        setSending(false);
    }, []);

    //로딩중인 화면을 따로 보여줄 때 
    // if(account === null){
    //     return (<h1>로딩중인 화면</h1>);
    // }

    //비동기 는 시간이 걸림. csr : client side rendering 
    // 이 방식은 사용자가 불편해함. 반드는 과정이 보여서. 서버와 통신하는 시간을. 
    //placeholder 화면을 하나 더 만들어야함. 

    //로딩완료시 화면
    return (<>
        <Jumbotron title={`${accountId ?? ""}회원의 상세정보`} />

        {/* ? : 없을 수도 있어. 처음값은 null이라서  */}
        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">아이디</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountId} width={100} />
            </Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">이메일</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountEmail} width={200} />
            </Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">닉네임</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountNickname} width={120} />
            </Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">생년월일</Col>
            <Col sm={9} className="text-secondary" >
                <LoadingText value={account?.accountBirth} width={100} />
            </Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">연락처</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountContact} width={100} />
            </Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">주소</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={unionAddress} width={"100%"} />
            </Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">등급</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountLevel} width={60} />
            </Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">가입한날</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountJoin} width={240} />
            </Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">최종로그인</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountLogin} width={240} />
            </Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">최종변경일</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountChange} width={240} />
            </Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">포인트</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountPoint} width={50} />
                <span className="ms-2">point</span>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">차단여부</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountBlock} width={50} />
            </Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">상태메세지</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountMessage} width={"100%"} line={2} />
            </Col>
        </Row>
        {/* 관리자 제어용 버튼들 */}
        <Row className="mt-5">
            <Col className="text-center">
                <Button type="button" onClick={tempPassword}
                    variant="warning" className="w-100 w-md-auto mb-2 mb-md-auto me-md-2">
                    {sending === false && (<>
                    <FaKey />
                    <span>임시비밀번호발급</span>
                    </>)}
                    {sending === true &&(<>
                    <FaSpinner className="spin"/>
                    <span className="ms-2">비밀번호 발송중...</span>    
                    </>)}
                </Button>
                {/* 차단/해제 버튼 : account.accountBlock 상태에 따라 달라짐 */}
                <Button type="button" onClick={changeBlock}
                    variant="danger" className="w-100 w-md-auto mb-2 mb-md-auto me-md-2" >
                    {account?.accountBlock === "Y" ? (<>
                        {/* <FaUnLock /> */}
                        <span className="mx-2">차단 해제하기</span>
                    </>) : (<>
                        <FaLock />
                        <span className="mx-2">차단 설정하기</span>
                    </>)}
                </Button>
                <Button as={Link} to="/admin/search" variant="primary"
                    className="w-100 w-md-auto mb-2 mb-md-auto me-md-2" >
                    <FaMagnifyingGlass />
                    <span>검색페이지로</span>
                </Button>
            </Col>
        </Row>


    </>)
}
import Jumbotron from "@templates/Jumbotron";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FaKey, FaLock, FaMagnifyingGlass, FaPenToSquare } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiClient } from "@utils/reaxios";


export default function AdminDetail() {


    const { accountId } = useParams();


    const [account, setAccount] = useState(null);

    // const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);
    const loadData = useCallback(async () => {
        const { data } = await apiClient.get(`/account/${accountId}`);
        setAccount(data);
        // console.log(data);
    }, [accountId]);

    const unionAddress = useMemo(() => {
        if (account === null) return "";
        if (account.accountPost === null) return "";
        if (account.accountAddress1 === null) return "";
        if (account.accountAddress2 === null) return "";
        return `[${account.accountPost}] ${account.accountAddress1} ${account.accountAddress2}`;
    }, [account]);

    const changeBlock = useCallback(async () => {
        // const { data } = 
        await apiClient.patch(`/account/block/${accountId}`);
        const { data } = await apiClient.get(`/account/${accountId}`);
        setAccount(data);
        // navigate(0);

    }, [account]);
    return (<>
        <Jumbotron title="회원 상세 정보" />

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">아이디</Col>
            <Col sm={9} className="text-secondary">
                <span>{account?.accountId}</span>
                {/* ? : 없을 수도 있어. 처음값은 null이라서  */}
            </Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">이메일</Col>
            <Col sm={9} className="text-secondary">{account?.accountEmail}</Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">닉네임</Col>
            <Col sm={9} className="text-secondary">{account?.accountNickname}</Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">생년월일</Col>
            <Col sm={9} className="text-secondary">{account?.accountBirth}</Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">연락처</Col>
            <Col sm={9} className="text-secondary">{account?.accountContact}</Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">주소</Col>
            <Col sm={9} className="text-secondary">
                {unionAddress}
            </Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">등급</Col>
            <Col sm={9} className="text-secondary">{account?.accountLevel}</Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">가입한날</Col>
            <Col sm={9} className="text-secondary">{account?.accountJoin}</Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">최종로그인</Col>
            <Col sm={9} className="text-secondary">{account?.accountLogin}</Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">최종변경일</Col>
            <Col sm={9} className="text-secondary">{account?.accountChange}</Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">포인트</Col>
            <Col sm={9} className="text-secondary">{account?.accountPoint}</Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">차단여부</Col>
            <Col sm={9} className="text-secondary">{account?.accountBlock}</Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">상태메세지</Col>
            <Col sm={9} className="text-secondary">{account?.accountMessage}</Col>
        </Row>
        {/* 각종 다른 기능으로 이동할 수 있는 링크들 */}
        <Row className="mt-5">
            <Col className="text-center">
                <Button as={Link} to="/admin/search" variant="primary">
                    <FaMagnifyingGlass />
                    <span>검색페이지로</span>
                </Button>
                <Button type="button" onClick={changeBlock}
                    variant="warning" className="ms-2" >
                    <FaLock />
                    <span>회원차단하기</span>
                </Button>
            </Col>
        </Row>


    </>)
}
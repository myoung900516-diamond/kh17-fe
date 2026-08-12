
import Jumbotron from "@templates/Jumbotron";
import { useCallback, useEffect, useState } from "react";
import { apiClient } from "@utils/reaxios";
import { Badge, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { FaPlus, FaXmark } from "react-icons/fa6";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { loginUserState, isLoginState } from "@utils/storage";
import Swal from "sweetalert2";


export default function WebSocketV4RoomList() {

    const loginUser = useAtomValue(loginUserState);
    const isLogin = useAtomValue(isLoginState);
    const [rooms, setRooms] = useState([]);//채팅방 목록
    const [roomCount, setRoomCount] = useState(0);//채팅방 개수

    useEffect(() => {
        loadRooms();//시작하자마자 방 목록을 불러온다
    }, []);

    const loadRooms = useCallback(async () => {
        const { data } = await apiClient.get("/room/");
        setRooms(data.rooms);
        setRoomCount(data.count);
        console.log(data);

    }, []);

    //모달
    const [show, setShow] = useState(false);

    const handleClose = useCallback(() => {
        setInput({ name: "", limit: "" });
        setShow(false)
    }, []);
    const handleShow = useCallback(() => setShow(true), []);

    //등록
    const [input, setInput] = useState({ name: "", limit: "" });
    const changeName = useCallback(e => {
        setInput(prev => ({
            name: e.target.value,
            limit: prev.limit
        }));
    }, []);
    const changeLimit = useCallback(e => {
        const replace = e.target.value.replace(/[^0-9]+/g, "");

        setInput(prev => ({
            name: prev.name,
            limit: parseInt(replace) || ""
        }));
    }, []);

    const createRoom = useCallback(async () => {
        if (isLogin === null) return;
        //input이 원치 않는 값이면 차단
        if (input.name.trim() === "") return;//스프링에서도 막지막 아예 전송을 안하는게 좋지


        try {
            const { data } = await apiClient.post("/room/", input);
            toast.success("채팅방이 생성되었습니다");
            loadRooms(); //순서가 중요한 작업이면 앞에 await를 쓴다. 
            handleClose();
        }
        catch (e) {
            toast.error("방 생성에 실패했습니다");
        }

    }, [input, isLogin]);

    const deleteRoom = useCallback(async (target) => {
        try {
            const { data } = await apiClient.delete(`/room/${target.roomNo}`);
            // loadRooms(); 목록요청
            setRooms(prev => prev.filter(room => room.roomNo !== target.roomNo));//직접제거
        }
        catch (e) {
            toast.error("방 삭제에 실패했습니다");
        }

    }, []);

    //방참여신청 후 이동
    const navigate = useNavigate();
    const joinRoom = useCallback(async (target) => {
        try {
            //방 신청 요청
            const { data } = await apiClient.post("/room/enter", { roomNo: target.roomNo });

            if (data.result === false) {//입장이 불가능 한 상황이라면 (인원초과, 차단, 등등등)
                await Swal.fire({
                    title: `방입장 불가`,
                    text: data.message,
                    icon: "error",
                    confirmButtonText: "확인",
                });
                return;

            }

            //방 페이지로 이동
            navigate(`/websocket/v4/${target.roomNo}`);
        }
        catch (e) {
            toast.error("일시적인 오류가 발생했습니다.");
        }
    }, []);

    return (<>
        <Jumbotron title="채팅방 목록" content="그룹 채팅 예제" />

        {/* 방 목록 출력 */}
        <Row className="mt-5">
            <Col xs={8}>
                <h4>현재 개설된 채팅방은 총 {roomCount}개 입니다.</h4>
            </Col>
            <Col xs={4} className="text-end">
                {isLogin && (
                    <Button variant="success" onClick={handleShow}>
                        <FaPlus />
                        <span className="ms-2">방 만들기</span>
                    </Button>
                )}
            </Col>
            {rooms.map(room => (
                <Col key={room.roomNo} xs={12} sm={6}>
                    {/* outer */}
                    <div className="p-2">
                        {/* inner */}
                        <div className={`shadow p-4 rounded
                                ${(isLogin && loginUser.accountId === room.roomOwner)
                                ? "border border-info" : ""}`}>
                            <h4>
                                <Badge>{room.roomNo}</Badge>
                                <span>{room.roomName}</span>

                            </h4>
                            <div>방장 : {room.roomOwner ?? "없음"}</div>
                            <div>인원 : {room.cnt}/ {room.roomLimit ?? "제한 없음"}</div>
                            <div className="text-end">
                                {/* 내 소유의 방이라면 삭제 버튼을 생성 */}
                                {(isLogin && loginUser.accountId === room.roomOwner) && (
                                    <Button variant="secondary" onClick={e => deleteRoom(room)}>
                                        삭제
                                    </Button>
                                )}
                                {/* 참여여부(enter)에 따라 버튼을 다르게 표시 */}
                                {room.enter === 'Y' && (
                                    <Button className="ms-2" disabled={!isLogin}
                                        onClick={e => joinRoom(room)}
                                        variant="info">
                                        입장
                                    </Button>
                                )}
                                {room.enter === 'N' && (

                                    <Button className="ms-2" disabled={!isLogin}
                                        onClick={e => joinRoom(room)}
                                        variant="success">
                                        참여
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </Col>
            ))}
        </Row>


        {/* 방 생성을 위한 모달 */}

        <Modal show={show} onHide={handleClose}>

            <Modal.Header closeButton>
                <Modal.Title>신규 방 만들기</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Form.Label column sm={3}>방 제목</Form.Label>
                    <Col sm={9}>
                        <Form.Control type="text" name="name"
                            value={input.name}
                            onChange={changeName} />
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Form.Label column sm={3}>인원 제한</Form.Label>
                    <Col sm={9}>
                        <Form.Control type="text" inputMode="numeric" name="limit"
                            placeholder="미작성 시 무제한으로 설정"
                            value={input.limit}
                            onChange={changeLimit} />
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>

                <Button variant="secondary" onClick={handleClose}>
                    <FaXmark />
                    <span className="ms-2">닫기</span>
                </Button>
                <Button variant="success" onClick={createRoom}>
                    <FaPlus />
                    <span className="ms-2">생성</span>
                </Button>
            </Modal.Footer>
        </Modal>
    </>);
}
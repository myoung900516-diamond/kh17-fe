

import Jumbotron from "@templates/Jumbotron";
import { useCallback, useEffect, useMemo, useState } from "react";
import { apiClient } from "@utils/reaxios";

import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Col, ListGroup, ListGroupItem, Row, Form } from "react-bootstrap";
import NoImage from "@assets/images/no-image.png";
import { FaArrowDown, FaCartPlus } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

import {debounce} from "lodash-es";


export default function AccountCart() {
    //시작하자마자 요청을 보내 받아온 장바구니 목록을 표시
    const [cartList, setCartList] = useState();

    useEffect(() => {
        loadData();
    }, []);
    const loadData = useCallback(async () => {
        const { data } = await apiClient.get("/cart/");
        // setCartList(data.cartItems);
        setCartList(data.cartItems.map(
            item => ({...item, choice : true})
        ))
        console.log("data.cartItems : ", data.cartItems);

        // console.log(data.cartItems);
    }, []);
    //할인율 계산 함수
    const calculateDiscountRate = useCallback((item) => {
        if (item.origin <= item.discount) return 0;
        if (item.discount === 0) return 100;
        const discount = item.origin - item.discount;
        const rate = discount * 100 / item.origin;
        return rate.toFixed(0);
    }, []);

    //수량 변경 함수(수량이 변경되면 서버에 바로 반영할 것인지 결정)
    //-수량이 변경되면 함수를 호출하여 서버로 전달하도록 요청
    const changeItemQty = useCallback((e, target) => {
        const { value } = e.target;
        const replacement = value.replace(/[^0-9]+/g, "");
        const number = parseInt(replacement) || 1;

        sendChangeQty(target, number);

        setCartList(
            prev => prev.map(
                item => {
                    if (item.no === target.no) {//수량이 변경된 아이템이면
                        return { ...item, qty: number };
                    }
                    return { ...item };
                }
            ));
    }, []);

    const sendChangeQty = useCallback(debounce(async (item, qty)=>{
        const { data } = await apiClient.patch("/cart/", {
            no: item.no ,
            qty : qty
        });
        console.log(data);
    }, 1000), []);

    const changeItemSelected = useCallback((e, target)=>{
        const {checked} = e.target;
        setCartList(
            prev => prev.map(
                item => {
                    if (item.no === target.no) {//수량이 변경된 아이템이면
                        return { ...item, choice: checked };
                    }
                    return { ...item };
                }
            ));
    }, []);

    //전체 체크
    const checkedAll = useMemo(()=>{
        return cartList?.reduce((acc, cur)=> acc && cur.choice ===true, true);
    }, [cartList]);

    const toggleAll = useCallback(e=>{
        const{checked} = e.target;
        setCartList(prev=>prev.map(
            item=>({...item, choice:checked})
        ))
        
    }, []);

    //[1] 체크된 상품의 총 계산금액을 구하여 하단에 출력

    const totalAmount = useMemo(()=>{
        return cartList?.reduce((acc, cur)=> 
                {
                    if(cur.choice === true){
                        return acc + (cur.discount*cur.qty)
                    }
                    return acc;
                }, 0);
    }, [cartList]);
    //[2] 체크된 상품의 할인전/후 금액을 각각 구하여 하단에 출력(=gmarket)
    const totalAmountObject = useMemo(()=>{
        return cartList?.reduce(
            (acc, cur)=>{
                if(cur.choice === true){
                    return {
                        origin : acc.origin + cur.origin*cur.qty,
                        discount : acc.discount + cur.discount*cur.qty
                    }
                }
                return acc;
            }, 
            {origin : 0, discount : 0}//초기값
        )
    }, [cartList]);
    const navigate = useNavigate();
    const purchase = useCallback(()=>{
        //파라미터 생성도구 만들기
        const params = new URLSearchParams();//javascript도구
        //체크된 모든 항목의 상품번호와 수량을 콜론(:)을 두고 합성해서 추가
        // console.log(cartList);
        cartList.forEach(item=>{
            if(item.choice === true){
                const value = `${item.no}:${item.qty}`;
                params.append("sale", value);
                // params.set("sale", value);
            }
        });
        // console.log(params);

        //파라미터를 추가해서 구매페이지로 이동 
        navigate(`/pay/v2/buy?${params.toString()}`);
    },[cartList]);
    return (<>
        <Jumbotron title="장바구니" content="상품 수량을 확인하고 구매를 진행해주세요" />



        <Row className="mt-5">
            <Col>
                <div className="mb-2">
                    <Form.Check type="checkbox" label="전체 선택"
                    checked={checkedAll}
                    onChange={toggleAll}>

                    </Form.Check>
                </div>
                <ListGroup>
                    {cartList?.map(item => (
                        <ListGroupItem key={item.no}>
                            <div className="d-flex align-items-center">
                                <Form.Check type="checkbox" className="mx-2"
                                    checked={item.choice === true}
                                    onChange={e=>changeItemSelected(e,item)}/>
                                <img src={
                                    item.thumbnail ?
                                        `${import.meta.env.VITE_SERVER_URL}/api/attach/${item.thumbnail}`
                                        : NoImage
                                } width={100} />

                                <div className="ms-4 flex-grow-1">
                                    <h4 className="fw-bold text-info">{item.name}</h4>
                                    {item.origin > item.discount ? (<>
                                        <s className="text-muted">
                                            {item.origin.toLocaleString()}원
                                        </s>
                                        <br />
                                        <b className="text-danger">
                                            {item.discount.toLocaleString()}원
                                        </b>
                                        <span className="text-success"><FaArrowDown /> {
                                            calculateDiscountRate(item)
                                        }%</span>
                                    </>
                                    ) : (
                                        <b>{item.origin.toLocaleString()}원</b>
                                    )}

                                </div>
                                <div className="text-muted">
                                    <span>수량 : </span>
                                    <Form.Control type="number" inputMode="numeric"
                                        value={item.qty} min={1}
                                        onChange={e => changeItemQty(e, item)}
                                        className="d-inline-block mx-2"
                                        style={{ width: 75 }} />

                                    <span>개</span>
                                </div>

                            </div>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </Col>
        </Row>

        {/* 총 금액 */}
        {/* <Row className="mt-5">
            <Col className="text-end fs-2 fw-bold text-info" sm={3}>총금액</Col>
            <Col className="text-end fs-2 fw-bold text-info" sm={9}>
                     {totalAmount.toLocaleString()}원
            </Col>
        </Row> */}

            <Row className="mt-5 text-end fs-3">
                <Col>
                    <div className="d-flex justify-content-between">
                        <span>판매금액</span>
                        <span>{totalAmountObject?.origin.toLocaleString()}원</span>
                    </div>
                </Col>
            </Row>
            <Row className="text-end fs-3">
                <Col>
                    <div className="d-flex justify-content-between">
                        <span>할인금액</span>
                        <span>{(totalAmountObject?.origin - totalAmountObject?.discount).toLocaleString()}원</span>
                    </div>
                </Col>
            </Row>
            <Row className="text-end fs-3">
                <Col>
                    <div className="d-flex justify-content-between">
                        <span>결제금액</span>
                        <span>{totalAmountObject?.discount.toLocaleString()}원</span>
                    </div>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <Button variant="success" size="lg" className="w-100"
                    onClick={purchase}>
                        <FaCartShopping/>
                        <span className="ms-1">구매하기</span>
                    </Button>
                </Col>
            </Row>
    </>)
}
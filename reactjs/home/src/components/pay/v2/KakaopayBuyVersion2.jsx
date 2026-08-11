import Jumbotron from "@templates/Jumbotron";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiClient } from "@utils/reaxios";
import { Button, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import NoImage from "@assets/images/no-image.png";
import { FaArrowDown, FaCartPlus } from "react-icons/fa";

// 계획
// 이 페이지는 전체 상품 목록이 아니라 구매하려는 상품의 목록을 보여주는 페이지 
// 기존에 만든 상품 페이지에서 구매를 누르면 이쪽을 해당 상품을 전달해야함

// [1] 서버에 임시 결제 예정 정보를 저장하고 해당 번호만 절달하여 불러오는 방법
// (ex) 1번상품 3개, 2번상품 5개 = 주문번호 7번
//(장점) 1. 번호 하나로 무수히 많은 결제정보를 저장하고 불러올 수 있다. 
//(장점) 2. 결제가 진행중인 경우를 기억해서 나중에 알려줄 수 있다.  
//(단점) DB 테이블이 필요하다. 추가 관리 로직이 필요하다. 

// [2] 파라미터로 상품번호와 구매수량을 전달하는 방식 
// (ex) 1번상품 3개, 2번상품 5개 = ?sale=1:3&sale=2:5
// (장점) DB가 필요없고 외부에 공유할 수 있다. 
// (단점) 주소가 길어지고 파라미터 관리 코드가 필요 




export default function KakaopayBuyVersion2() {

    //useParams()는 경로 변수를 읽는 명령 (라우터에 설정이 되어 있어야함)
    //useSearchParams()는 쿼리 파라미터를 읽는 명령

    const [searchParams, setSearchParams] = useSearchParams();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadData();


    }, []);

    const loadData = useCallback(async () => {
        //쿼리 파라미터를 읽어서 해석한 뒤 orders에 채움
        //?sale=1:5&sale=3:2&sale=5:1&...

        const params = searchParams.getAll("sale")
            .map(str => {
                // : 을 기준으로 분해해서 앞이 saleNo, 뒤가 quantity(qty)인 형태의 객체로 반환
                const [saleNo, quantity] = str.split(":");
                // const arr = str.split(":");
                return {
                    saleNo: parseInt(saleNo),
                    quantity: parseInt(quantity)
                }
            })
            .filter(sale => {
                if (Number.isInteger(sale.saleNo) === false) return false;//숫자가 아니면 
                if (Number.isInteger(sale.quantity) === false) return false;
                if (sale.saleNo <= 0) return false;
                if (sale.quantity <= 0) return false;

                return true;
            });
        console.log("params : ", params);

        //params 데이터 : [ { saleNo : 1,quantity:5 }, { saleNo : 3,quantity:1 },]
        //서버에 보낼 데이터 : {"saleNumbers" : [1,3, ...] }
        // const {data} = await apiClient.post("/sale/orders", 
        //     //[1,3, ...] -> List<Integer>
        //     params.map(sale=>sale.saleNo) );
        const { data } = await apiClient.post("/sale/orders",
            //{"saleNumbers" : [1, 3, ...]} ->Class(VO) 객채로 넘어감
            { saleNumbers: params.map(sale => sale.saleNo) });
        console.log("data :", data);


        //params와 data의 정보를 합치기 위해 params의 원래의 객체배열 방식을 key(saleNo)-value(quantity)형태로 바꾼다. 

        //최종병합
        //-params에는 saleNo와 quantity가 존재
        //-data.saleList에는 saleDto가 존재
        //-params를 key=value 형태로 바꾸고 data.saleList를 순회하며 saleNo와 매칭되는 수량을 찾아서 추가

        const paramsMap = new Map(
            // [ [k , v], [k , v], [k , v], ...  ]
            params.map(p => [p.saleNo, p.quantity])
        );

        console.log("paramsMap : ", paramsMap);

        //최종합쳐진 데이터
        const result = data.saleList.map(
            sale => ({
                ...sale,
                quantity: paramsMap.get(sale.saleNo)
            })
        );
        console.log("result", result);

        setOrders(result);
    }, []);

    //할인율 계산 함수
    const calculateDiscountRate = useCallback((order) => {
        if (order.saleOriginalPrice <= order.saleDiscountPrice) return 0;
        if (order.saleDiscountPrice === 0) return 100;
        const discount = order.saleOriginalPrice - order.saleDiscountPrice;
        const rate = discount * 100 / order.saleOriginalPrice;
        return rate.toFixed(0);
    }, []);

    const navigate = useNavigate();
    const purchase = useCallback(async () => {
        const { data } = await apiClient.post(
            "/kakaopay/v2/buy",
            //화살표 뒤에 {}가 객체인지 함수인지 헷갈릴때는 함수로 인식함 그래서 ()괄호로 감싸준다.
            // orders .map(order => ({
            //     saleNo : order.saleNo, 
            //     quantity : order.quantity
            // }))
            {
                orders: orders.map(order => ({
                            saleNo: order.saleNo,
                            quantity: order.quantity
                        }))
            }
        );

        console.log(data.url);
        navigate(data.url);

    }, [orders]);


    return (<>
        <Jumbotron title="상품결제확인" content="구매하실 상품의 정보를 확인하세요" />

        <Row>
            <Col>
                <ListGroup>
                    {orders.map(order => (
                        <ListGroupItem key={order.saleNo}>
                            <div className="d-flex">
                                <img src={
                                    order.attachNo ?
                                        `${import.meta.env.VITE_SERVER_URL}/api/attach/${order.attachNo}`
                                        : NoImage
                                } width={100} />

                                <div className="ms-4 flex-grow-1">
                                    <h4 className="fw-bold text-info">{order.saleName}</h4>
                                    <div className="text-muted">수량 : {order.quantity}개</div>
                                </div>
                                {order.saleOriginalPrice > order.saleDiscountPrice ? (<>
                                    <s className="text-muted">
                                        {order.saleOriginalPrice.toLocaleString()}원
                                    </s>
                                    <br />
                                    <b className="text-danger">
                                        {order.saleDiscountPrice.toLocaleString()}원
                                    </b>
                                    <span className="text-success"><FaArrowDown /> {
                                        calculateDiscountRate(order)
                                    }%</span>
                                </>
                                ) : (
                                    <b>{order.saleOriginalPrice.toLocaleString()}원</b>
                                )}

                            </div>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </Col>
        </Row>

        <Row className="mt-5">
            <Col>
                <Button variant="success" size="lg" className="w-100"
                    onClick={purchase}>
                    <FaCartPlus />
                    <span className="ms-2">구매하기</span>
                </Button>
            </Col>
        </Row>


    </>)
}
import Jumbotron from "@templates/Jumbotron";
import { useCallback, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { apiClient } from "@utils/reaxios";
import NoImage from "@assets/images/no-image.png";
import Badge from 'react-bootstrap/Badge';
import { FaArrowDown, FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

//상대경로로 불러올 때는 ./부터 시작해야함(파일명만 작성하면 안됨)
import "./SaleList.css";


//mvvm view-model 구조
export default function SaleList() {
    //state
    const [items, setItems] = useState([]);

    
    const loadItems = useCallback(async () => {
        const { data } = await apiClient.post("/sale/list", {});
        //data는 백엔드에서의 SaleListResponseVO
        setItems(data.items);
    }, []);
    
    useEffect(() => {
        loadItems();
    }, []);
    //일회용함수
    // const calculateDiscountPercent = useCallback((origin, discount)=>{
    //     return 100-(discount * 100/origin);
    // }, []);

    // const calculateDiscountPercent = useCallback(({saleOriginalPrice, saleDiscountPrice})=>{
    //     return 100-(saleDiscountPrice * 100/saleOriginalPrice);
    // }, []);

    return (<>
        <Jumbotron title="상품목록" content="등록된 상품 목록을 볼 수 있습니다" />
        {/* 상품목록-카드 리스트 형태로 출력 */}
        <Row className="mt-5">
            <Col className="item-container">
                {items.map(item => {
                    //추가 코드 작성(현재 회차에서만 유효한 코드)
                    const { saleOriginalPrice, saleDiscountPrice } = item;
                    const percent = saleDiscountPrice * 100 / saleOriginalPrice;
                    const discount = 100 - percent;
                    const result = discount.toLocaleString();

                    const isDiscount = saleOriginalPrice > saleDiscountPrice;

                    const imageUrl = `${import.meta.env.VITE_SERVER_URL}/api/attach/${item.attachNo}`;
                    return (
                        <div key={item.saleNo} className="item mb-4 p-2">
                            <Card >
                                <Card.Img variant="top"
                                    src={item.attachNo === null ? NoImage : imageUrl}
                                    style={ 
                                         { 
                                            width : "auto",
                                            height: 200, 
                                            objectFit : "contain", //세로폭맞춤
                                            // objectFit : "cover", 가로폭맞춤
                                            objectPosition : "center"

                                        }
                                        } />
                                <Card.Body>
                                    <Card.Title className="text-truncate">{item.saleName}</Card.Title>
                                    <Card.Text>
                                        <div>
                                            <Badge bg="info">
                                                {item.saleCategory}
                                            </Badge>
                                        </div>
                                        <div className="mt-4 fs-4" style={{ height: 120 }}>
                                            {isDiscount ? (<>
                                                <s className="text-muted">
                                                    {item.saleOriginalPrice.toLocaleString()}원
                                                </s>
                                                <br />
                                                <b className="text-danger">
                                                    {item.saleDiscountPrice.toLocaleString()}원
                                                </b>
                                                {/* (<FaArrowDown/>{100-item.saleDiscountPrice*100/item.saleOriginalPrice}%) */}
                                                {/* (<FaArrowDown/> {calculateDiscountPercent(item.saleOriginalPrice, item.saleDiscountPrice)}); */}
                                                {/* (<FaArrowDown/> {calculateDiscountPercent(item)}); */}
                                                <span>(<FaArrowDown /> {result}%);</span>
                                            </>
                                            ) : (
                                                <b>{item.saleOriginalPrice.toLocaleString()}원</b>
                                            )}
                                        </div>
                                        <div>
                                            {item.saleContent}
                                        </div>
                                    </Card.Text>
                                    <Button className="text-end" variant="primary" as={Link} to={`/sale/detail/${item.saleNo}`}>
                                        상세보기<FaArrowRight />
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    )})}
            </Col>
        </Row>
    </>)
}

//내부적으로만 사용하는 하위 컴포넌트
function ItemCard({item}){
    return(<></>)
}
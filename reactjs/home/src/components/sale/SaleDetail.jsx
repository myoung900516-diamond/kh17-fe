import Jumbotron from "@templates/Jumbotron";
import { useCallback, useEffect, useMemo, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";
import { apiClient } from "@utils/reaxios";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import NoImage from "@assets/images/no-image.png";
import Row from "react-bootstrap/esm/Row";
import Badge from "react-bootstrap/esm/Badge";
import { FaBagShopping } from "react-icons/fa6";
import { purifyHtml } from "@utils/purify";


export default function SaleDetail() {

    const { saleNo } = useParams();

    const [sale, setSale] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [detailImages, setDetailImages] = useState([]);

    const loadData = useCallback(async () => {
        const { data } = await apiClient.get(`/sale/${saleNo}`);
        const { saleDto, thumbnail, detailImages } = data;
        setSale(saleDto);
        setThumbnail(thumbnail);
        setDetailImages(detailImages);
        console.log(data);
    }, []);
    useEffect(() => {
        loadData();
    }, []);





    //썸네일 주소 계산
    const thumbnailUrl = useMemo(() => {
        if (thumbnail === null) return NoImage;
        return `${import.meta.env.VITE_SERVER_URL}/api/attach/${thumbnail.attachNo}`;
    }, [thumbnail]);


    if (sale === null) {
        return <h1>loading...</h1>
    }

    return (<>
        <Jumbotron title="상품상세정보" content="상품의 정보를 볼 수 있습니다." />
        <Row className="mt-5">

            {/* 이미지, 썸네일 영역 */}
            <Col sm={6}>
                <img src={thumbnailUrl} width={"100%"}></img>
            </Col>
            {/* 상품정보영역 */}
            <Col sm={6}>
                <h3>{sale.saleName}</h3>
                <div>
                    <Badge bg="info">
                        {sale.saleCategory}
                    </Badge>
                </div>
                {/* 할인이 없는 경우 */}
                {sale.saleOriginalPrice === sale.saleDiscountPrice && (
                    <div>
                        <b className="text-info">{sale.saleOriginalPrice.toLocaleString()}원</b>
                    </div>
                )}
                {/* 할인이 있는 경우 */}
                {sale.saleOriginalPrice > sale.saleDiscountPrice && (
                    <div>
                        <s className="text-muted">{sale.saleOriginalPrice.toLocaleString()}원</s>
                        <b className="text-danger ms-2">00%</b>
                    </div>
                )}

                {/* 구매수량 선택 및 구매 or 장바구니버튼 */}
                <div className="mt-4">
                    현재 <b>{sale.saleStock}</b>개 남음
                </div>
                <div className="mt-2 d-flex">
                    <Form.Control type="number" className="d-inline-block"
                        style={{ width: 80 }} value={1} />
                    <Button variant="success" className="ms-2">
                        구매
                    </Button>
                    <Button variant="secondary" className="ms-2">
                        <FaBagShopping />장바구니
                    </Button>
                </div>
            </Col>
        </Row>
        {detailImages.length > 0 && (

            // {/* 상세이미지 */}
            <Row className="mt-5">
                <Col>
                    {detailImages.map(detail => {
                        const url = `${import.meta.env.VITE_SERVER_URL}/api/attach/${detail.attachNo}`;
                        return (
                            <img key={detail.attachNo} src={url} width={"100%"} />
                        )
                    })}
                </Col>
            </Row>

        )}
        <Row className="mt-5">
            <Col>
                {/* 추가 상세정보 출력 */}
                {/* 모던 웹에서는 HTML 렌더링을 극도로 경계하며 이는 위험한 보안 문제가 발생할 수 있음 */}
                {/* xss : cross site script 공격 */}

                {/* 대안
                    -> 위험 요소를 제거하는 라이브러리(ex:dompurify)를 사용
                */}
                <div dangerouslySetInnerHTML={
                    // { __html: sale.saleContent }
                    {
                        __html:purifyHtml(sale.saleContent)
                    }
                }>
                </div>
            </Col>
        </Row>
                {/* 
                    관리자만 볼 수 있는 삭제버튼 
                */}

                

    </>)
}
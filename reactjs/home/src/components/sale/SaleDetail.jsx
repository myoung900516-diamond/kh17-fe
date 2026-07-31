import Jumbotron from "@templates/Jumbotron";
import { useCallback, useEffect, useMemo, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiClient } from "@utils/reaxios";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import NoImage from "@assets/images/no-image.png";
import Row from "react-bootstrap/esm/Row";
import Badge from "react-bootstrap/esm/Badge";
import { FaBagShopping, FaList, FaMinus, FaSquarePen, FaTrash } from "react-icons/fa6";
import { purifyHtml } from "@utils/purify";
import { useAtomValue } from "jotai";
import { isAdminState } from "@utils/storage";
import Swal from "sweetalert2";
import { toast } from "react-toastify";


export default function SaleDetail() {
    //관리자 권한 확인 
    const isAdmin = useAtomValue(isAdminState);

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



    const navigate = useNavigate();


    //썸네일 주소 계산
    const thumbnailUrl = useMemo(() => {
        if (thumbnail === null) return NoImage;
        return `${import.meta.env.VITE_SERVER_URL}/api/attach/${thumbnail.attachNo}`;
    }, [thumbnail]);

    const deleteByAdmin = useCallback(async () => {
        const result = await Swal.fire({
            title: `정말 삭제하시겠습니까?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "실행하기",
            confirmButtonColor: "#d63031",
            cancelButtonText: "취소하기",
            cancelButtonColor: "#b2bec3"
        });
        if (result.isConfirmed === false) return;

        const { data } = await apiClient.delete(`/sale/${saleNo}`);
        console.log(data);
        toast.success("삭제 완료");
        navigate("/sale/list");
    }, []);

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
                        style={{ width: 80 }} value={1} readOnly />
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
                        __html: purifyHtml(sale.saleContent)
                    }
                }>
                </div>
            </Col>
        </Row>
        <Row>
            <Col className="text-end">
                <Button variant="info" className="w-md-auto">
                    <FaList />
                    <span className="ms-2">목록으로</span>
                </Button>
            </Col>
        </Row>
        {/* 
                    관리자만 볼 수 있는 삭제버튼 
                */}
        {isAdmin === true && (


            <Row className="mt-5">
                <Col className="text-end">
                    <Button variant="info" size="lg" as={Link} to={"/sale/list"}>
                        <FaList />
                        <span className="ms-2">목록으로</span>
                    </Button>
                    <Button variant="danger" size="lg" className="ms-2" onClick={deleteByAdmin}>
                        <FaTrash />
                        <span className="ms-2">삭제하기</span>
                    </Button>
                    {/* 수정링크 */}
                    <Button variant="warning" size="lg"
                        as={Link} to={`/admin/sale/edit/${saleNo}`}
                        className="ms-2">
                        <FaSquarePen />
                        <span className="ms-2">상품 정보 수정</span>
                    </Button>
                </Col>
            </Row>
        )}

    </>)
}
import Jumbotron from "@templates/Jumbotron";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaPlug, FaPlus, FaXmark } from "react-icons/fa6";
import { toast } from "react-toastify";
import { apiClient } from "@utils/reaxios";
import Editor from "react-simple-wysiwyg";
import NoImage from "@assets/images/no-image.png";

export default function AdminSaleAdd() {

    //state
    const [sale, setSale] = useState({
        saleName: "",
        saleCategory: "",
        saleOriginalPrice: "",
        saleDiscountPrice: "",
        saleContent: "",
        saleStock: ""

    });

    const [discount, setDiscount] = useState(false);

    //썸네일(대표이미지) 파일 state
    const [thumbnail, setThumbnail] = useState(null);

    const thumbnailRef = useRef();

    //(+변경사항) 2023년 3월 이후로 취소버튼은 onchange, oninput으로 감지되지 않습니다.
    const changeThumbnail = useCallback(e => {

        const file = e.target.files?.[0];
        setThumbnail(file);


    }, []);

    const clearThumbnail = useCallback(() => {
        setThumbnail(null);
    }, []);

    useEffect(() => {
        if (thumbnail !== null) return;
        //파일선택창은 비어있는 value밖에 줄 수 없어서 리액트에서 모든 상황을 제어할 수 없다(HTML보안 이슈)
        //태그를 직접 제어하는 방향으로 우회처리한다(ref사용)
        thumbnailRef.current.value = "";

    }, [thumbnail]);

    //상세이미지 관련 도구들
    const [detailImages, setDetailImages] = useState([]);
    const detailImagesRef = useRef();

    const changeDetailImages = useCallback(e=>{
        setDetailImages(e.target.files);
    }, []);
    const clearDetailImages = useCallback(e=>{
        setDetailImages([]);
    }, []);

    useEffect(()=>{
        if(detailImages.length>0) return;
        detailImagesRef.current.value="";
    },[detailImages]);

    //callback

    const changeStringValue = useCallback(e => {
        const { name, value } = e.target;
        setSale(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);
    const changeNumericValue = useCallback(e => {
        const { name, value } = e.target;
        const replacement = value.replace(/[^0-9]+/g, "");
        const result = replacement.length === 0 ? "" : parseInt(replacement);
        setSale(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const sendData = useCallback(async () => {
        //discount가 false명 sale에서 saleDiscountPrice를 제거 
        //-원본을 절대로 지우면 안됨
        // const copy = {...sale};
        // if(discount === false) delete copy.saleDiscountPrice;
        // const {data} = await apiClient.post("/sale/", copy);
        const { saleDiscountPrice, ...copy } = sale;
        if (discount === true)
            copy.saleDiscountPrice = saleDiscountPrice;

        // const {data} = await apiClient.post("/sale/", copy);

        //파일을 보낼 때는 보내는 방식이 달라짐 
        //application/json -> form-data
        //<form>대신 FormData를 쓰고, <input>대신 append를 이용해서 key=value를 추가
        //-copy를 FormData로 변환한뒤 전송하면 파일도 이곳에 첨부가 가능하다

        //[1] 데이터와 파일을 같은 레벨로 담아서 전송 → Spring에서 @ModellAttribute로 이름 맞춰서 수신
        //[2] 데어터 따로, 파일 따로 담아서 전송 → Spring에서 @RequestPart로 수신

        //[1]
        // const form = new FormData();
        // form.append("saleName", copy.saleName);
        // form.append("saleCategory", copy.saleCategory);
        // form.append("saleOriginalPrice", copy.saleOriginalPrice);
        // if (discount)
        //     form.append("saleDiscountPrice", copy.saleDiscountPrice);
        // form.append("saleStock", copy.saleStock);
        // form.append("saleContent", copy.Content);


        //썸네일을 form에 추가(데이터와 파일을 같은 레벨로 처리)
        // form.append("thumbnail", thumbnail);


        //[2] 2개의 파트를 전송함 
        const form = new FormData();
        form.append("sale", new Blob(
            [JSON.stringify(copy)],
            {type : "application/json"}
        ));
        form.append("thumbnail", thumbnail);

        //같은 종류의 데이터가 여러개의 경우 같은 이름으로 계속 첨부(배열을 한번에 첨부하는게 아님)
        //→spring에서는 list로 받음
        detailImages.forEach(img=>{
            form.append("detailImages", img);
        });
        


        const { data } = await apiClient.post("/sale/", form);


        console.log(data);
        toast.success("상품 등록이 완료되었습니다");
        setSale({
            saleName: "",
            saleCategory: "",
            saleOriginalPrice: "",
            saleDiscountPrice: "",
            saleContent: "",
            saleStock: "",

        });
        setThumbnail (null);


    }, [sale, discount, thumbnail, detailImages]);

    //할인을 해제하면 할인가를 삭제
    useEffect(() => {
        if (discount === false) {
            setSale(prev => ({ ...prev, saleDiscountPrice: "" }));
        }
    }, [discount]);

    //미리보기에 넣을 src 데이터
    const [previewSrc, setPreviewSrc] = useState(null);

    //썸네일이 변경되면 미리보기를 갱신(createObjectURL + revokeObjectURL)
    useEffect(()=>{
        if(thumbnail === null){
            setPreviewSrc(null);
            return;
        }

        //이미지 미리보기 주소 생성
        const previewUrl = URL.createObjectURL(thumbnail);
        setPreviewSrc(previewUrl);

        //클린업 함수
        return ()=>{
            URL.revokeObjectURL(previewUrl);//생성된 미리보기 주소 제거
        };
    }, [thumbnail]);


    return (<>
        <Jumbotron title="상품등록" content="상품등록을 위한 정보를 입력하세요." />

        <Row className="mt-5">
            <Form.Label column sm={3}>상품명</Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="saleName" value={sale.saleName}
                    onChange={changeStringValue} placeholder="e.g., 갤럭시 노트9">

                </Form.Control>
            </Col>
        </Row>
        <Row className="mt-4">
            <Form.Label column sm={3}>카테고리</Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="saleCategory" value={sale.saleCategory}
                    onChange={changeStringValue} placeholder="e.g., 통신기기">

                </Form.Control>
            </Col>
        </Row>
        <Row className="mt-4">
            <Form.Label column sm={3}>정가</Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="saleOriginalPrice"
                    value={sale.saleOriginalPrice}
                    onChange={changeNumericValue} placeholder="e.g., 2000000">

                </Form.Control>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col sm={{ offset: 3, span: 9 }}>
                <Form.Check type="switch" label="할인적용"
                    checked={discount === true}
                    onChange={e => setDiscount(e.target.checked)} />
            </Col>
        </Row>
        {discount && (

            <Row className="mt-4">
                <Form.Label column sm={3}>할인가</Form.Label>
                <Col sm={9}>
                    <Form.Control type="text" name="saleDiscountPrice"
                        value={sale.saleDiscountPrice}
                        onChange={changeNumericValue} placeholder="e.g., 1800000">

                    </Form.Control>
                </Col>
            </Row>
        )}
        <Row className="mt-4">
            <Form.Label column sm={3}>재고수량</Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="saleStock"
                    value={sale.saleStock}
                    onChange={changeNumericValue} placeholder="e.g., 10">

                </Form.Control>
            </Col>
        </Row>
        <Row className="mt-4">
            <Form.Label column sm={3}>상품설명</Form.Label>
            <Col sm={9}>
                {/* <Form.Control as="textarea" rows={4}
                    name="saleContent" value={sale.saleContent}
                    onChange={changeStringValue}
                    placeholder="e.g., 상품에 대한 상세설명">

                </Form.Control> */}
                <Editor value={sale.saleContent} onChange={changeStringValue}
                    name="saleContent"
                    containerProps={
                        {
                            style:{
                                resize:"none",//or vertical or both
                                minHeight:250
                            }
                        }
                        }/>
            </Col>
        </Row>

        {/* 썸네일 */}
        <Row className="mt-4">
            <Form.Label column sm={3}>대표이미지</Form.Label>
            <Col sm={9}>
                <div className="d-flex">
                    <Form.Control type="file" accept="image/*"
                        // multiple
                        ref={thumbnailRef}
                        onChange={changeThumbnail}

                        placeholder="e.g., 이미지선택">
                    </Form.Control>
                    {thumbnail !== null && (

                        <Button variant="danger" onClick={clearThumbnail} className="ms-2">
                            <FaXmark />
                        </Button>
                    )}
                </div>
            </Col>
        </Row>
        <Row className="mt-2">
            <Col>
            <img src={previewSrc ?? NoImage} width={100} height={100}></img>
            {/* <img src="/public에 이미지가 있으면 경로로 써주세요" width={100} height={100}></img> */}
            </Col>
        </Row>
        {/* 상세이미지 */}
        <Row className="mt-4">
            <Form.Label column sm={3}>상세이미지</Form.Label>
            <Col sm={9}>
                <div className="d-flex">
                    <Form.Control type="file" accept="image/*"
                        multiple
                        ref={detailImagesRef}
                        onChange={changeDetailImages}

                        placeholder="e.g., 이미지선택">
                    </Form.Control>
                    {detailImages.length>0 && (

                        <Button variant="danger" onClick={clearDetailImages}
                         className="ms-2">
                            <FaXmark />
                        </Button>
                    )}
                </div>
            </Col>
        </Row>
        <Row className="mt-5">
            <Col className="text-end">
                <Button variant="success" size="lg"
                    className="w-md-auto" onClick={sendData}>
                    <FaPlus />
                    <span className="ms-2">상품 등록하기</span>
                </Button>
            </Col>
        </Row>
    </>);
}
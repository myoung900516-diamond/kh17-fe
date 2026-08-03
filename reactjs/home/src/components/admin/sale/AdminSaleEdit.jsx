import Jumbotron from "@templates/Jumbotron";
import { useParams } from "react-router-dom";
import { apiClient } from "@utils/reaxios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, Col, Form, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { FaPlus, FaXmark, FaSquarePen, FaRotateRight } from "react-icons/fa6";
import { toast } from "react-toastify";
import Editor from "react-simple-wysiwyg";
import NoImage from "@assets/images/no-image.png";
import Swal from "sweetalert2";

export default function AdminSaleEdit() {

    const { saleNo } = useParams();

    const [sale, setSale] = useState(null);
    const [beforeThumbnail, setBeforeThumbnail] = useState(null);//AttachDto(DB정보)
    const [beforeDetailImages, setBeforeDetailImages] = useState([]);


    const loadData = useCallback(async () => {
        //브라우저의 캐싱을 방지하기 위해 현재시각을 붙여서 주소를 통신할 때마다 갱신함
        const { data } = await apiClient.get(`/sale/${saleNo}`, {
            params:{_t:Date.now()}
        });
        const { saleDto, thumbnail, detailImages } = data;
        setSale(saleDto);
        setBeforeThumbnail(thumbnail);
        setBeforeDetailImages(detailImages);
        // console.log(data);
        setDiscount(saleDto.saleOriginalPrice > saleDto.saleDiscountPrice);
    }, []);
    useEffect(() => {
        loadData();
    }, []);

    //할인 여부 선택 체크박스

    const [discount, setDiscount] = useState(false);

    //할인을 해제하면 할인가를 삭제
    useEffect(() => {
        if (discount === false) {
            setSale(prev => ({ ...prev, saleDiscountPrice: "" }));
        }
    }, [discount]);

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

    //썸네일(대표이미지) 
    const [thumbnail, setThumbnail] = useState(null);

    const thumbnailRef = useRef();

    //(+변경사항) 2023년 3월 이후로 취소버튼은 onchange, oninput으로 감지되지 않습니다.
    const changeThumbnail = useCallback(async e => {

        //선택된 파일을 서버로 전송시켜서 진짜 이미지 변경을 시키다( 업로드 & db변경 )
        const file = e.target.files?.[0];

        //[1]서버로 업로드한 결과를 적용(최종 수정 누르지 않고 즉석에서 가능한 방법)
        const form = new FormData();
        form.append("thumbnail", e.target.files[0]);
        const { data } = await apiClient.patch(`/sale/thumbnail/${saleNo}`, form);
        console.log(data);

        // setThumbnail(file);
        setBeforeThumbnail(data.attach);



    }, []);

    const clearThumbnail = useCallback(async () => {
        const result = await Swal.fire({
            title: `해당 이미지를 정말 삭제하시겠습니까?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "실행하기",
            confirmButtonColor: "#d63031",
            cancelButtonText: "취소하기",
            cancelButtonColor: "#b2bec3"
        });
        if (result.isConfirmed === false) return;

        //서버에 삭제 요청을 한 뒤 제거
        await apiClient.delete(`/sale/thumbnail/${saleNo}`);

        setBeforeThumbnail(null);
    }, []);

    useEffect(() => {
        if (thumbnail !== null) return;
        //파일선택창은 비어있는 value밖에 줄 수 없어서 리액트에서 모든 상황을 제어할 수 없다(HTML보안 이슈)
        //태그를 직접 제어하는 방향으로 우회처리한다(ref사용)
        if (thumbnailRef.current) {
            thumbnailRef.current.value = "";
        }

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
        if(detailImagesRef.current){
            detailImagesRef.current.value="";
        }
    },[detailImages]);


    


    //마우스가 올라갔을 때를 감지하기 위한 state
    const [hover, setHover] = useState(false);

     //hover가 가능한 환경 조사
    const canHover = useMemo(()=>{
        return window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;
    }, []);
    //모바일,데스크탑까지 고려한 최종 hover상태 판정
    const hoverState = useMemo(()=>{
        if(canHover === false) return true;
        return hover;
    }, [hover, canHover]);


    //상세이미지 제거
    const deleteDetailImage = useCallback(async (attach)=>{
        //확인창
        // const result = await Swal.fire({
        //     title: `해당 이미지를 정말 삭제하시겠습니까?`,
        //     icon: "warning",
        //     showCancelButton: true,
        //     confirmButtonText: "실행하기",
        //     confirmButtonColor: "#d63031",
        //     cancelButtonText: "취소하기",
        //     cancelButtonColor: "#b2bec3"
        // });
        // if (result.isConfirmed === false) return;

        //apiClient를 이용한 삭제요청
        await apiClient.delete(`/sale/detailImage/sale/${saleNo}/attach/${attach.attachNo}`);
        



        //화면에서 제거 
        setBeforeDetailImages(prev=>prev.filter(
            image=>image.attachNo !== attach.attachNo
        ));


    }, []);
     //수정 정보 전송 함수 
    const sendData = useCallback(async () => {
        //-할인 여부에 따른 데이터 제거 처리
        const { saleDiscountPrice, ...copy } = sale;
        if (discount) copy.saleDiscountPrice = saleDiscountPrice;

        const form = new FormData();

        //[1]상품의 기본정보
        form.append("sale", new Blob(
            [JSON.stringify(copy)],
            { type: "application/json" }
        ));

        //[2]썸네일은 즉시 변경되게 구현된 상황(변경가능)

        //[3]상세이미지는 추가되는 항목들만 전송하여 저장처리
        Array.from(detailImages).forEach(img=>{
            form.append("detailImages", img)
        })
        const { data } = await apiClient.put(`/sale/${saleNo}`, form);

        toast.success("상품 정보 수정이 완료되었습니다");
        loadData();
    }, [sale, discount, detailImages]);

    //체크될 경우 항목을 신설하거나 true/false를 교체하는 함수
    const choiceDetailImages = useCallback((target, e)=>{
        setBeforeDetailImages(prev=>prev.map(
            attach=>{
                if(attach.attachNo === target.attachNo){
                    return{
                        ...attach,
                        choice : e.target.checked
                    };
                }
                return{...attach};//내가 찾는 항목이 아닌 경우
            }
        ));
    }, []);

    //삭제전체선택 관련 항목들
    const checkAllDetailImages = useCallback(e=>{
        setBeforeDetailImages(prev=>prev.map(
            attach=>({
                ...attach,
                choice:e.target.checked
            })
        ))
    }, []);
    const isAllChecked = useMemo(()=>{
        //reduce를 이용하면 배열을 누적계산하여 1개의 값을 만들어 낼 수 있다. 
        //논리 1개 (true, false)를 만들어내고 싶으므로 유용한 계산
        //배열.reduce(계산함수, 초기값)형태로 쓰며 계산함수의 첫번째 인자는 누적된 값, 두번째 인자는 현재대상

        return beforeDetailImages.reduce((acc, cur)=>acc && cur.choice, true);
    }, [beforeDetailImages]);

    const deleteCheckedDetailImages = useCallback(async()=>{
        const detailNumbers = beforeDetailImages.filter(
            attach => attach.choice === true //체크된 항목만 걸러라
        ).map(
            attach => attach.attachNo //전체 정보말고 번호만 추려라
        );
        
        await apiClient.post(`/sale/deleteDetailImages/${saleNo}`, detailNumbers);
        //화면 갱신
        //-loadData는 안되고 화면에서 요소를 직접 제거해야함(filter사용)
        toast.success("이미지가 삭제되었습니다.");
        setBeforeDetailImages(prev=>prev.filter(
            attach => !detailNumbers.includes(attach.attachNo)// 지운 번호가 아닌 요소만 추출
        ))
        
    }, [beforeDetailImages]);

    //대기화면
    if (sale === null) {
        return <h1>loading...</h1>
    }
    return (<>
        <Jumbotron title="상품 정보 수정" />
        <Row className="mt-5">
            <Form.Label column sm={3}>상품명</Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="saleName" value={sale.saleName ?? ''}
                    onChange={changeStringValue} placeholder="e.g., 갤럭시 노트9">

                </Form.Control>
            </Col>
        </Row>
        <Row className="mt-4">
            <Form.Label column sm={3}>카테고리</Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="saleCategory" value={sale.saleCategory ?? ''}
                    onChange={changeStringValue} placeholder="e.g., 통신기기">

                </Form.Control>
            </Col>
        </Row>
        <Row className="mt-4">
            <Form.Label column sm={3}>정가</Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="saleOriginalPrice"
                    value={sale.saleOriginalPrice ?? ''}
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
                        value={sale.saleDiscountPrice ?? ''}
                        onChange={changeNumericValue} placeholder="e.g., 1800000">

                    </Form.Control>
                </Col>
            </Row>
        )}
        <Row className="mt-4">
            <Form.Label column sm={3}>재고수량</Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="saleStock"
                    value={sale.saleStock ?? ''}
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
                <Editor value={sale.saleContent ?? ''} onChange={changeStringValue}
                    name="saleContent"
                    containerProps={
                        {
                            style: {
                                resize: "none",//or vertical or both
                                minHeight: 250
                            }
                        }
                    } />
            </Col>
        </Row>
        {/* 썸네일 */}
         <Row className="mt-4">
            <Form.Label column sm={3}>대표이미지</Form.Label>
            <Col sm={9}>
                <div className="d-flex">
                    <Button as="label" variant="success">
                        <Form.Control type="file" accept="image/*" 
                            ref={thumbnailRef} 
                            onInput={changeThumbnail}
                            className="d-none"/>          
                        {beforeThumbnail === null && (<>
                            <FaPlus/>
                            <span className="ms-2">썸네일 등록</span>
                        </>)}
                        {beforeThumbnail !== null && (<>
                            <FaRotateRight/>
                            <span className="ms-2">썸네일 변경</span>    
                        </>)}
                    </Button>
                    <Button variant="danger" onClick={clearThumbnail} className="ms-2">
                        <FaXmark/>
                        <span className="ms-2">썸네일 제거</span>
                    </Button>
                </div>
            </Col>
        </Row>
        <Row className="mt-2">
            <Col sm={{offset:3, span:9}}>
                {/* 기존 이미지를 표시하고 제거, 변경 버튼을 추가 */}
                {beforeThumbnail === null && (
                <img src={NoImage} width={300} className="border"/>
                ) }
                {beforeThumbnail !== null && (
                <img src={`${import.meta.env.VITE_SERVER_URL}/api/attach/${beforeThumbnail.attachNo}`} width={300} className="border"/>
                ) }
            </Col>
        </Row>

        {/* position을 이용해서 버튼과 이미지를 합체 (모던 웹페이지 디자인) */}
        <Row className="mt-2">
            <Col sm={{offset:3, span:9}}>
                <div className="position-relative border" style={{width:300, minHeight:300}}
                    onMouseEnter={e=>setHover(true)} 
                    onMouseLeave={e=>setHover(false)}>
                    {/* 기존 이미지를 표시하고 제거, 변경 버튼을 추가 */}
                    {beforeThumbnail === null && (
                    <img src={NoImage}
                            className="position-absolute top-0 start-0 w-100"/>
                    ) }
                    {beforeThumbnail !== null && (
                    <img src={`${import.meta.env.VITE_SERVER_URL}/api/attach/${beforeThumbnail.attachNo}`} 
                            className="position-absolute top-0 start-0 w-100"/>
                    ) }

                    {/* hover가 불가능한 환경에서는 그냥 표시하고 가능한 환경에서는 숨겼다가 표시 */}
                    { hoverState && (<>
                    <Button as="label" variant="success" 
                        className="position-absolute" style={
                            {
                                top:10, 
                                right:60,
                                transition: "opacity 0.1s ease-out",
                                opacity: hover ? 100 : 0
                            }
                        }>
                        <Form.Control type="file" accept="image/*" 
                            ref={thumbnailRef} 
                            onInput={changeThumbnail}
                            className="d-none"/>          
                        {beforeThumbnail === null && <FaPlus/>}
                        {beforeThumbnail !== null && <FaRotateRight/>}
                    </Button>
                    <Button variant="danger" onClick={clearThumbnail} 
                        className="ms-2 position-absolute" style={
                            {
                                top:10, 
                                right:10,
                                transition: "opacity 0.1s ease-out",
                                opacity: hover ? 100 : 0
                            }
                        }>
                        <FaXmark/>
                    </Button>
                    </>) }
                </div>
            </Col>
        </Row>


        {/* 
            상세이미지는 등록과 동일하게 처리되도록 구현하는 것이 좋음
            1. 기존 이미지들을 작게 표시 or 목록으로 표시 (클릭하면 뷰어가 나오게 처리)
            2. 기존 이미지들을 삭제할 수 있는 버튼을 제공(누르면 경고 후 바로 삭제 복구불가)
            3. 신규 이미지들을 추가할 수 있는 입력창을 생성(등록화면과 동일)
            4. 수정 완료 버튼을 누르면 전송하여 처리 (or 선택 시점에 등록할 수도 있음)

        */}
        <Row className="mt-5">
            <Form.Label column sm={3}>기존상세이미지</Form.Label>
            <Col sm={9}>
                {/* 전체 선택 체크박스 */}
                <Form.Check type="checkbox" label="전체선택"
                    checked={isAllChecked}
                    onChange={checkAllDetailImages}
                ></Form.Check>
                <Button variant="danger" onClick={deleteCheckedDetailImages}>
                    체크된 항목 삭제
                </Button>

                {/* 기존이미지 */}
                <ListGroup>
                    {beforeDetailImages.map(attach=>(
                        <ListGroupItem key={attach.attachNo}>
                            <div className="d-flex justify-content-between">
                                <div>
                                    {attach.attachName}
                                    <span className="ms-2 text-info">
                                    ({(attach.attachSize/1024/1024).toFixed(2)}MB)
                                    </span>
                                </div>
                                <div>
                                    {/* 하나씩 삭제하는 버튼 */}
                                    {/* <FaXmark className="text-danger" 
                                    onClick={e=>deleteDetailImage(attach)}/> */}
                                    {/* 중복 삭제하는 체크박스 */}
                                    <Form.Check type="checkbox"
                                        checked={attach.choice === true}
                                        onChange={e=>choiceDetailImages(attach, e)}
                                        >

                                    </Form.Check>
                                </div>
                            </div>
                        </ListGroupItem>

                    ))}
                </ListGroup>
            </Col>
        </Row>
        {/* 상세이미지 */}
        <Row className="mt-4">
            <Form.Label column sm={3}>추가상세이미지</Form.Label>
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
                    <FaSquarePen />
                    <span className="ms-2">수정 완료하기</span>
                </Button>
            </Col>
        </Row>
    </>)
}
import Jumbotron from "@templates/Jumbotron";
import { useCallback, useEffect, useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";


//스도쿠를 구성하는 칸(cell)은 총(6X6)X9=8칸, 6X6칸 9개로 세분화되며 지켜야할 룰은 다음과 같다. 
//각각의 가로줄(row) 세로줄(column)에서 ~9가 중복 없이 하나씩 들어간다. 
//6X6칸(box)안에는 ~9가 중복 없이 하나씩 들어간다. 

//처음 제시되는 숫자들의 개수는 30개 이하여야 한다. 






export default function Sudoku() {

    const [target, setTarget] = useState({});

    

    const loadData = useCallback(async()=>{
        //81칸 중 무작위로 30칸에 숫자가 들어가야한다. 
        //숫자1~81중 무작위로 숫자 30개를 뽑아야 한다. 

        const position = Array.from({length : 30}, ()=>Math.floor(Math.random()*81) + 1);
        console.log(position[0]);

        //7번째 자리에 숫자 1를 넣는다. 
        setTarget(prev=>({
            ...prev,
            no7 : 1
        }));


    }, [target]);

   
    useEffect(() => {
        loadData();
    }, []);


    return (<>
        <Jumbotron title="스도쿠" content="스도쿠게임을 즐겨보세요." />
        <div className="d-flex flex-wrap justify-content-center" style={{ height: 375, maxWidth: "375px", aspectRatio: "1/1" }}>

            <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no1" data-value={target.no1}>{target.no1}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no2" data-value={target.no2}>{target.no2}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no3" data-value={target.no3}>{target.no3}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no4" data-value={target.no4}>{target.no4}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no5" data-value={target.no5}>{target.no5}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no6" data-value={target.no6}>{target.no6}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no7" data-value={target.no7}>{target.no7}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no8" data-value={target.no8}>{target.no8}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no9" data-value={target.no9}>{target.no9}</span>
                </Col>

            </Row>
            <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no10" data-value={target.no10}>{target.no10}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no11" data-value={target.no11}>{target.no11}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no12" data-value={target.no12}>{target.no12}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no13" data-value={target.no13}>{target.no13}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no14" data-value={target.no14}>{target.no14}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no15" data-value={target.no15}>{target.no15}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no16" data-value={target.no16}>{target.no16}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no17" data-value={target.no17}>{target.no17}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no18" data-value={target.no18}>{target.no18}</span>
                </Col>

            </Row>
            <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no19" data-value={target.no19}>{target.no19}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no20" data-value={target.no20}>{target.no20}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no21" data-value={target.no21}>{target.no21}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no22" data-value={target.no22}>{target.no22}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no23" data-value={target.no23}>{target.no23}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no24" data-value={target.no24}>{target.no24}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no25" data-value={target.no25}>{target.no25}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no26" data-value={target.no26}>{target.no26}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no27" data-value={target.no27}>{target.no27}</span>
                </Col>

            </Row>
            <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no28" data-value={target.no28}>{target.no28}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no29" data-value={target.no29}>{target.no29}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no30" data-value={target.no30}>{target.no30}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no31" data-value={target.no31}>{target.no31}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no32" data-value={target.no32}>{target.no32}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no33" data-value={target.no33}>{target.no33}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no34" data-value={target.no34}>{target.no34}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no35" data-value={target.no35}>{target.no35}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no36" data-value={target.no36}>{target.no36}</span>
                </Col>

            </Row>
            <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no37" data-value={target.no37}>{target.no37}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no38" data-value={target.no38}>{target.no38}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no39" data-value={target.no39}>{target.no39}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no40" data-value={target.no40}>{target.no40}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no41" data-value={target.no41}>{target.no41}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no42" data-value={target.no42}>{target.no42}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no43" data-value={target.no43}>{target.no43}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no44" data-value={target.no44}>{target.no44}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no45" data-value={target.no45}>{target.no45}</span>
                </Col>

            </Row>
            <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no46" data-value={target.no46}>{target.no46}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no47" data-value={target.no47}>{target.no47}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no48" data-value={target.no48}>{target.no48}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no49" data-value={target.no49}>{target.no49}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no50" data-value={target.no50}>{target.no50}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no51" data-value={target.no51}>{target.no51}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no52" data-value={target.no52}>{target.no52}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no53" data-value={target.no53}>{target.no53}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no54" data-value={target.no54}>{target.no54}</span>
                </Col>

            </Row>
            <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no55" data-value={target.no55}>{target.no55}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no56" data-value={target.no56}>{target.no56}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no57" data-value={target.no57}>{target.no57}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no58" data-value={target.no58}>{target.no58}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no59" data-value={target.no59}>{target.no59}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no60" data-value={target.no60}>{target.no60}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no61" data-value={target.no61}>{target.no61}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no62" data-value={target.no62}>{target.no62}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no63" data-value={target.no63}>{target.no63}</span>
                </Col>

            </Row>
            <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no64" data-value={target.no64}>{target.no64}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no65" data-value={target.no65}>{target.no65}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no66" data-value={target.no66}>{target.no66}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no67" data-value={target.no67}>{target.no67}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no68" data-value={target.no68}>{target.no68}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no69" data-value={target.no69}>{target.no69}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no70" data-value={target.no70}>{target.no70}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no71" data-value={target.no71}>{target.no71}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no72" data-value={target.no72}>{target.no72}</span>
                </Col>

            </Row>
            <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no73" data-value={target.no73}>{target.no73}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no74" data-value={target.no74}>{target.no74}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no75" data-value={target.no75}>{target.no75}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no76" data-value={target.no76}>{target.no76}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no77" data-value={target.no77}>{target.no77}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no78" data-value={target.no78}>{target.no78}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no79" data-value={target.no79}>{target.no79}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no80" data-value={target.no80}>{target.no80}</span>
                </Col>
                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                    <span className="fs-5" name="no81" data-value={target.no81}>{target.no81}</span>
                </Col>

            </Row>
        </div>

        {/* <div className="d-flex flex-wrap justify-content-center" style={{ width: 375, height: 375 }} >
            {[...Array(9)].map((_, index) => (
                <Row key={index} className="border border-dark m-0 p-0"
                    style={{ width: "33.3333%", height: 125 }} >
                    {[...Array(9)].map((_, index) => (
                        <Col key={index} className="border d-flex justify-content-center align-items-center p-0"
                            style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }} >
                        </Col>))}
                </Row>))}
        </div> */}


    </>)
}
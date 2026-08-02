import Jumbotron from "@templates/Jumbotron";
import { useCallback, useEffect, useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { FaRotateLeft } from "react-icons/fa6";
import { RiNumber1, RiNumber2, RiNumber3, RiNumber4, RiNumber5, RiNumber6, RiNumber7, RiNumber8, RiNumber9 } from "react-icons/ri";

//스도쿠를 구성하는 칸(cell)은 총(6X6)X9=8칸, 6X6칸 9개로 세분화되며 지켜야할 룰은 다음과 같다. 
//각각의 가로줄(row) 세로줄(column)에서 1~9가 중복 없이 하나씩 들어간다. 
//6X6칸(box)안에는 1~9가 중복 없이 하나씩 들어간다. 

//처음 제시되는 숫자들의 개수는 30개 이하여야 한다. 






export default function Sudoku() {

    const [target, setTarget] = useState({});
    const [pin, setPin] = useState({});
    const [input, setInput] = useState();


    const isValid = useCallback((currentTarget, index, num) => {
        const row = Math.floor(index / 9);
        const col = index % 9;

        for (let i = 0; i < 9; i++) {
            if (currentTarget[row * 9 + i] === num) return false;
            if (currentTarget[i * 9 + col] === num) return false;
        }

        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const checkIndex = (startRow + i) * 9 + (startCol + j);
                if (currentTarget[checkIndex] === num) return false;
            }
        }
        return true;
    }, []);

    const getShuffledNumbers = () => {
        const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        return numbers;
    };



    const fillTarget = (currentTarget, index = 0) => {
        if (index === 81) return true;

        const randomNums = getShuffledNumbers();
        for (const num of randomNums) {
            if (isValid(currentTarget, index, num)) {
                currentTarget[index] = num;

                if (fillTarget(currentTarget, index + 1)) return true;
                else {
                    currentTarget[index] = 0;
                }
            }
        }
        return false;
    };



    const handleGenerate = () => {
        const newTarget = Array(81).fill(0);
        fillTarget(newTarget);

        const blankPosition = Array.from({ length: 51 }, () => Math.floor(Math.random() * 81) + 1);

        const result = {};

        for (let i = 0; i < 81; i++) {
            const boxNo = i + 1; // 1번 칸부터 81번 칸까지의 번호

            if (blankPosition.includes(boxNo)) {
                result[boxNo] = 0;
            } else {
                result[boxNo] = newTarget[i];
            }
        }

        setTarget(result);

    };
    //스도쿠 판의 빈 칸을 입력창으로 변환하는 함수 
    const toInput = useCallback(() => {

        setInput(1);
        console.log(input);
    }, []);



    const changeTarget = useCallback(() => {

    }, []);


    return (<>
        <Jumbotron title="스도쿠" content="스도쿠게임을 즐겨보세요." />
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-wrap justify-content-center" style={{ height: 375, maxWidth: "375px", aspectRatio: "1/1" }}>

                <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={()=>toInput(1)} 
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: input === '1' ? '#fff59d' : '#fff'
                        }}>
                        <span className="fs-5" name="no1" data-value={target.no1}>{target[0] !== 0 ? target[0] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no2" data-value={target.no2}>{target[1] !== 0 ? target[1] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no3" data-value={target.no3}>{target[2] !== 0 ? target[2] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no4" data-value={target.no4}>{target[3] !== 0 ? target[3] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no5" data-value={target.no5}>{target[4] !== 0 ? target[4] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no6" data-value={target.no6}>{target[5] !== 0 ? target[5] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no7" data-value={target.no7}>{target[6] !== 0 ? target[6] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no8" data-value={target.no8}>{target[7] !== 0 ? target[7] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no9" data-value={target.no9}>{target[8] !== 0 ? target[8] : ''}</span>
                    </Col>

                </Row>
                <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no10" data-value={target.no10}>{target[9] !== 0 ? target[9] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no11" data-value={target.no11}>{target[10] !== 0 ? target[10] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no12" data-value={target.no12}>{target[11] !== 0 ? target[11] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no13" data-value={target.no13}>{target[12] !== 0 ? target[12] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no14" data-value={target.no14}>{target[13] !== 0 ? target[13] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no15" data-value={target.no15}>{target[14] !== 0 ? target[14] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no16" data-value={target.no16}>{target[15] !== 0 ? target[15] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no17" data-value={target.no17}>{target[16] !== 0 ? target[16] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no18" data-value={target.no18}>{target[17] !== 0 ? target[17] : ''}</span>
                    </Col>

                </Row>
                <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no19" data-value={target.no19}>{target[18] !== 0 ? target[18] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no20" data-value={target.no20}>{target[19] !== 0 ? target[19] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no21" data-value={target.no21}>{target[20] !== 0 ? target[20] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no22" data-value={target.no22}>{target[21] !== 0 ? target[21] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no23" data-value={target.no23}>{target[22] !== 0 ? target[22] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no24" data-value={target.no24}>{target[23] !== 0 ? target[23] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no25" data-value={target.no25}>{target[24] !== 0 ? target[24] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no26" data-value={target.no26}>{target[25] !== 0 ? target[25] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no27" data-value={target.no27}>{target[26] !== 0 ? target[26] : ''}</span>
                    </Col>

                </Row>
                <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no28" data-value={target.no28}>{target[27] !== 0 ? target[27] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no29" data-value={target.no29}>{target[28] !== 0 ? target[28] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no30" data-value={target.no30}>{target[29] !== 0 ? target[29] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no31" data-value={target.no31}>{target[30] !== 0 ? target[30] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no32" data-value={target.no32}>{target[31] !== 0 ? target[31] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no33" data-value={target.no33}>{target[32] !== 0 ? target[32] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no34" data-value={target.no34}>{target[33] !== 0 ? target[33] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no35" data-value={target.no35}>{target[34] !== 0 ? target[34] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no36" data-value={target.no36}>{target[35] !== 0 ? target[35] : ''}</span>
                    </Col>

                </Row>
                <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no37" data-value={target.no37}>{target[36] !== 0 ? target[36] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no38" data-value={target.no38}>{target[37] !== 0 ? target[37] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no39" data-value={target.no39}>{target[38] !== 0 ? target[38] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no40" data-value={target.no40}>{target[39] !== 0 ? target[39] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no41" data-value={target.no41}>{target[40] !== 0 ? target[40] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no42" data-value={target.no42}>{target[41] !== 0 ? target[41] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no43" data-value={target.no43}>{target[42] !== 0 ? target[42] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no44" data-value={target.no44}>{target[43] !== 0 ? target[43] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no45" data-value={target.no45}>{target[44] !== 0 ? target[44] : ''}</span>
                    </Col>

                </Row>
                <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no46" data-value={target.no46}>{target[45] !== 0 ? target[45] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no47" data-value={target.no47}>{target[46] !== 0 ? target[46] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no48" data-value={target.no48}>{target[47] !== 0 ? target[47] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no49" data-value={target.no49}>{target[48] !== 0 ? target[48] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no50" data-value={target.no50}>{target[49] !== 0 ? target[49] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no51" data-value={target.no51}>{target[50] !== 0 ? target[50] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no52" data-value={target.no52}>{target[51] !== 0 ? target[51] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no53" data-value={target.no53}>{target[52] !== 0 ? target[52] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no54" data-value={target.no54}>{target[53] !== 0 ? target[53] : ''}</span>
                    </Col>

                </Row>
                <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no55" data-value={target.no55}>{target[54] !== 0 ? target[54] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no56" data-value={target.no56}>{target[55] !== 0 ? target[55] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no57" data-value={target.no57}>{target[56] !== 0 ? target[56] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no58" data-value={target.no58}>{target[57] !== 0 ? target[57] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no59" data-value={target.no59}>{target[58] !== 0 ? target[58] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no60" data-value={target.no60}>{target[59] !== 0 ? target[59] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no61" data-value={target.no61}>{target[60] !== 0 ? target[60] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no62" data-value={target.no62}>{target[61] !== 0 ? target[61] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no63" data-value={target.no63}>{target[62] !== 0 ? target[62] : ''}</span>
                    </Col>

                </Row>
                <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no64" data-value={target.no64}>{target[63] !== 0 ? target[63] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no65" data-value={target.no65}>{target[64] !== 0 ? target[64] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no66" data-value={target.no66}>{target[65] !== 0 ? target[65] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no67" data-value={target.no67}>{target[66] !== 0 ? target[66] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no68" data-value={target.no68}>{target[67] !== 0 ? target[67] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no69" data-value={target.no69}>{target[68] !== 0 ? target[68] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no70" data-value={target.no70}>{target[69] !== 0 ? target[69] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no71" data-value={target.no71}>{target[70] !== 0 ? target[70] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no72" data-value={target.no72}>{target[71] !== 0 ? target[71] : ''}</span>
                    </Col>

                </Row>
                <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no73" data-value={target.no73}>{target[72] !== 0 ? target[72] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no74" data-value={target.no74}>{target[73] !== 0 ? target[73] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no75" data-value={target.no75}>{target[74] !== 0 ? target[74] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no76" data-value={target.no76}>{target[75] !== 0 ? target[75] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no77" data-value={target.no77}>{target[76] !== 0 ? target[76] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no78" data-value={target.no78}>{target[77] !== 0 ? target[77] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no79" data-value={target.no79}>{target[78] !== 0 ? target[78] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no80" data-value={target.no80}>{target[79] !== 0 ? target[79] : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="no81" data-value={target.no81}>{target[80] !== 0 ? target[80] : ''}</span>
                    </Col>

                </Row>
            </div>

            <Button onClick={handleGenerate} style={{ height: 41, maxWidth: "41px", aspectRatio: "1/1" }}>
                <FaRotateLeft />
            </Button>


            <div className="d-flex flex-wrap justify-content-center ms-5" style={{ height: 90, maxWidth: "90px", aspectRatio: "1/1" }}>

                <Row className="border border-dark d-flex m-0 p-0" style={{ height: 90, aspectRatio: "1/1" }}>

                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="1" data-value={pin.no1}
                            onClick={changeTarget}

                            style={{
                                cursor: "pointer",
                            }}>
                            <RiNumber1 />
                        </span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="2" data-value={pin.no2} style={{
                            cursor: "pointer",
                        }}>
                            <RiNumber2 />
                        </span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="3" data-value={pin.no3} style={{
                            cursor: "pointer",
                        }}>
                            <RiNumber3 />
                        </span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="4" data-value={pin.no4} style={{
                            cursor: "pointer",
                        }}>
                            <RiNumber4 />
                        </span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="5" data-value={pin.no5} style={{
                            cursor: "pointer",
                        }}>
                            <RiNumber5 />
                        </span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="6" data-value={pin.no6} style={{
                            cursor: "pointer",
                        }}>
                            <RiNumber6 />
                        </span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="7" data-value={pin.no7} style={{
                            cursor: "pointer",
                        }}>
                            <RiNumber7 />
                        </span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="8" data-value={pin.no8} style={{
                            cursor: "pointer",
                        }}>
                            <RiNumber8 />
                        </span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
                        <span className="fs-5" name="9" data-value={pin.no9} style={{
                            cursor: "pointer",
                        }}>
                            <RiNumber9 />
                        </span>
                    </Col>

                </Row>

            </div>
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
        </div>  */}


    </>)
}
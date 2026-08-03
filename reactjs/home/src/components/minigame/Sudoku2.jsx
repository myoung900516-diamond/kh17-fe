import Jumbotron from "@templates/Jumbotron";
import { useCallback, useEffect, useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { FaArrowLeft, FaInfo, FaRotateLeft } from "react-icons/fa6";
import { RiNumber1, RiNumber2, RiNumber3, RiNumber4, RiNumber5, RiNumber6, RiNumber7, RiNumber8, RiNumber9 } from "react-icons/ri";

//스도쿠를 구성하는 칸(cell)은 총(6X6)X9=8칸, 6X6칸 9개로 세분화되며 지켜야할 룰은 다음과 같다. 
//각각의 가로줄(row) 세로줄(column)에서 1~9가 중복 없이 하나씩 들어간다. 
//6X6칸(box)안에는 1~9가 중복 없이 하나씩 들어간다. 

//처음 제시되는 숫자들의 개수는 30개 이하여야 한다. 



//입력한 숫자는 색이 달라야함. 그래야 정답 체크시 푼 칸을 알 수 있음. 


export default function Sudoku() {

    //현재 상태(칸의 내용)
    const [target, setTarget] = useState({});
    //입력 숫자판
    const [pin, setPin] = useState({});
    //선택한 스도쿠판의 index번호(=0~80번)
    const [input, setInput] = useState(null);
    //정답판
    const [example, setExample] = useState({});
    //빈칸이 있는 문제판
    const [result, setResult] = useState({});
    //채점판(=푼 답안지와 정답판을 비교해 맞은 것과 틀린 것을 피드백처리하기 위한 state)
    const [correct, setCorrect] = useState([]);


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
        // setExample(newTarget);

        const blankPosition = Array.from({ length: 81 }, (_, index) => index + 1)
            .sort(() => Math.random() - 0.5)
            .slice(0, 51);



        // const blankPosition = Array.from({ length: 51 }, () => Math.floor(Math.random() * 81) + 1);
        // console.log("blankPosition.length : ", blankPosition.length);
        // console.log("blankPosition : ", blankPosition);

        const result = {};
        const example = {};

        for (let i = 0; i < 81; i++) {
            const boxNo = i + 1; // 1번 칸부터 81번 칸까지의 번호
            example[`no${boxNo}`] = newTarget[i];

            if (blankPosition.includes(boxNo)) {
                result[`no${boxNo}`] = 0;
            } else {
                result[`no${boxNo}`] = newTarget[i];
            }
        }

        setTarget(result);
        setResult(result);
        setExample(example);
        setCorrect([]);


    };
    // console.log("example : ", example);
    // console.log("target : ", target);
    // console.log("result : ", result);
    //스도쿠 판의 빈 칸을 입력창으로 변환하는 함수 
    const toInput = useCallback((index) => {
        // const pin = changeTarget();


        setInput(index);
        //  var pin1 = document.querySelector(".pin1");
        // pin1.textContent = 1;
        // count.textContent = byte;
        // console.log(index);
    }, []);


    // console.log(input);
    // console.log(example[input]);



    const changeTarget = (number) => {

        const position = Object.values(result);
        if (input === null) return;
        // if(`result.no${input+1}` !== 0) return;
        if (position[input] !== 0) return;

        // console.log(input);
        // console.log(position);
        // console.log(result.no[input+1]);
        // setTarget(prev => {
        //     const newTarget = { ...prev };
        //     newTarget[input] = number;
        //     return newTarget;

        // });
        setTarget(prev => ({
            ...prev,
            // {`no${[input+1]}`} : number
            [`no${input + 1}`]: number
        }));
        // console.log(target);

    };

    const deleteTarget = () => {
        const position = Object.values(result);
        if (input === null) return;
        if (position[input] !== 0) return;
        // if(`result.no${input+1}` !== 0) return;
        // setTarget(prev => {
        //     const newTarget = { ...prev };
        //     newTarget[input] = "";
        //     return newTarget;

        // });
        setTarget(prev => ({
            ...prev,
            // {`no${[input+1]}`} : number
            [`no${input + 1}`]: ""
        }));
    };

    useEffect(() => {
        handleGenerate();
        // console.log(example);
        // setResult(result);
    }, []);

    const viewResult = () => {
        // console.log("example : ",example);
        // setTarget();


        // const result = {};

        // for (let i = 0; i < 81; i++) {
        //     const boxNo = i + 1; // 1번 칸부터 81번 칸까지의 번호

        //         result[`no${boxNo}`] = example[i];
        //     }

        // if(Object.values(example) !== Object.values(target)){
        //정답 버튼을 누르면 칸 내용과 정답이 틀릴 경우 칸 배경을 빨간색으로 변경시킨다. 
        // }
        const answer = Object.values(example);
        // console.log("answer : ", answer);
        const final = Object.values(target);
        // console.log("final : ", final);

        // const newInput = [];
        for (var i = 0; i < 81; i++) {
            if (answer[i] !== final[i]) {
                // setInput(prev => [...prev, i]);
                correct.push(i);
            }
        }
        // setInput(newInput);

        setTarget(example);
        setResult(example);
        // console.log("correct : ", correct);

    };
    // console.log("input.length : ", input.length);


    return (<>
        <Jumbotron title="스도쿠" content="스도쿠게임을 즐겨보세요." />
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-wrap justify-content-center" style={{ height: 375, maxWidth: "375px", aspectRatio: "1/1" }}>

                <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(0)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(0)  ? '#e06973'  : input === 0 ? '#fff59d'  : '#fff'
                            // input === 0 ? '#fff59d' : '#fff',
                            // backgroundColor: correct.includes(0) ? '#ed2939' : '#fff'
                        }}>
                        <span className="fs-5" name="no1" data-value={target.no1}>{target.no1 !== 0 ? target.no1 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(1)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(1)  ? '#e06973'  : input === 1 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no2" data-value={target.no2}>{target.no2 !== 0 ? target.no2 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(2)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(2)  ? '#e06973'  : input === 2 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no3" data-value={target.no3}>{target.no3 !== 0 ? target.no3 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(3)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(3)  ? '#e06973'  : input === 3 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no4" data-value={target.no4}>{target.no4 !== 0 ? target.no4 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(4)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(4)  ? '#e06973'  : input === 4 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no5" data-value={target.no5}>{target.no5 !== 0 ? target.no5 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(5)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(5)  ? '#e06973'  : input === 5 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no6" data-value={target.no6}>{target.no6 !== 0 ? target.no6 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(6)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(6)  ? '#e06973'  : input === 6 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no7" data-value={target.no7}>{target.no7 !== 0 ? target.no7 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(7)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(7)  ? '#e06973'  : input === 7 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no8" data-value={target.no8}>{target.no8 !== 0 ? target.no8 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(8)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(8)  ? '#e06973'  : input === 8 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no9" data-value={target.no9}>{target.no9 !== 0 ? target.no9 : ''}</span>
                    </Col>

                </Row>
                <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(9)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(9)  ? '#e06973'  : input === 9 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no10" data-value={target.no10}>{target.no10 !== 0 ? target.no10 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(10)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(10)  ? '#e06973'  : input === 10 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no11" data-value={target.no11}>{target.no11 !== 0 ? target.no11 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(11)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(11)  ? '#e06973'  : input === 11 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no12" data-value={target.no12}>{target.no12 !== 0 ? target.no12 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(12)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(12)  ? '#e06973'  : input === 12 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no13" data-value={target.no13}>{target.no13 !== 0 ? target.no13 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(13)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(13)  ? '#e06973'  : input === 13 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no14" data-value={target.no14}>{target.no14 !== 0 ? target.no14 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(14)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(14)  ? '#e06973'  : input === 14 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no15" data-value={target.no15}>{target.no15 !== 0 ? target.no15 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(15)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(15)  ? '#e06973'  : input === 15 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no16" data-value={target.no16}>{target.no16 !== 0 ? target.no16 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(16)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(16)  ? '#e06973'  : input === 16 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no17" data-value={target.no17}>{target.no17 !== 0 ? target.no17 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(17)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(17)  ? '#e06973'  : input === 17 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no18" data-value={target.no18}>{target.no18 !== 0 ? target.no18 : ''}</span>
                    </Col>

                </Row>
                <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(18)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(18)  ? '#e06973'  : input === 18 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no19" data-value={target.no19}>{target.no19 !== 0 ? target.no19 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(19)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(19)  ? '#e06973'  : input === 19 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no20" data-value={target.no20}>{target.no20 !== 0 ? target.no20 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(20)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(20)  ? '#e06973'  : input === 20 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no21" data-value={target.no21}>{target.no21 !== 0 ? target.no21 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(21)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(21)  ? '#e06973'  : input === 21 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no22" data-value={target.no22}>{target.no22 !== 0 ? target.no22 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(22)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(22)  ? '#e06973'  : input === 22 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no23" data-value={target.no23}>{target.no23 !== 0 ? target.no23 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(23)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(23)  ? '#e06973'  : input === 23 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no24" data-value={target.no24}>{target.no24 !== 0 ? target.no24 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(24)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(24)  ? '#e06973'  : input === 24 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no25" data-value={target.no25}>{target.no25 !== 0 ? target.no25 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(25)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(25)  ? '#e06973'  : input === 25 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no26" data-value={target.no26}>{target.no26 !== 0 ? target.no26 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(26)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(26)  ? '#e06973'  : input === 26 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no27" data-value={target.no27}>{target.no27 !== 0 ? target.no27 : ''}</span>
                    </Col>

                </Row>
                <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(27)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(27)  ? '#e06973'  : input === 27 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no28" data-value={target.no28}>{target.no28 !== 0 ? target.no28 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(28)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(28)  ? '#e06973'  : input === 28 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no29" data-value={target.no29}>{target.no29 !== 0 ? target.no29 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(29)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(29)  ? '#e06973'  : input === 29 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no30" data-value={target.no30}>{target.no30 !== 0 ? target.no30 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(30)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(30)  ? '#e06973'  : input === 30 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no31" data-value={target.no31}>{target.no31 !== 0 ? target.no31 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(31)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(31)  ? '#e06973'  : input === 31 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no32" data-value={target.no32}>{target.no32 !== 0 ? target.no32 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(32)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(32)  ? '#e06973'  : input === 32 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no33" data-value={target.no33}>{target.no33 !== 0 ? target.no33 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(33)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(33)  ? '#e06973'  : input === 33 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no34" data-value={target.no34}>{target.no34 !== 0 ? target.no34 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(34)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(34)  ? '#e06973'  : input === 34 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no35" data-value={target.no35}>{target.no35 !== 0 ? target.no35 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(35)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(35)  ? '#e06973'  : input === 35 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no36" data-value={target.no36}>{target.no36 !== 0 ? target.no36 : ''}</span>
                    </Col>

                </Row>
                <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(36)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(36)  ? '#e06973'  : input === 36 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no37" data-value={target.no37}>{target.no37 !== 0 ? target.no37 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(37)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(37)  ? '#e06973'  : input === 37 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no38" data-value={target.no38}>{target.no38 !== 0 ? target.no38 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(38)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(38)  ? '#e06973'  : input === 38 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no39" data-value={target.no39}>{target.no39 !== 0 ? target.no39 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(39)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(39)  ? '#e06973'  : input === 39 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no40" data-value={target.no40}>{target.no40 !== 0 ? target.no40 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(40)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(40)  ? '#e06973'  : input === 40 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no41" data-value={target.no41}>{target.no41 !== 0 ? target.no41 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(41)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(41)  ? '#e06973'  : input === 41 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no42" data-value={target.no42}>{target.no42 !== 0 ? target.no42 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(42)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(42)  ? '#e06973'  : input === 42 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no43" data-value={target.no43}>{target.no43 !== 0 ? target.no43 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(43)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(43)  ? '#e06973'  : input === 43 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no44" data-value={target.no44}>{target.no44 !== 0 ? target.no44 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(44)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(44)  ? '#e06973'  : input === 44 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no45" data-value={target.no45}>{target.no45 !== 0 ? target.no45 : ''}</span>
                    </Col>

                </Row>
                <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(45)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(45)  ? '#e06973'  : input === 45 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no46" data-value={target.no46}>{target.no46 !== 0 ? target.no46 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(46)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(46)  ? '#e06973'  : input === 46 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no47" data-value={target.no47}>{target.no47 !== 0 ? target.no47 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(47)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(47)  ? '#e06973'  : input === 47 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no48" data-value={target.no48}>{target.no48 !== 0 ? target.no48 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(48)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(48)  ? '#e06973'  : input === 48 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no49" data-value={target.no49}>{target.no49 !== 0 ? target.no49 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(49)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(49)  ? '#e06973'  : input === 49 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no50" data-value={target.no50}>{target.no50 !== 0 ? target.no50 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(50)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(50)  ? '#e06973'  : input === 50 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no51" data-value={target.no51}>{target.no51 !== 0 ? target.no51 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(51)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(51)  ? '#e06973'  : input === 51 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no52" data-value={target.no52}>{target.no52 !== 0 ? target.no52 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(52)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(52)  ? '#e06973'  : input === 52 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no53" data-value={target.no53}>{target.no53 !== 0 ? target.no53 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(53)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(53)  ? '#e06973'  : input === 53 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no54" data-value={target.no54}>{target.no54 !== 0 ? target.no54 : ''}</span>
                    </Col>

                </Row>
                <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(54)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(54)  ? '#e06973'  : input === 54 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no55" data-value={target.no55}>{target.no55 !== 0 ? target.no55 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(55)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(55)  ? '#e06973'  : input === 55 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no56" data-value={target.no56}>{target.no56 !== 0 ? target.no56 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(56)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(56)  ? '#e06973'  : input === 56 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no57" data-value={target.no57}>{target.no57 !== 0 ? target.no57 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(57)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(57)  ? '#e06973'  : input === 57 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no58" data-value={target.no58}>{target.no58 !== 0 ? target.no58 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(58)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(58)  ? '#e06973'  : input === 58 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no59" data-value={target.no59}>{target.no59 !== 0 ? target.no59 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(59)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(59)  ? '#e06973'  : input === 59 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no60" data-value={target.no60}>{target.no60 !== 0 ? target.no60 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(60)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(60)  ? '#e06973'  : input === 60 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no61" data-value={target.no61}>{target.no61 !== 0 ? target.no61 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(61)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(61)  ? '#e06973'  : input === 61 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no62" data-value={target.no62}>{target.no62 !== 0 ? target.no62 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(62)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(62)  ? '#e06973'  : input === 62 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no63" data-value={target.no63}>{target.no63 !== 0 ? target.no63 : ''}</span>
                    </Col>

                </Row>
                <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(63)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(63)  ? '#e06973'  : input === 63 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no64" data-value={target.no64}>{target.no64 !== 0 ? target.no64 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(64)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(64)  ? '#e06973'  : input === 64 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no65" data-value={target.no65}>{target.no65 !== 0 ? target.no65 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(65)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(65)  ? '#e06973'  : input === 65 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no66" data-value={target.no66}>{target.no66 !== 0 ? target.no66 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(66)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(66)  ? '#e06973'  : input === 66 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no67" data-value={target.no67}>{target.no67 !== 0 ? target.no67 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(67)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(67)  ? '#e06973'  : input === 67 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no68" data-value={target.no68}>{target.no68 !== 0 ? target.no68 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(68)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(68)  ? '#e06973'  : input === 68 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no69" data-value={target.no69}>{target.no69 !== 0 ? target.no69 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(69)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(69)  ? '#e06973'  : input === 69 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no70" data-value={target.no70}>{target.no70 !== 0 ? target.no70 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(70)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(70)  ? '#e06973'  : input === 70 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no71" data-value={target.no71}>{target.no71 !== 0 ? target.no71 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(71)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(71)  ? '#e06973'  : input === 71 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no72" data-value={target.no72}>{target.no72 !== 0 ? target.no72 : ''}</span>
                    </Col>

                </Row>
                <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(72)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(72)  ? '#e06973'  : input === 72 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no73" data-value={target.no73}>{target.no73 !== 0 ? target.no73 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(73)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(73)  ? '#e06973'  : input === 73 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no74" data-value={target.no74}>{target.no74 !== 0 ? target.no74 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(74)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(74)  ? '#e06973'  : input === 74 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no75" data-value={target.no75}>{target.no75 !== 0 ? target.no75 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(75)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(75)  ? '#e06973'  : input === 75 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no76" data-value={target.no76}>{target.no76 !== 0 ? target.no76 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(76)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(76)  ? '#e06973'  : input === 76 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no77" data-value={target.no77}>{target.no77 !== 0 ? target.no77 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(77)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(77)  ? '#e06973'  : input === 77 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no78" data-value={target.no78}>{target.no78 !== 0 ? target.no78 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(78)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(78)  ? '#e06973'  : input === 78 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no79" data-value={target.no79}>{target.no79 !== 0 ? target.no79 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(79)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(79)  ? '#e06973'  : input === 79 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no80" data-value={target.no80}>{target.no80 !== 0 ? target.no80 : ''}</span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0" onClick={() => toInput(80)}
                        style={{
                            width: "33.3333%",
                            height: "33.3333%",
                            flex: "0 0 33.3333%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: correct.includes(80)  ? '#e06973'  : input === 80 ? '#fff59d'  : '#fff'
                        }}>
                        <span className="fs-5" name="no81" data-value={target.no81}>{target.no81 !== 0 ? target.no81 : ''}</span>
                    </Col>

                </Row>
            </div>
            <div className="d-flex flex-column">
                <Button onClick={handleGenerate} style={{ height: 41, maxWidth: "41px", aspectRatio: "1/1" }}>
                    <FaRotateLeft />
                </Button>
                <Button onClick={deleteTarget} style={{ height: 41, maxWidth: "41px", aspectRatio: "1/1" }}
                    variant="danger">
                    <FaArrowLeft />
                </Button>
                <Button onClick={viewResult} style={{ height: 41, maxWidth: "41px", aspectRatio: "1/1" }}
                    variant="info">
                    <FaInfo />
                </Button>
            </div>


            <div className="d-flex flex-wrap justify-content-center ms-5" style={{ height: 90, maxWidth: "90px", aspectRatio: "1/1" }}>

                <Row className="border border-dark d-flex m-0 p-0" style={{ height: 90, aspectRatio: "1/1" }}>

                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}
                        onClick={() => changeTarget(1)}>
                        <span className="fs-5" name="1" data-value={pin.no1}


                            style={{
                                cursor: "pointer",
                            }}>
                            <RiNumber1 />
                        </span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}
                        onClick={() => changeTarget(2)}>
                        <span className="fs-5" name="2" data-value={pin.no2} style={{
                            cursor: "pointer",
                        }}>
                            <RiNumber2 />
                        </span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}
                        onClick={() => changeTarget(3)}>
                        <span className="fs-5" name="3" data-value={pin.no3} style={{
                            cursor: "pointer",
                        }}>
                            <RiNumber3 />
                        </span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}
                        onClick={() => changeTarget(4)}>
                        <span className="fs-5" name="4" data-value={pin.no4} style={{
                            cursor: "pointer",
                        }}>
                            <RiNumber4 />
                        </span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}
                        onClick={() => changeTarget(5)}>
                        <span className="fs-5" name="5" data-value={pin.no5} style={{
                            cursor: "pointer",
                        }}>
                            <RiNumber5 />
                        </span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}
                        onClick={() => changeTarget(6)}>
                        <span className="fs-5" name="6" data-value={pin.no6} style={{
                            cursor: "pointer",
                        }}>
                            <RiNumber6 />
                        </span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}
                        onClick={() => changeTarget(7)}>
                        <span className="fs-5" name="7" data-value={pin.no7} style={{
                            cursor: "pointer",
                        }}>
                            <RiNumber7 />
                        </span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}
                        onClick={() => changeTarget(8)}>
                        <span className="fs-5" name="8" data-value={pin.no8} style={{
                            cursor: "pointer",
                        }}>
                            <RiNumber8 />
                        </span>
                    </Col>
                    <Col className="border d-flex justify-content-center align-items-center p-0"
                        style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}
                        onClick={() => changeTarget(9)}>
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
import Jumbotron from "@templates/Jumbotron";
import { useCallback, useEffect, useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";


//스도쿠를 구성하는 칸(cell)은 총(6X6)X9=8칸, 6X6칸 9개로 세분화되며 지켜야할 룰은 다음과 같다. 
//각각의 가로줄(row) 세로줄(column)에서 1~9가 중복 없이 하나씩 들어간다. 
//6X6칸(box)안에는 1~9가 중복 없이 하나씩 들어간다. 

//처음 제시되는 숫자들의 개수는 30개 이하여야 한다. 






export default function Sudoku() {

    // const [target, setTarget] = useState(
    //     {}
    // );



    // const loadData = useCallback(() => {
    //81칸 중 무작위로 30칸에 숫자가 들어가야한다. 
    //숫자1~81중 무작위로 숫자 30개를 뽑아야 한다. 

    //7번째 자리에 숫자 1를 넣는다. 
    //랜덤 자리에 숫자 1를 넣는다. 
    //30개의 랜덤 자리에 숫자 1를 넣는다. 

    //규칙에 맞는 숫자 30개를 찾는다. 
    //규칙 : 
    //각각의 가로줄(row) 세로줄(column)에서 1~9가 중복 없이 하나씩 들어간다. 
    //6X6칸(box)안에는 1~9가 중복 없이 하나씩 들어간다.
    //no1~no9 : 1~9가 무작위 (1박스)
    //no10~no18 : 1~9가 무작위 (2박스)
    //no19~no27 : 1~9가 무작위 (3박스)
    //no28~no36 : 1~9가 무작위 (4박스)
    //no37~no45 : 1~9가 무작위 (5박스)
    //no46~no54 : 1~9가 무작위 (6박스)
    //no55~no63 : 1~9가 무작위 (7박스)
    //no64~no72 : 1~9가 무작위 (8박스)
    //no73~no81 : 1~9가 무작위 (9박스)

    //no1,no2,no3,no10,no11,no12,no19,no20,no21 : 1~9가 무작위(첫번째가로줄)
    //no4,no5,no6,no13,no14,no15,no22,no23,no24 : 1~9가 무작위(두번째가로줄)
    //no7,no8,no9,no16,no17,no18,no25,no26,no27 : 1~9가 무작위(세번째가로줄)
    //no28,no29,no30,no37,no38,no39,no46,no47,no48 : 1~9가 무작위(네번째가로줄)
    //no31,no32,no33,no40,no41,no42,no49,no50,no51 : 1~9가 무작위(다섯번째가로줄)
    //no34,no35,no36,no43,no44,no45,no52,no53,no54 : 1~9가 무작위(여섯번째가로줄)
    //no55,no56,no57,no64,no65,no66,no73,no74,no75 : 1~9가 무작위(일곱번째가로줄)
    //no58,no59,no60,no67,no68,no69,no76,no77,no78 : 1~9가 무작위(여덟번째가로줄)
    //no61,no62,no63,no70,no71,no72,no79,no80,no81 : 1~9가 무작위(아홉번째가로줄)

    //no1,no4,no7,no28,no31,no34,no55,no58,no61 : 1~9가 무작위(첫번째세로줄)
    //no2,no5,no8,no29,no32,no35,no56,no59,no62 : 1~9가 무작위(두번째세로줄)
    //no3,no6,no9,no30,no33,no36,no57,no60,no63 : 1~9가 무작위(세번째세로줄)
    //no10,no13,no16,no37,no40,no43,no64,no67,no70 : 1~9가 무작위(네번째세로줄)
    //no11,no14,no17,no38,no41,no44,no65,no66,no71 : 1~9가 무작위(다섯번째세로줄)
    //no12,no15,no18,no39,no42,no45,no66,no67,no72 : 1~9가 무작위(여섯번째세로줄)
    //no19,no22,no25,no46,no49,no52,no73,no76,no79 : 1~9가 무작위(일곱번째세로줄)
    //no20,no23,no26,no47,no50,no53,no74,no77,no80 : 1~9가 무작위(여덟번째세로줄)
    //no21,no24,no27,no48,no51,no54,no75,n78,no81 : 1~9가 무작위(아홉번째세로줄)

    //일단 1~9를 9번 무작위로 돌려야함.(?)

    //스도쿠 정답은 두개 이상일 수 없음. 무조건 하나다. 





    // const position = Array.from({ length: 30 }, () => Math.floor(Math.random() * 81) + 1);
    // console.log(position[0]);

    // const numberFirst = Array.from({length:9}, () => Math.floor(Math.random() * 9 ) + 1); 
    // const numberSecond = Array.from({length:9}, () => Math.floor(Math.random() * 9 ) + 1); 
    // const numberThird = Array.from({length:9}, () => Math.floor(Math.random() * 9 ) + 1); 
    // const numberFourth = Array.from({length:9}, () => Math.floor(Math.random() * 9 ) + 1); 
    // const numberFifth = Array.from({length:9}, () => Math.floor(Math.random() * 9 ) + 1); 
    // const numberSixth = Array.from({length:9}, () => Math.floor(Math.random() * 9 ) + 1); 
    // const numberSeventh = Array.from({length:9}, () => Math.floor(Math.random() * 9 ) + 1); 
    // const numberEighth = Array.from({length:9}, () => Math.floor(Math.random() * 9 ) + 1); 
    // const numberNineth = Array.from({length:9}, () => Math.floor(Math.random() * 9 ) + 1); 

    // console.log(numberFirst);

    // const numbers = Array.from({ length: 9 }, (_, index) => index + 1);

    // // 피셔-예이츠 셔플 알고리즘
    // for (let i = numbers.length - 1; i > 0; i--) {
    //     const j = Math.floor(Math.random() * (i + 1));
    //     // 두 요소의 위치를 서로 바꿈 (Destructuring assignment)
    //     [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    // }

    // console.log(numbers);

    // setTarget(prev => ({
    //     ...prev,
    //     [`no${position[0]}`]: 1,
    //     [`no${position[1]}`]: 1,
    //     [`no${position[2]}`]: 1,
    //     [`no${position[3]}`]: 1,
    //     [`no${position[4]}`]: 1,
    //     [`no${position[5]}`]: 1,
    //     [`no${position[6]}`]: 1,
    //     [`no${position[7]}`]: 1,
    //     [`no${position[8]}`]: 1,
    //     [`no${position[9]}`]: 1,
    //     [`no${position[10]}`]: 1,
    //     [`no${position[12]}`]: 1,
    //     [`no${position[13]}`]: 1,
    //     [`no${position[14]}`]: 1,
    //     [`no${position[15]}`]: 1,
    //     [`no${position[16]}`]: 1,
    //     [`no${position[17]}`]: 1,
    //     [`no${position[18]}`]: 1,
    //     [`no${position[19]}`]: 1,
    //     [`no${position[20]}`]: 1,
    //     [`no${position[21]}`]: 1,
    //     [`no${position[22]}`]: 1,
    //     [`no${position[23]}`]: 1,
    //     [`no${position[24]}`]: 1,
    //     [`no${position[25]}`]: 1,
    //     [`no${position[26]}`]: 1,
    //     [`no${position[27]}`]: 1,
    //     [`no${position[28]}`]: 1,
    //     [`no${position[29]}`]: 1,
    //     [`no${position[30]}`]: 1,
    // }));


    // }, [target]);


    // useEffect(() => {
    //     loadData();
    // }, []);

    // 1. 81개의 0으로 채워진 1차원 배열로 상태 관리 (0번 ~ 80번 방)
    const [target, setTarget] = useState(Array(81).fill(0));

    // 2. 1차원 배열 전용 규칙 검사 함수
    const isValid = (currentTarget, index, num) => {
        const row = Math.floor(index / 9); // 번호를 가로줄(0~8)로 환산
        const col = index % 9;             // 번호를 세로줄(0~8)로 환산

        for (let i = 0; i < 9; i++) {
            // 가로줄 전체 검사 (row * 9는 해당 가로줄의 시작 인덱스)
            if (currentTarget[row * 9 + i] === num) return false;
            // 세로줄 전체 검사 (i * 9 + col은 세로로 9칸씩 건너뛰며 검사)
            if (currentTarget[i * 9 + col] === num) return false;
        }

        // 3x3 작은 박스 검사
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const checkIndex = (startRow + i) * 9 + (startCol + j);
                if (currentTarget[checkIndex] === num) return false;
            }
        }
        return true;
    };

    // 3. 1~9 무작위 셔플 함수 (피셔-예이츠)
    const getShuffledNumbers = () => {
        const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        return numbers;
    };

    // 4. 1차원 번호(index)를 1씩 증가시키며 채우는 백트래킹 함수
    const fillTarget = (currentTarget, index = 0) => {
        // 81번 칸까지 도달했다면 성공적으로 다 채운 것임
        if (index === 81) return true;

        const randomNums = getShuffledNumbers();
        for (const num of randomNums) {
            if (isValid(currentTarget, index, num)) {
                currentTarget[index] = num; // 해당 번호 칸에 숫자 대입

                // 다음 번호 칸(index + 1)으로 바톤 터치
                if (fillTarget(currentTarget, index + 1)) return true;

                currentTarget[index] = 0; // 실패 시 다시 0으로 지우기 (백트래킹)
            }
        }
        return false; // 1~9 다 찔러봐도 안 되면 후퇴
    };

    // 5. 버튼 클릭 핸들러
    const handleGenerate = () => {
        const newTarget = Array(81).fill(0); // 새 빈 판 생성
        fillTarget(newTarget);


        setTarget(newTarget); // 리액트 화면 업데이트

        
    };


    // const handleGenerate = () => {
    //     // 1. 81개짜리 빈 배열을 만들고 스도쿠 정답판을 생성합니다.
    //     const newTargetArray = Array(81).fill(0);
    //     fillTarget(newTargetArray); // 내부에서 1차원 배열 알고리즘 동작

    //     // 2. [중요] 배열 데이터를 질문자님의 객체 형태(no1: 값, no2: 값...)로 변환합니다.
    //     const nextTargetObj = {};
    //     newTargetArray.forEach((val, idx) => {
    //         nextTargetObj[`no${idx + 1}`] = val;
    //     });

    //     // 3. 중복 없이 완벽하게 비울 51개의 칸 번호를 뽑습니다.
    //     // 1부터 81까지 번호판을 만든 뒤, 피셔-예이츠로 흔들어서 앞에서 51개만 자릅니다.
    //     const allPositions = Array.from({ length: 81 }, (_, i) => i + 1);
    //     for (let i = allPositions.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [allPositions[i], allPositions[j]] = [allPositions[j], allPositions[i]];
    //     }
    //     const removePositions = allPositions.slice(0, 51); // 정확히 51개 확정

    //     // 4. 뽑힌 51개의 칸을 빈 문자열("")로 청소합니다.
    //     removePositions.forEach((pos) => {
    //         nextTargetObj[`no${pos}`] = "";
    //     });

    //     // 5. 완성이 끝난 최종 객체를 setTarget에 한 번에 집어넣어 화면을 업데이트합니다.
    //     setTarget(nextTargetObj);
    // };


    return (<>
        <Jumbotron title="스도쿠" content="스도쿠게임을 즐겨보세요." />
        <div className="d-flex flex-wrap justify-content-center" style={{ height: 375, maxWidth: "375px", aspectRatio: "1/1" }}>

            <Row className="border border-dark d-flex m-0 p-0" style={{ width: "33.3333%", height: 125, aspectRatio: "1/1" }}>

                <Col className="border d-flex justify-content-center align-items-center p-0"
                    style={{ width: "33.3333%", height: "33.3333%", flex: "0 0 33.3333%" }}>
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
        <button onClick={handleGenerate}>
            새로운 정답판 만들기
        </button>

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
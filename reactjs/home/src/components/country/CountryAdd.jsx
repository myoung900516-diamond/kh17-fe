import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import Jumbotron from "@templates/Jumbotron";
import { Col, Row, Form, Button } from "react-bootstrap";
import { FaAsterisk, FaPlus } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@utils/reaxios";


export default function CountryAdd() {



    const [country, setCountry] = useState({
        countryRegion: "",
        countryName: "",
        countryCapital: "",
        countryPopulation: 0
    });

    const [result, setResult] = useState({
        countryRegion: "",
        countryName: "",
        countryCapital: "",
        countryPopulation: ""
    });
    const valid = useMemo(() => {
        if (result.countryRegion !== "is-valid") return false;
        if (result.countryName !== "is-valid") return false;
        if (result.countryCapital !== "is-valid") return false;
        if (result.countryPopulation !== "is-valid") return false;

        return true;
    }, [result]);

    //페이지이동도구(location 대신 사용)
    const navigate = useNavigate();


    const changeStringValue = useCallback(e => {
        const { name, value } = e.target;

        setCountry({
            ...country,
            [name]: value
        });
    }, [country]);

    const changeNumericValue = useCallback(e => {
        const { name, value } = e.target;
        const regex = /[^0-9]+/g;
        const replacement = value.replace(regex, "");
        const result = parseInt(replacement || 0);

        setCountry({
            ...country,
            [name]: result
        });
    }, [country]);
    const checkCountryRegion = useCallback(() => {
        const regex = /^(아시아|아프리카|[남북]아메리카|유럽|오세아니아)$/;
        const valid = regex.test(country.countryRegion);
        setResult({
            ...result,
            countryRegion: valid ? "is-valid" : "is-invalid"
        });
    }, [country.countryRegion, result]);
    const checkCountryName = useCallback(() => {
        const regex = /^[가-힣]{1,10}$/;
        const valid = regex.test(country.countryName);
        setResult({
            ...result,
            countryName: valid ? "is-valid" : "is-invalid"
        });
    }, [country.countryName, result]);
    const checkCountryCapital = useCallback(() => {
        const valid = country.countryCapital.length > 0;
        setResult({
            ...result,
            countryCapital: valid ? "is-valid" : "is-invalid"
        });
    }, [country.countryCapital, result]);
    const checkCountryPopulation = useCallback(() => {
        const valid = country.countryPopulation > 0;
        setResult({
            ...result,
            countryPopulation: valid ? "is-valid" : "is-invalid"
        });
    }, [country.countryPopulation, result]);

    useEffect(() => {
        if (country.countryRegion === "" && result.countryRegion === "") return;
        checkCountryRegion();
    }, [country.countryRegion, result.countryRegion]);

    //데이터 전송
    const send = useCallback(async ()=>{
        const response = await apiClient.post("/country/", country)
            toast.success("국가 등록이 완료되었습니다.");

            //리앤트에서는 이동을 location.href로 할 수 없다(되는데 안하는게 좋음)
            //상단에 useNavigate()를 이용해서 도구를 생성하고 그 도구를 사용하여 이동 
            //navigate("이동할 페이지")
            navigate("/country/list");
        
    }, [country]);

    return (
        <>

            <Jumbotron title="국가정보" content="국가 정보를 등록합니다" />

            <Row className="mt-4">
                <Form.Label sm={3}>
                    <span>대륙</span>
                    <FaAsterisk className="text-danger" />
                </Form.Label>
                <Col sm={9}>
                    <Form.Select name="countryRegion" className={result.countryRegion}
                        value={country.countryRegion}
                        onChange={changeStringValue}>
                        <option value="">선택하세요</option>
                        <option>아시아</option>
                        <option>아프리카</option>
                        <option>북아메리카</option>
                        <option>남아메리카</option>
                        <option>유럽</option>
                        <option>오세아니아</option>
                    </Form.Select>
                    <div className="invalid-feedback">필수 선택 항목입니다</div>
                </Col>
            </Row>
            {/* 국가이름 입력화면 */}
            <Row className="mt-4">
                <Form.Label sm={3}>
                    <span>국가</span>
                    <FaAsterisk className="text-danger" />
                </Form.Label>
                <Col sm={9}>
                    <Form.Control type="text" name="countryName" className={result.countryName}
                        value={country.countryName} onChange={changeStringValue}
                        onBlur={checkCountryName} />
                    <div className="valid-feedback">국가명이 설정되었습니다</div>
                    <div className="invalid-feedback">국가명은 한글로만 작성 가능합니다.</div>
                </Col>
            </Row>
            {/* 수도이름 입력화면 */}
            <Row className="mt-4">
                <Form.Label sm={3}>
                    <span>수도</span>
                    <FaAsterisk className="text-danger" />
                </Form.Label>
                <Col sm={9}>
                    <Form.Control type="text" name="countryCapital" className={result.countryCapital}
                        value={country.countryCapital} onChange={changeStringValue}
                        onBlur={checkCountryCapital} />
                    <div className="invalid-feedback">필수 선택사항입니다.</div>
                </Col>
            </Row>
            {/* 인구 입력화면 */}
            <Row className="mt-4">
                <Form.Label sm={3}>
                    <span>인구</span>
                    <FaAsterisk className="text-danger" />
                </Form.Label>
                <Col sm={9}>
                    <Form.Control type="text" name="countryPopulation" className={result.countryPopulation}
                        value={country.countryPopulation} onChange={changeNumericValue} onBlur={checkCountryPopulation} />
                    <div className="valid-feedback">인구가 설정되었습니다.</div>
                    <div className="invalid-feedback">인구는 0보다 커야 합니다</div>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <Button type="button" variant="success" className="w-100"
                        disabled={valid === false} onClick={send}>
                        <FaPlus className="me-2" />
                        등록하기</Button>
                </Col>
            </Row>

        </>
    );

};
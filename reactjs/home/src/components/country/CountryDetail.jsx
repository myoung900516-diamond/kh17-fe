import { Link, Navigate, useLinkClickHandler, useNavigate, useParams } from "react-router-dom";
import Jumbotron from "../../templates/Jumbotron";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Row, Form } from "react-bootstrap";
import { FaList, FaTrash, FaPenToSquare, FaSquarePen, FaXmark } from "react-icons/fa6";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";


export default function CountryDetail() {
    //Route에 선언된 파라미터 변수를 읽으려면 useParams()를 사용해야 한다.
    //<Route path="/country/detail/:countryNo">로 써있으면 구조분해할당으로 추출이 가능
    const { countryNo } = useParams();

    //만약 countryNo가 원치 않는 값(ex:숫자가 아닌 경우)을 가지면 다른 화면을 반환시켜야 한다
    //스프링에서는 redirect라고 불렀는데... React에서는 어떻게 처리하느냐? 
    //useNavigate()와 이용해서 처리가 가능한가? (불가능)
    //-> 이런상황을 대비해서 화면이면서 이동이 가능한 태그를 제공 : <Navigate>
    if (/^[0-9]+$/.test(countryNo) === false) {
        return <Navigate to="/country/list" replace />;
    }

    const navigate = useNavigate(() => { }, []);

    //countryNo가 정상적인 숫자인 경우의 처리내용 작성
    const [country, setCountry] = useState(null);

    useEffect(() => {
        loadData();
    }, []);
    const loadData = useCallback(async ()=>{
        const response = await axios.get(`http://localhost:8080/api/country/${countryNo}`)
        setCountry(response.data);
        setBackup(response.data);
    }, []);
    const deleteCountry = useCallback(async () => {
        const result = await Swal.fire({
            title: "sure?",
            text: "no back again",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "delete",
            cancelButtonText: "candel"
        })
        if (result.isConfirmed ===false) return;
        
        const response =await axios.delete(`http://localhost:8080/api/country/${countryNo}`)
        toast.error("done");
        navigate("/country/list");
        
    }, [countryNo]);

    //수정을 구현하기 위해서 논리형 state를 구현
    const [backup, setBackup] = useState(null);
    const [editMode, setEditMode] = useState({
        countryName : false,
        countryCapital : false,
        countryRegion : false,
        countryPopulation:false
    });
    const changeStringValue = useCallback(e=>{
        const {name, value} = e.target;
        setCountry({
            ...country,
            [name]: value
        });
    }, [country]);

    //국가명만 변경하는 함수
    const updateCountryName = useCallback(async ()=>{
        const response = await axios.patch(
            `http://localhost:8080/api/country/${countryNo}` , 
            {countryName : country.countryName});
        setBackup({...backup, countryName:country.countryName});
        setEditMode({...editMode, countryName:false});
    }, [country, backup]);
    return (<>
        <Jumbotron title="국가 상세 정보" content={`${countryNo}번 국가의 상세 정보 화면입니다.`} />
        {/* 상태를 나누어서 출력 */}
        {country === null ? (
            <h1>로딩중입니다...</h1>
        ) : (
            <>
                <Row className="mt-4 fs-2">
                    <Col sm={3} className="text-info fw-bold">
                        국가명
                    </Col>
                    <Col sm={9}>
                        {editMode.countryName !== true ? (<>
                            <span>{country.countryName}</span>
                            <FaSquarePen className="text-warning ms-2" 
                            onClick={e=>{setEditMode({...editMode, countryName : true})}}/>
                        </>) : (<>
                            <Form.Control type="text" className="w-auto d-inline-block" 
                            name="countryName" value={country.countryName} 
                            onChange={changeStringValue}/>
                            <FaCheck className="text-success ms-2" 
                            onClick={updateCountryName}/>
                            <FaXmark className="test-danger ms-2" 
                            onClick={e=>{
                                setCountry({...country, countryName : backup.countryName})
                                setEditMode({...editMode, countryName: false})}}/>
                        </>)}
                        
                    </Col>
                </Row>

                <Row className="mt-4 fs-2">
                    <Col sm={3} className="text-info fw-bold">
                        대륙
                    </Col>
                    <Col sm={9}>
                        {country.countryRegion}
                    </Col>
                </Row>
                <Row className="mt-4 fs-2">
                    <Col sm={3} className="text-info fw-bold">
                        수도
                    </Col>
                    <Col sm={9}>
                        {country.countryCapital}
                    </Col>
                </Row>
                <Row className="mt-4 fs-2">
                    <Col sm={3} className="text-info fw-bold">
                        인구
                    </Col>
                    <Col sm={9}>
                        {country.countryPopulation.toLocaleString()}명
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col sm={3} className="text-end">
                        <Button as={Link} to="/country/list" className="ms-2" variant="secondary">
                            <FaList />
                            <span>목록으로</span></Button>
                        <Button className="ms-2" variant="warning">
                            <FaPenToSquare />
                            <span>수정하기</span></Button>
                        <Button className="ms-2" variant="danger" onClick={deleteCountry}>
                            <FaTrash />
                            <span>삭제하기</span></Button>
                    </Col>
                </Row>
            </>
        )}
    </>)
}
import { useCallback, useEffect, useState } from "react";
import Jumbotron from "../../templates/Jumbotron";
import axios from "axios";
import { FaArrowDown, FaPlus } from "react-icons/fa";
import { ClimbingBoxLoader } from "react-spinners";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function CountryList() {



    const [countryList, setCountryList] = useState([]);
    const [last, setLast] = useState(false);
    const [size, setSize] = useState(10);
    const [loading, setLoading] = useState(false);
    useEffect(() => {

        loadMoreList();
    }, []);
    const loadMoreList = useCallback(() => {
        setLoading(true);
        const dataSize = countryList.length;
        const lastCountryNo = dataSize === 0 ? 0 : countryList[dataSize - 1].countryNo;

        axios({

            url: "http://localhost:8080/api/country/listForReact",
            method: "get",
            params: {
                lastCountryNo: lastCountryNo,
                size: size
            }
        })
            .then(response => {
                setCountryList([...countryList, ...response.data.list]);
                setLast(response.data.last);
            })
            .finally(() => setLoading(false));
    }, [countryList, size]);
    return (
        <>
            <Jumbotron title="국가목록" content="등록된 국가들의 목록을 확인하세요" />

            <Row className="mt-4">
                <Col xs={6}>
                    <Form.Select className="w-auto" value={size} onChange={e => setSize(parseInt(e.target.value))}>
                        <option value="5">5개씩</option>
                        <option value="10">10개씩</option>
                        <option value="20">20개씩</option>
                        <option value="50">50개씩</option>
                    </Form.Select>
                </Col>
                <Col xs={6} className="text-end">
                {/* <Link to="/country/add" className="btn btn-success">
                <FaPlus/>
                <span className="ms-2">신규등록</span>
                </Link> */}
                <Button as={Link} to="/country/add" variant="success">
                    <FaPlus/>
                    <span className="ms-2">신규등록</span>
                </Button>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col>
                    <Table responsive striped hover className="text-nowrap">
                        <thead><tr>
                            <th>번호</th>
                            <th>국가</th>
                            <th>대륙</th>
                            <th>수도</th>
                            <th className="text-end">인구</th>
                        </tr>
                        </thead>
                        <tbody>
                            {countryList.map((country) => (
                                <tr key={country.countryNo}>
                                    <td>{country.countryNo}</td>
                                    <td>
                                        <Link to={`/country/detail/${country.countryNo}`}>
                                        {country.countryName}
                                        </Link>
                                        </td>
                                    <td>{country.countryRegion}</td>
                                    <td>{country.countryCapital}</td>
                                    <td className="text-end">{country.countryPopulation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            {/* 더보기 버튼 */}
            {last === false && (
                <Row className="mt-4">
                    <Col>
                        <Button variant="outline-success" size="lg"
                            onClick={loadMoreList} className="w-100">
                            <FaArrowDown />
                            <span className="mx-2">더보기</span>
                            <FaArrowDown />
                        </Button>
                    </Col>
                </Row>
            )}
            {loading === true && (
                <div className="position-fixed top-0 
                start-0 w-100 h-100 bg-dark bg-opacity-25 
                d-flex justify-content-center align-items-center">
                    <div className="d-flex flex-column text-center">
                        <ClimbingBoxLoader loading={loading} />
                        <p className="mt-2">등록중</p>
                    </div>
                </div>
            )}
        </>
    )
}
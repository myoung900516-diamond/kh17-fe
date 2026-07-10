import Jumbotron from "@templates/Jumbotron";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Col, Form, ListGroup, Row } from "react-bootstrap";

export default function CountrySearch() {
    //state
    const [keyword, setKeyword] = useState("");
    const [searchList, setSearchList] = useState([]);
    const [composition, setComposition] = useState(false);

    //입력중인 값을 제거한 검색용 키워드
    const [result, setResult] = useState("");

    const changeKeyword = useCallback(e => {
        if(e.data !== undefined){
            const replacement = e.target.value.replace()
        }
        else{
            setKeyword(e.target.value);
        }
    }, []);
    //effect
    // - keyword가 변하면 ajax요청을 서버로 전송
    // useEffect(()=>{
    //     searchKeyword();
    // }, [keyword]);
    const searchKeyword = useCallback(async ()=>{
        console.log(composition, keyword);
        if(keyword.length === 0) {
            setSearchList([]);
            return
        }
        const response = await axios.get(`/api/country/countryName/${keyword}`);
        setSearchList(response.data);
    }, [keyword, composition]);
    return (<>
        <Jumbotron title="국가명 검색 샘플" />

        {/* 검색창 */}
        <Row className="mt-4">
            <Col>
                <div className="position-relative">
                    <Form.Control placeholder="검색어입력" size="lg"
                        value={keyword} 
                        onChange={changeKeyword} 
                        onCompositionStart={e=>setComposition(true)}
                        onCompositionUpdate={changeKeyword}
                        onCompositionEnd={e=>setComposition(false)}/>
                    <ListGroup className="position-absolute start-0 end-0 top-100">
                        {searchList.map(country => (
                            <ListGroup.Item key={country.countryNo}>
                                {country.countryName}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>

            </Col>
        </Row>
        <Row className="mt-4">
            <Col>
                <h1>결과가 표시될 영역</h1>
            </Col>
        </Row>

    </>)
}
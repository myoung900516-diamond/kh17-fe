import { useCallback, useEffect, useState } from "react";
import Jumbodtron from "./Jumbodtron";
import axios from "axios";
import { FaArrowDown } from "react-icons/fa";
import { ClimbingBoxLoader } from "react-spinners";



export default function Exam10(){
    const [countryList, setCountryList] = useState([]);
    const [last, setLast] = useState(false);
    const [size, setSize] = useState(10);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        // axios({
        //     url : "http://localhost:8080/api/country/listForReact",
        //     method : "get",
        // })
        // .then(response=>{
        //     setCountryList(response.data);
        // })
        loadMoreList();
    }, []);
    const loadMoreList = useCallback(()=>{
        setLoading(true);
        const dataSize = countryList.length;
        const lastCountryNo = dataSize === 0 ? 0 : countryList[dataSize-1].countryNo;

        axios({
            url : "http://localhost:8080/api/country/listForReact",
            method : "get",
            params : {
                lastCountryNo : lastCountryNo,
                size : size
            }
        })
        .then(response=>{
            setCountryList([...countryList, ...response.data.list]);
            setLast(response.data.last);
        })
        .finally(()=> setLoading(false));
    }, [countryList, size]);
    return(
        <>
            <Jumbodtron title="더보기 방식의 목록"/>

            <div className="row mt-4">
                <div className="col">
                    <select value={size} onChange={e=>setSize(parseInt(e.target.value))}>
                        <option value="5">5개씩</option>
                        <option value="10">10개씩</option>
                        <option value="20">20개씩</option>
                        <option value="50">50개씩</option>
                    </select>
                </div>
            </div>

            <div className="row mt-4">
                            <div className="col">
                                <div className="text-nowrap table-responsive">
                                    <table className="table">
                                    <thead><tr>
                                        <th>번호</th>
                                        <th>국가</th>
                                        <th>대륙</th>
                                        <th>수도</th>
                                        <th className="text-end">인구</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {countryList.map((country)=>(
                                        <tr key={country.countryNo}>
                                            <td>{country.countryNo}</td>
                                            <td>{country.countryName}</td>
                                            <td>{country.countryRegion}</td>
                                            <td>{country.countryCapital}</td>
                                            <td className="text-end">{country.countryPopulation}</td>
                                        </tr>
                                ))}
                                </tbody></table>
                                </div>
                            </div>
                        </div>
            {/* 더보기 버튼 */}
            { last === false && (
            <div className="row mt-4">
                <div className="col">
                    <button type="button" className="btn btn-success btn-lg w-100"
                    onClick={loadMoreList}>
                        <FaArrowDown/>
                        <span className="mx-2">더보기</span>
                        <FaArrowDown/>
                    </button>
                </div>
            </div>
            )}
            {loading === true && (
            <div className="position-fixed top-0 
                start-0 w-100 h-100 bg-dark bg-opacity-25 
                d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column text-center">
            <ClimbingBoxLoader loading={loading}/>
            <p className="mt-2">등록중</p>
            </div>
            </div>
        )}
        </>
    )
}
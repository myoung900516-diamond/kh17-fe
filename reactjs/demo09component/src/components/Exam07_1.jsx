import { useCallback, useEffect, useState } from "react";
import Jumbodtron from "./Jumbodtron";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";



export default function Exam07_1(){

    //서버에서 조회했다고 가정하고 state를 구현 
    const [countryList, setCountryList] = useState([]);

    //effect
    //-시작하자마자 서버에서 비동기통신으로 국가 목록을 달라고 1회 요청
    //-useEffect(함수, []);
    //-연관항목을 비워두면 최초 1회만 실행되는 구문이 됨

    useEffect(()=>{
        //axios요청
        axios({
            url : "http://localhost:8080/api/country/list",
            method : "get",
        })
        .then(response=>{
            // console.log(response);
            setCountryList(response.data);
        });
    }, []);
    const deleteCountry = useCallback(target=>{
    
            Swal.fire({
                title : "sure?",
                text : "no back again",
                icon : "warning",
                showCancelButton : true,
                confirmButtonText : "delete",
                cancelButtonText : "candel"
            })
            .then(confirm=>{
                if(confirm.isConfirmed){
                    const result = countryList.filter(country=>country.countryNo !== target.countryNo);
                    setCountryList(result);
                }
                toast.success("done");
            });
    
        }, [countryList]);
    return(
        <>
            <Jumbodtron title="객체 배열 state의 화면제어"/>
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
                            <th>관리</th>
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
                                <td><FaTrash className="text-danger" onClick={e=>deleteCountry(country)}/></td>
                            </tr>
                    ))}
                    </tbody></table>
                    </div>
                </div>
            </div>
        </>
    )
}
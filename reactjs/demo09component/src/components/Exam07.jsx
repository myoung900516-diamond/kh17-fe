import { useCallback, useState } from "react";
import Jumbodtron from "./Jumbodtron";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";



export default function Exam07(){

    //서버에서 조회했다고 가정하고 state를 구현 
    const [countryList, setCountryList] = useState([
        {countryNo : 1, countryName : "korea", countryRegion : "asia", countryCapital : "seoul", countryPopulation: 5500},
        {countryNo : 2, countryName : "korea", countryRegion : "asia", countryCapital : "seoul", countryPopulation: 5500},
        {countryNo : 3, countryName : "korea", countryRegion : "asia", countryCapital : "seoul", countryPopulation: 5500},
        {countryNo : 4, countryName : "korea", countryRegion : "asia", countryCapital : "seoul", countryPopulation: 5500},
        {countryNo : 5, countryName : "korea", countryRegion : "asia", countryCapital : "seoul", countryPopulation: 5500}
    ]);
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
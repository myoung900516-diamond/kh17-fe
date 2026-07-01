import { useState } from "react";
import Jumbodtron from "./Jumbodtron";
import { useCallback } from "react";
import { useMemo } from "react";


export default function Exam03(){

    const [country, setCountry] = useState({
        countryRegion : "",
        countryName : "", 
        countryCapital : "", 
        countryPopulation : 0
    });
    const changeStringValue = useCallback(e=>{
      const {name, value} = e. target;

        setCountry({
          ...country, 
          [name] : value 
        });
    }, [country]);

    const changeNumericValue = useCallback(e=>{
      const {name, value} = e. target;

        setCountry({
          ...country, 
          [name] : parseInt(value || 0) 
        });
    }, [country]);

    const allValid = useMemo(()=>{return 
        changeStringValue != null && changeNumericValue != null; 
    }, [changeStringValue, changeNumericValue]);
    return(
        <>

        <Jumbodtron title="국가정보" content="국가 정보를 등록합니다"/>

            {/* 대륙이름 입력화면 */}
        <div className="row mt-4">
        <label className="col-sm-3 col-form-label">대륙</label>
        <div className="col-sm-9">
          <input type="text" name="countryRegion" className="form-control" 
              value={country.countryRegion} onChange={changeStringValue}/>
        </div>
        </div>
        {/* 국가이름 입력화면 */}
        <div className="row mt-4">
        <label className="col-sm-3 col-form-label">국가</label>
        <div className="col-sm-9">
          <input type="text" name="countryName" className="form-control" 
              value={country.countryName} onChange={changeStringValue}/>
        </div>
        </div>
        {/* 수도이름 입력화면 */}
        <div className="row mt-4">
        <label className="col-sm-3 col-form-label">수도</label>
        <div className="col-sm-9">
          <input type="text" name="countryCapital" className="form-control" 
              value={country.countryCapital} onChange={changeStringValue}/>
        </div>
        </div>
        {/* 인구 입력화면 */}
        <div className="row mt-4">
        <label className="col-sm-3 col-form-label">인구</label>
        <div className="col-sm-9">
          <input type="text" name="countryPopulation" className="form-control" 
              value={country.countryPopulation} onChange={changeNumericValue}/>
        </div>
        </div>
        <div className="row mt-5">
        <div className="col">
          <button className="btn btn-lg btn-success w-100" disabled={allValid === false}>등록하기</button>
        </div>
      </div>

        </>
    );

};
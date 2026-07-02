import { useState } from "react";
import Jumbodtron from "./Jumbodtron";
import { useCallback } from "react";
import { useMemo } from "react";


export default function Exam03(){
  
  
  
  //state - 역동적인 화면을 만들기 위한 핵심데이터 
    const [country, setCountry] = useState({
      countryRegion : "",
      countryName : "", 
      countryCapital : "", 
      countryPopulation : 0
    });
  //memo - state를 이용해서 추가적으로 계산해내는 데이터 (연관항목을 적어 실행 최소화해야함)
    const countryRegionValid = useMemo(()=>{
      const regex = /^(아시아|아프리카|[남북]아메리카|유럽|오세아니아)$/;
      return regex.test(country.countryRegion);
    }, [country.countryRegion]);
    const countryNameValid = useMemo(()=>{
      const regex = /^[가-힣]{1,10}$/;
      return regex.test(country.countryName);
    }, [country.countryName]);
    const countryCapitalValid = useMemo(()=>{
      return country.countryCapital.length > 0;
    }, [country.countryCapital]);
    const countryPopulationValid = useMemo(()=>{
      return country.countryPopulation > 0;
    }, [country.countryPopulation]);

    const valid = useMemo(()=>{
      return countryRegionValid && countryNameValid && countryCapitalValid && countryPopulationValid
    }, [
      countryRegionValid,
      countryNameValid,
      countryCapitalValid,
      countryPopulationValid
    ]);

    //유효성 검사 결과를 저장
    const countryRegionClass = useMemo(()=>{
      if(country.countryRegion.length === 0) return "";
      return countryRegionValid ? "is-valid" : "is-invalid";
    }, [countryRegionValid, country.countryRegion])
    const countryNameClass = useMemo(()=>{
      if(country.countryName.length === 0) return "";
      return countryRegionValid ? "is-valid" : "is-invalid";
    }, [countryNameValid, country.countryName]);
    const countryCapitalClass = useMemo(()=>{
      if(country.countryCapital.length === 0) return "";
      return countryCapitalValid? "is-valid" : "is-invalid";
    }, [countryCapitalValid, country.countryCapital]);
    const countryPopulationClass = useMemo(()=>{
      return countryPopulationValid? "is-valid" : "is-invalid";
    }, [countryPopulationValid, country.countryPopulation])

  //callback - 호출 가능한 함수(연관항목을 적어 갱신을 최소화)

    const changeStringValue = useCallback(e=>{
      const {name, value} = e.target;

        setCountry({
          ...country, 
          [name] : value 
        });
    }, [country]);

    const changeNumericValue = useCallback(e=>{
      const {name, value} = e.target;
      const regex = /[^0-9]/g;
      const replacement = value.replace(regex, "");
      const result = parseInt(replacement);

        setCountry({
          ...country, 
          [name] : result
        });
    }, [country]);

    return(
        <>

        <Jumbodtron title="국가정보" content="국가 정보를 등록합니다"/>

            {/* 대륙이름 입력화면 */}
        <div className="row mt-4">
        <label className="col-sm-3 col-form-label">대륙</label>
        <div className="col-sm-9">
          <select name="countryRegion" className={`form-control ${countryRegionClass}`} 
              value={country.countryRegion} onChange={changeStringValue}>
                <option value="">선택하세요</option>
                <option>아시아</option>
                <option>아프리카</option>
                <option>북아메리카</option>
                <option>남아메리카</option>
                <option>유럽</option>
                <option>오세아니아</option>
              </select>
              <div className="invalid-feedback">필수 선택 항목입니다</div>
        </div>
        </div>
        {/* 국가이름 입력화면 */}
        <div className="row mt-4">
        <label className="col-sm-3 col-form-label">국가</label>
        <div className="col-sm-9">
          <input type="text" name="countryName" className={`form-control ${countryNameClass}`} 
              value={country.countryName} onChange={changeStringValue}/>
          <div className="valid-feedback">국가명이 설정되었습니다</div>
          <div className="invalid-feedback">국가명은 한글로만 작성 가능합니다.</div>
        </div>
        </div>
        {/* 수도이름 입력화면 */}
        <div className="row mt-4">
        <label className="col-sm-3 col-form-label">수도</label>
        <div className="col-sm-9">
          <input type="text" name="countryCapital" className={`form-control ${countryCapitalClass}`} 
              value={country.countryCapital} onChange={changeStringValue}/>
          <div className="invalid-feedback">필수 선택사항입니다.</div>
        </div>
        </div>
        {/* 인구 입력화면 */}
        <div className="row mt-4">
        <label className="col-sm-3 col-form-label">인구</label>
        <div className="col-sm-9">
          <input type="text" name="countryPopulation" className={`form-control ${countryPopulationClass}`} 
              value={country.countryPopulation} onChange={changeNumericValue}/>
          <div className="valid-feedback">인구가 설정되었습니다.</div>
          <div className="invalid-feedback">인구는 0보다 커야 합니다</div>
        </div>
        </div>
        <div className="row mt-5">
        <div className="col">
          <button className="btn btn-lg btn-success w-100" disabled={valid === false}>등록하기</button>
        </div>
      </div>

        </>
    );

};
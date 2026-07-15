import Jumbotron from "@templates/Jumbotron";
import { useCallback, useState } from "react";
import { Button } from "react-bootstrap";
import TestLeft from "./TestLeft";
import TestRight from "./TestRight";
import { useAtom } from "jotai";
import { countState } from "@src/utils/storage";

//properties drilling
//state를 하위 컴포넌트에서 제어할 수 있음 
//또 하위 그 하위에서 제어할 수 있음 

export default function TestMain() {
    //state
    // const [count, setCount] = useState(0); //component단위로 작동하는 react state
    const [count, setCount] = useAtom(countState); //storage에 만든 jotai state

    //callback
    return (<>
        <Jumbotron title="통합 저장소(jotai)의 필요성" />

        <h1>Count : {count}</h1>

        <TestLeft/>
        <TestRight/>
        
        
    </>)
}
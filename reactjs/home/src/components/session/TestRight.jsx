import { useAtom } from "jotai";
import { Button } from "react-bootstrap";
import { countState } from "@src/utils/storage";
export default function TestRight(){
    const [count, setCount] = useAtom(countState);
    
    return(<>
        <Button variant="primary" className="me-2"
            onClick={e=>setCount(count+10)}>+10</Button>
    </>)
}
import { Link } from "react-router-dom";


export default function Header(){

    return(
        <>
         <div className="d-flex">
            <div className="w-25 text-start"></div>
            <div className="w-50 text-center">
                <h1>
                    <span as={Link} to="/">KH정보교육원</span>
                </h1>
            </div>
            <div className="w-25 text-end"></div>
         </div>
        </>
    )
}
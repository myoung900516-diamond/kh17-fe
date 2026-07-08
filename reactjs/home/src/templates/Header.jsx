import { Link } from "react-router-dom";


export default function Header(){

    return(
        <>
         <div className="d-flex">
            <div className="w-25 text-start"></div>
            <div className="w-50 text-center">
                <h1>
                    <Link to="/" className="text-decoration-none text-dark">KH정보교육원</Link>
                </h1>
            </div>
            <div className="w-25 text-end"></div>
         </div>
        </>
    )
}
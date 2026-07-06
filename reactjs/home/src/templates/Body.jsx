import { Route, Routes } from "react-router-dom";
import BookList from "../components/book/BookList";
import CountryList from "../components/country/CountryList";
import LectureList from "../components/lecture/LectureList";
import NotFound from "../error/NotFound";
import Home from "../components/Home";


export default function Body(){

    return(
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/country/list" element={<CountryList/>}></Route>
            <Route path="/lecture/list" element={<LectureList/>}></Route>
            <Route path="/book/list" element={<BookList/>}></Route>
            <Route path="*" element={<NotFound/>}></Route>
        </Routes>
    )
}
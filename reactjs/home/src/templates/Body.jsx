import { Route, Routes } from "react-router-dom";

import Home from "@components/Home";

import BookList from "@components/book/BookList";
import BookAdd from "@components/book/BookAdd";
import BookDetail from "@components/book/BookDetail";
import BookEdit from "@components/book/BookEdit";
import BookSpa from "@components/book/BookSpa";

import CountryList from "@components/country/CountryList";
import CountryAdd from "@components/country/CountryAdd";
import CountryDetail from "@components/country/CountryDetail";
import CountryEdit from "@components/country/CountryEdit";
import CountrySearch from "@components/country/CountrySearch";
import CountryComplexSearch from "@components/country/CountryComplexSearch";

import LectureAdd from "@components/lecture/LectureAdd";
import LectureList from "@components/lecture/LectureList";
import LectureDetail from "@components/lecture/LectureDetail";
import LectureEdit from "@components/lecture/LectureEdit";

import NotFound from "@error/NotFound";

import AccountJoin from "@components/account/AccountJoin";
import AccountJoinSuccess from "@components/account/AccountJoinSuccess";
import AccountJoinFail from "@components/account/AccountJoinFail";
import AccountLogin from "@components/account/AccountLogin";
import AccountPassword from "@components/account/AccountPassword";
import AccountChange from "@components/account/AccountChange";
import MyPage from "@components/account/MyPage";

import TestMain from "@components/session/TestMain";
import Private from "@guard/Private";

import AdminUsers from "@components/admin/AdminUsers";
import Admin from "@guard/Admin";


export default function Body(){

    return(
        <Routes>
            <Route path="/" element={<Home/>}></Route>

            <Route path="/country/list" element={<CountryList/>}></Route>
            <Route path="/country/add" element={<CountryAdd/>}></Route>
            {/* 제일 마지막에 적혀있는 값을 countryNo라는 이름으로 관리하겠다. */}
            <Route path="/country/detail/:countryNo" element={<CountryDetail/>}></Route>
            <Route path="/country/edit/:countryNo" element={<CountryEdit/>}></Route>
            <Route path="/country/search" element={<CountrySearch/>}></Route>
            <Route path="/country/complex" element={<CountryComplexSearch/>}></Route>

            <Route path="/lecture/list" element={<LectureList/>}></Route>
            <Route path="/lecture/add" element={<LectureAdd/>}></Route>
            <Route path="/lecture/detail/:lectureNo" element={<LectureDetail/>}></Route>
            <Route path="/lecture/edit/:lectureNo" element={<LectureEdit/>}></Route>

            <Route path="/book/list" element={<BookList/>}></Route>
            <Route path="/book/spa" element={<BookSpa/>}></Route>
            <Route path="/book/add" element={<BookAdd/>}></Route>
            <Route path="/book/detail/:bookId" element={<BookDetail/>}></Route>
            <Route path="/book/edit/:bookId" element={<BookEdit/>}></Route>
            
            <Route path="/account/join" element={<AccountJoin/>}></Route>
            <Route path="/account/joinSuccess" element={<AccountJoinSuccess/>}></Route>
            <Route path="/account/joinFail" element={<AccountJoinFail/>}></Route>
            <Route path="/account/login" element={<AccountLogin/>}></Route>
            <Route path="/account/mypage" element={<Private><MyPage/></Private>}></Route>
            <Route path="/account/password" element={<Private><AccountPassword/></Private>}></Route>
            <Route path="/account/change" element={<Private><AccountChange/></Private>}></Route>
            
            
            <Route path="/admin/users" element={<Admin><AdminUsers/></Admin>}></Route>
            
            
            <Route path="/session/test" element={<TestMain/>}></Route>
            
            <Route path="*" element={<NotFound/>}></Route>
        </Routes>
    )
}
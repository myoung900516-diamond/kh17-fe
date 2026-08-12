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

import AccountBlock from "@error/AccountBlock";
import AccountJoin from "@components/account/AccountJoin";
import AccountJoinSuccess from "@components/account/AccountJoinSuccess";
import AccountJoinFail from "@components/account/AccountJoinFail";
import AccountLogin from "@components/account/AccountLogin";
import AccountPassword from "@components/account/AccountPassword";
import AccountChange from "@components/account/AccountChange";
import MyPage from "@components/account/MyPage";
import AccountNeedUpdate from "@components/account/AccountNeedUpdate";
import AccountCart from "@components/account/AccountCart";

import TestMain from "@components/session/TestMain";
import Private from "@guard/Private";

import AdminUsers from "@components/admin/AdminUsers";
import AdminUsersScroll from "@components/admin/AdminUsersScroll";
import Admin from "@guard/Admin";
import AdminDetail from "@components/admin/AdminDetail";
import AdminSaleAdd from "@components/admin/sale/AdminSaleAdd";
import AdminSaleEdit from "@components/admin/sale/AdminSaleEdit";

import SaleList from "@components/sale/SaleList";
import SaleDetail from "@components/sale/SaleDetail";

import Sudoku from "@components/minigame/Sudoku";
import Sudoku2 from "@components/minigame/Sudoku2";

import KakaopayBuyVersion1 from "@components/pay/v1/KakaopayBuyVersion1";
import KakaopayBuySuccessVersion1 from "@components/pay/v1/KakaopayBuySuccessVersion1";
import KakaopayBuyCancelVersion1 from "@components/pay/v1/KakaopayBuyCancelVersion1";
import KakaopayBuyFailVersion1 from "@components/pay/v1/KakaopayBuyFailVersion1";

import KakaopayBuyVersion2 from "@components/pay/v2/KakaopayBuyVersion2";
import KakaopayBuySuccessVersion2 from "@components/pay/v2/KakaopayBuySuccessVersion2";
import KakaopayBuyCancelVersion2 from "@components/pay/v2/KakaopayBuyCancelVersion2";
import KakaopayBuyFailVersion2 from "@components/pay/v2/KakaopayBuyFailVersion2";
import KakaopayBuyDetailVersion2 from "@components/pay/v2/KakaopayBuyDetailVersion2";

import WebSocketV1BasicClient from "@components/websocket/WebSocketV1BasicClient";
import WebSocketV2AdvancedClient from "@components/websocket/WebSocketV2AdvancedClient";
import WebSocketV3MemberClient from "@components/websocket/WebSocketV3MemberClient";
import WebSocketV4RoomList from "@components/websocket/WebSocketV4RoomList";
import WebSocketV4RoomClient from "@components/websocket/WebSocketV4RoomClient";

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
            <Route path="/account/cart" element={<Private><AccountCart/></Private>}></Route>
            <Route path="/account/needupdate" element={<AccountNeedUpdate/>}></Route>
            
            
            <Route path="/admin/users" element={<Admin><AdminUsers/></Admin>}></Route>
            <Route path="/admin/users2" element={<Admin><AdminUsersScroll/></Admin>}></Route>
            <Route path="/admin/detail/:accountId" element={<Admin><AdminDetail/></Admin>}></Route>
            <Route path="/admin/saleadd" element={<Admin><AdminSaleAdd/></Admin>}></Route>
            <Route path="/admin/sale/edit/:saleNo" element={<Admin><AdminSaleEdit/></Admin>}></Route>
            
            <Route path="/sale/list" element={<SaleList/>}></Route>
            <Route path="/sale/detail/:saleNo" element={<SaleDetail/>}></Route>
            
            <Route path="/minigame/sudoku" element={<Sudoku/>}></Route>
            <Route path="/minigame/sudoku2" element={<Sudoku2/>}></Route>
            
            
            {/* <Route path="/session/test" element={<TestMain/>}></Route> */}
            
            <Route path="/pay/v1/buy" element={<KakaopayBuyVersion1/>}></Route>
            <Route path="/pay/v1/buy/success" element={<KakaopayBuySuccessVersion1/>}></Route>
            <Route path="/pay/v1/buy/cancel" element={<KakaopayBuyCancelVersion1/>}></Route>
            <Route path="/pay/v1/buy/fail" element={<KakaopayBuyFailVersion1/>}></Route>
            
            <Route path="/pay/v2/buy" element={<Private><KakaopayBuyVersion2/></Private>}></Route>
            <Route path="/pay/v2/buy/success/:purchaseNo" element={<Private><KakaopayBuySuccessVersion2/></Private>}></Route>
            <Route path="/pay/v2/buy/cancel" element={<Private><KakaopayBuyCancelVersion2/></Private>}></Route>
            <Route path="/pay/v2/buy/fail" element={<Private><KakaopayBuyFailVersion2/></Private>}></Route>
            <Route path="/pay/v2/buy/detail/:purchaseNo" element={<Private><KakaopayBuyDetailVersion2/></Private>}></Route>
            
            <Route path="/account/block" element={<AccountBlock/>}></Route>

            <Route path="/websocket/v1" element={<WebSocketV1BasicClient/>}/>
            <Route path="/websocket/v2" element={<WebSocketV2AdvancedClient/>}/>
            <Route path="/websocket/v3" element={<Private><WebSocketV3MemberClient/></Private>}/>
            <Route path="/websocket/v4" element={<WebSocketV4RoomList/>}/>
            <Route path="/websocket/v4/:roomNo" element={<Private><WebSocketV4RoomClient/></Private>}/>

            <Route path="*" element={<NotFound/>}></Route>
        </Routes>
    )
}
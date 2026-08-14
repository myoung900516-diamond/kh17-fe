import { Route, Routes } from "react-router-dom";

import NotFound from "../components/NotFound";

import Home from "../components/Home";

import PostList from "../components/PostList";
import PostDetail from "../components/PostDetail";
import PostEdit from "../components/PostEdit";
import PostAdd from "../components/PostAdd";

export default function Body(){
    return(<>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/anonymous" element={<PostList/>}></Route>
            <Route path="/anonymous/detail/:postNo" element={<PostDetail/>}></Route>
            <Route path="/anonymous/edit/:postNo" element={<PostEdit/>}></Route>
            <Route path="/anonymous/add" element={<PostAdd/>}></Route>
            <Route path="*" element={<NotFound/>}></Route>
        </Routes>
    </>);
}
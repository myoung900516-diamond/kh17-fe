//통합 상태(state) 저장소
//-utils/storage/index.js
//통합하여 관리할 데이터들을 조-타이(jotai) 기술에서 제공하는 도구로 생성한 뒤 내보내기
//-필요한 컴포넌트에서 여기서 만든 도구들을 import하여 사용(properties로 전달할 필요가 없다)

//-생성방법 : atom 함수 사용
import {atom} from "jotai";
import {atomWithStorage, createJSONStorage, RESET} from "jotai/utils";
//-TestMain, TestLeft, TestRight에서 공유할 count라는 이름의 통합상태(atom)을 생성

//const [count, setCount] = useState(0);
export const countState = atom(0);

//로그인 결과를 저장할 통합상태 생성
// export const loginState = atom(null);

//객체 데이터를 저장하면서 localStroage, sessionStrorage를 선택하고 싶다면 직렬화 도구를 직접 생성해야함
const localStorageWrapper = createJSONStorage(()=>window.localStroage);
const sessionStorageWrapper = createJSONStorage(()=>window.sessionStorage);

export const loginUserState = atomWithStorage("loginUserState", null, sessionStorageWrapper);

export const isLoginState = atom(get=>{

    const loginUser =get(loginUserState);
    return loginUser !== null;

});
export const isAdminState = atom(get=>{
    const loginUser = get(loginUserState);
    return loginUser?.accountLevel === "마스터";
});

//atom을 변경하기 위한 파생 atom
//[1] 로그인 처리를 수행하는 atom
export const loginActionState = atom(null, (get, set, data)=>{
    set(loginUserState, data);
});
//[2] 로그아웃 처리를 수행하는 atom
export const logoutActionState = atom(null, (get, set)=>{
    //set(변수명, 값)
    set(loginUserState, RESET);
});




//마지막에 개발자 도구에 표시될 라벨을 설정(위치 무관)
countState.debugLabel="연습용 카운트";

loginUserState.debugLabel="로그인유저의정보";
isLoginState.debugLabel="로그인상태";
isAdminState.debugLabel="관리자여부";
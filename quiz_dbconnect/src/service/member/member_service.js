const dao = require("../../database/member/member.dao")

const login = async (req) => {
    console.log("ser body : ", req.body.id)

    const result = await dao.login(req.body.id);
    console.log("ser result : ", result )
    let msg="", url="";
    console.log("req.body.id => ",req.body.id)
    if(result != undefined){
        if(req.body.id == result.ID){
            if(req.body.pwd == result.PWD){
                req.session.userid = result.PWD;
                req.session.name = result.NAME;
                msg = result.NAME+"님 환영합니다"
                url = "/"
            } else{
                msg = "비밀번호가 틀렸습니다!!!"
                url = "/"
            }
        }
    }else{
        msg="존재하지 않는 아이디입니다."
        url = "/"
    }
    return getMessage(msg, url);
}
const getMessage = (msg, url) => {
    return `<script>alert("${msg}");location.href="${url}";</script>`;
}

const getList = async() =>{
    const result = await dao.getList();
    console.log( "ser result : ", result);
    return result.rows; 
}
const register = async ( body ) => {
    const result = await dao.register( body );
    console.log("ser result : ", result )
    let msg="", url="";
    if( result != 0 ){//성공 저장
        msg = "회원가입 성공";
        url ="/member/login_form";
    }else{ // 실패
        msg = "문제 발생!!!!";
        url ="/member/register_form";
    }
    return getMessage(msg, url);
}

const logout = (req) =>{
    req.session.destroy(); // 모드 세션 종료
    const msg = `<script>
        alert("로그아웃되었습니다!!!"); location.href = "/";
    </script>`;
    return msg;
}

const getMember = async(mId) => {
    console.log("ser result(mId) : ", mId)
    const result = await dao.getMember(mId);
    console.log("ser result : ", result)
    return result;
}

const modify = async ( body ) => {
    let result = await dao.modify( body );

    let msg="", url="";
    if( result != 0 ){//수정 성공
        msg = "수정되었음!!!";
        url ="/member/member_view/"+body.id;
    }else{ // 실패
        msg = "문제 발생!!!!";
        url ="/member/modify_form?id="+body.id;
    }
    return getMessage(msg, url);
}

const deleteM = async (body) => {
    console.log("deleteM =>",body)
    const result = await dao.deleteM(body.id);

    let msg="", url="";
    if( result != 0 ){//삭제
        msg = "삭제되었음!!!";
        url ="/member/member_list";
    }else{ // 실패
        msg = "문제 발생!!!!";
        url ="/member/member_view/"+body.id;
    }
    return getMessage(msg, url);
}
module.exports = {deleteM,modify,getMember,logout,register,getList,login}
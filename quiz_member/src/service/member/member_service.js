const memberDAO = require("../../database/member/member_dao");
const loginCheck = async ( body )=>{
    let member = await memberDAO.getMember( body.id );
    console.log("login chk => ",member);
    let msg="", url="", msgPack = {};
    if(member.rows.length == 1){
        member = member.rows[0];
        if( member.PWD === body.pwd ){
            msg = `${member.NAME}님 환영합니다^^`;
            url = "/";
            msgPack.result = 0;
        }else{
            msg = "비밀번호가 틀렸습니다!!!";
            url = '/member/login';
            msgPack.result = 1;
        }
    }else{
        msg = "존재하지 않는 아이디입니다!!";
        url = "/member/login";
        msgPack.result = 1;
    }
    msgPack.msg = getMessage(msg, url);
    console.log("msgPack =>",msgPack )
    return msgPack;
};
const  getMessage = (msg, url) =>{
    return `<script>alert('${msg}'); location.href="${url}";</script>`;
}
const memberList = () =>{
    return memberDAO.memberList();
}
const register = async ( body )=>{
    let result = await memberDAO.register( body );
    let msg="", url="";
    console.log("result : ", result);
    if(result !== undefined){      
        msg = `${body.name}님 회원가입 성공^^`;
        url = "/member/login";
    }else{
        msg = "문제가 발생했습니다!!!";
        url = '/member/register_view';
    }
    return getMessage(msg, url);
}

const getMember =  async ( id ) => {
    const member = await memberDAO.getMember( id);
    console.log( "mem : ", member)
    return member.rows[0];
}
const deleteM = async(id) =>{
    memberDAO.deleteM(id);
}
const modify = ( body ) => {
    memberDAO.modify( body )
}

module.exports = {modify,deleteM,getMember,loginCheck , memberList , register };
;
    

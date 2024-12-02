const dao = require("../../database/member/member_dao")
const loginCheck = async ( body , req , res) => {
    let msg;
    let url;
    const result = await dao.loginCheck( body.id );
    //`select * from members where id='${username}'`
    if(result.rows.length == 0 ){
        msg = "존재하지 않는 id"
        url = "/member/login_form"
    }else{
       if(result.rows[0].PWD == body.pwd ){
            req.session.username = body.id;
            req.session.name =  result.rows[0].NAME
            res.cookie("isLogin", true)
            msg = "성공"
            url = "/"
       }else{
            msg = "비번틀림"
            url = "/member/login_form"
       }
    }
    return getMessage(msg, url);
}
const getMessage = (msg, url )=>{
    return `<script>
                alert("${msg}");
                location.href="${url}";
            </script>`;
}
const getList = async () => {
    const result = await dao.getList();
    console.log("ser result : ", result)
    return result.rows;
}
const register = async ( body ) => {
    let result = await dao.register(body);
    let msg ="", url = "";
    
    if( result ){
        msg = `${body.name}님 가입 축하!!!`;
        url = `/member/login_form`;
    }else{
        msg = `문제 발생!!!`;
        url = `/member/register_form`;
    }
    return getMessage(msg, url);
}
const getMember =  async ( id ) => {
    const member = await dao.loginCheck( id );
    console.log( "mem : ", member)
    return member.rows[0];
}
const del = (id) =>{
    dao.del(id);
}
const modify = ( body ) => {
    dao.modify( body )
}
module.exports = {modify, del, getMember, register, getList, loginCheck }
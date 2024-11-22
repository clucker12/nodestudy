const ser = require("../../service/member/member_service");
const login = (req, res) =>{
    res.render("member/login");
}
const loginCheck = async (req, res) =>{
    const msgPack = await ser.loginCheck( req.body );
    if( msgPack.result === 0){
        req.session.username = req.body.id;
    }
    res.send( msgPack.msg );
}
const logout = (req, res) =>{
        req.session.destroy();
        res.redirect("/");
}
const memberList = async (req, res) =>{
    const list = await ser.memberList();
    res.render("member/list",{ list : list });
    }
const registerView = (req, res) =>{
    res.render("member/register_view");
}
const register = async (req, res) => {
     const msg = await ser.register( req.body );
    res.send( msg );
    }
const info = async (req,res) =>{
    console.log("param : ", req.params );
    let member = await ser.getMember( req.params.id );
    // console.log("ctrl member : ", member)
    res.render("member/info", { member});
}   
const deleteM = async (req, res)=>{
    ser.deleteM( req.session.username )
    res.redirect("/member/logout")
}
const modifyForm = async (req, res) => {
    console.log( req.query )
    //res.send("수정")
    const member = await ser.getMember( req.query.id);
    res.render("member/modify_form",
                    { member})
}
const modify = (req, res) => {
    console.log("body : ", req.body)
    ser.modify( req.body )
    res.redirect("/member/info/"+req.body.id);
}
    
          
module.exports = {modify,modifyForm,deleteM,info,register, registerView, memberList, logout,login , loginCheck };


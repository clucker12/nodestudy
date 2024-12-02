const ser = require("../../service/member/member_service")
const loginForm = (req, res) => {
    console.log("login form")
    res.render("member/login" , {id : req.session.username });
}
const loginCheck = async (req, res) => {
    console.log("loginCh ctrl : ", req.body)
    const msg = await ser.loginCheck( req.body , req , res );
    res.send( msg )
    //res.render("member/login_check", {msg});
}
const logout = (req, res) => {
    req.session.destroy();
    res.clearCookie('isLogin')
    res.redirect("/")
}
const list = async (req, res) => {
    console.log( req.session.name )
    console.log( req.session.username )
    if( !req.session.name ){
        return res.redirect("/member/login_form")
    }
    const list = await ser.getList();

    res.render("member/list",{list, id:req.session.username});
}
const registerForm = (req, res) => {
    res.render("member/register_view",{id : req.session.username})
}
const register = async (req, res) => {
    //console.log( "req.body :",req.body )
    const msg = await ser.register( req.body );
    res.send( msg )
}
const info = async (req, res) => {
    console.log("params : ", req.params )
    const member = await ser.getMember( req.params.id );
    res.render("member/info",{member, id : req.session.username});
}
const del = (req, res) => {
    ser.del( req.session.username )
    res.redirect("/member/logout")
}
const modifyForm = async (req, res) => {
    console.log( req.query )
    //res.send("수정")
    const member = await ser.getMember( req.query.id );
    res.render("member/modify_form",
                    { member, id : req.session.username })
}
const modify = (req, res) => {
    console.log("body : ", req.body)
    ser.modify( req.body )
    res.redirect("/member/info/"+req.body.id);
}
module.exports = {modify, modifyForm, info, del,
    register, registerForm, list, logout, loginCheck, loginForm }
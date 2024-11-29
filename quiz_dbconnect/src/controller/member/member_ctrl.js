const oracledb = require("oracledb");
const dbConfig = 
            require("../../../config/database/db_config")
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

const ser = require("../../service/member/member_service")

const loginForm = (req,res) => {
    res.render("member/login_form",{ username : req.session.name, userid : req.session.userid });
}

const login = async (req,res) => {
    console.log(req.body) //post방식의 객체를 가져옴
    // const result = ser.login(req.body);
    let msg = await ser.login(req);
    res.send(msg);
}

const memberList = async (req,res) => {
    const result = await ser.getList();
    // console.log("req.session.name => ", req.session.name)
    if(req.session.name != undefined){
        res.render("member/member_list",{result,username : req.session.name})
    }else{
        res.render("member/login_form",{ username : req.session.name });
    }
    
}

const regForm = (req, res) => {
    res.render("member/register_form",{ username : req.session.name });
}

const register = async (req, res)=>{
    console.log( req.body );
    let msg = await ser.register( req.body );
    console.log("msg : " , msg );
    res.send( msg );
}

const logout = (req,res) => {
    const msg = ser.logout(req);
    res.send(msg);
}
const memberView = async (req, res) => {
    console.log("param : ", req.params );
    let member = await ser.getMember( req.params );
    console.log("ctrl member : ", member)
    res.render("member/member_view", { member,username : req.session.name });
}
const modifyForm = async (req, res) => {
    console.log("req.query => ", req.query );
    const member = await ser.getMember( req.query );
    console.log("ctrl modify : ", member)
    res.render("member/modfiy_form", { member,username : req.session.name  } )
}
const modify = async(req, res)=>{
    let msg = await ser.modify( req.body );
    res.send( msg );
}
const deleteM = async (req, res)=>{
    console.log("req.session.userid : ",req.session.userid)
    ser.deleteM( req.session.userid )
    res.redirect("/member/logout")
}
module.exports = {deleteM,modify,modifyForm,memberView,logout,register,regForm,memberList,loginForm,login}
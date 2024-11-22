const service = require("../../service/member/member_service")
const loginform = (req, res )=>{
    res.render("member/login",{username : req.session.username});
}
const loginCheck = (req,res) => {
    console.log(req.query.id) //get방식의 객체 가져옴
    console.log(req.query.pwd) //get방식의 객체 가져옴
    console.log(req.body) //post방식의 객체를 가져옴
    // const dbId = "aaa", dbPwd = "111" , dbName ="홍길동";
    const result = service.loginCheck( req.body.id, req.body.pwd);
    console.log(result)
    if(result == undefined){
        console.log("1")
        res.redirect("/member/login");
    }else{
        req.session.username = result.map(v=>v.id);
        req.session.name = result.map(v=>v.nick);
        console.log(req.session.username)
        res.redirect("/member/main");
    }
    // let msg = "<script>";
    // if(req.body.id === dbId){
    //     if(req.body.pwd === dbPwd){//인증 통과
    //         req.session.username = dbId;
    //         req.session.name = dbName;
    //         return res.redirect("/member/main");
    //     }else{//비번 틀림
    //         msg += `alert("비번틀림");`;
    //     }
    // }else{ //존재하지 않는 id
    //     msg += `alert("존재하지 않는 id");`;
    // }
    // msg += `location.href = "/member/login"; </script>`;
    // res.send(msg)
}

const main = (req,res) => {
    if(req.session.username === undefined){
        // res.redirect("/session/login")
        const msg = `<script>
            alert("로그인 먼저 하세요");
            location.href = "/member/login";
        </script>`
    }else{
        res.render("member/main",{nick : req.session.name});
    }
}


const logout = (req,res) => {
    req.session.destroy();
    res.redirect("/member/login")
}
module.exports = {loginform,loginCheck,main,logout}
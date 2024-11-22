const list = require("../../database/member/memberDAO")
const loginCheck = (id, pwd) => {
    // console.log(id)
    // console.log(pwd)
    // console.log(list)
    const m = list.filter( v => v.id == id && v.pwd == pwd)
    // console.log(m)
    if( m.length != 0 ){
        return m;
    }else{
        return null;
    } 
}
module.exports = {loginCheck}
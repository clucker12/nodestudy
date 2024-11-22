const list = require("../../database/member/memberDAO")
const loginCheck = (id, name) => {
    const m = list.filter( v => v.id == id && v.name == name)
    if( m.length != 0 ) return 0;
    return 1;
}
const getList = () => {
    return list;
}
const getInfo = (id) => {
    const m = list.filter( v => v.id === id);
    return m[0];
}
module.exports = {loginCheck , getList ,getInfo}
const dao =require("../dao/test_dao")
const index = () => {
    const list = dao.getMember()
    return list;
}
const info = (id) => {
    const list = dao.getMember()
    const mem = list.filter((v) => id === v.id)
    console.log("mem =>",mem)
    return mem;
}
module.exports = {index,info}
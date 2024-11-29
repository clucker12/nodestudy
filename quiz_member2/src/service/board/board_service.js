const dao = require("../../database/board/board_dao")
const boardRead = {
    list : async () => {
        //console.log("service 연동")
        const list = await dao.boardRead.list();
        //console.log("ser list : ", list)
        return list.rows;
    }
}
module.exports = { boardRead }
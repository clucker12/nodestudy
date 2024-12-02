const con = require("../db_common")
const { register } = require("../member/member_dao")
const insert = {
    register : async(body) => {
        const sql =
        `insert into reply(id,title,content,write_group)
        values(:id,:title,:content,:write_no)`;
        let result = 0;
        result = await(await con).execute(sql,body);
        console.log(result)
        return result
    }
}
const repRead ={
    data : async(num) => {
        const sql = `select * from reply where write_group = ${num}`;
        const result = await(await con).execute(sql);
        return result;
    }
}
module.exports = {insert,repRead}
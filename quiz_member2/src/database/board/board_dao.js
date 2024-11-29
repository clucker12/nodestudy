const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config")
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

const con = require("../db_common")
const boardRead = {
    list : async () => {
        //console.log("dao 연동")
        const sql = `select * from board`;
        const list = await (await con).execute( sql )
        //console.log("list : ", list);
        return list;

        //const con111 = oracledb.getConnection(dbConfig)
       //console.log("con : ", (await con).execute)
        //console.log("con111 : ", await con111)
        /*
        oracledb.getConnection(dbConfig)
        .then( con => {
            //console.log( "con : ", con )
            con.execute(sql)
            .then(data => {
                console.log("list : ", data)
                return data;
            })
        })
        */
    }
}
module.exports = { boardRead }

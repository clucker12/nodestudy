
const oracledb = require("oracledb");
const dbConfig = require("../../config/db_config")

oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

const daoRead = {
    list : async (start) => {    
        // console.log("da_start : ",start)
        const sql = `select * from paging order by num desc
                     offset ${start} rows fetch next 3 rows only`;

        const con = await oracledb.getConnection(dbConfig);
        const result = await con.execute(sql);
        return result;
    },
    content : async(num) => {
        const sql = `select * from paging where num = ${num}`;
        let data;
        try {
            const con = await oracledb.getConnection(dbConfig) 
            data = await con.execute(sql); 
            daoUpdate.hit(num)
        } catch (err) {
            console.log(err)
        }
        return data;
    }, 
    totalCnt : async () => {    
        let cnt;
        try {
            const con = await oracledb.getConnection(dbConfig);
            cnt = await con.execute(`select count(*) from paging`);
        } catch (err) {
            console.log(err)
        }
        return cnt;
    },
}
const daoUpdate = {
    hit : async (num) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `update paging set count = count+1 where num = ${num}`;
        con.execute(sql)
    }
}


const daoInsert = {
    write : async(body) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `insert into paging values(
                test_num.nextval, :title,sysdate,0)`;
        let result = 0;
        try{
            result = await con.execute(sql,body);
        }catch(err){
            console.log(err)
        }
    }
}
module.exports = {daoInsert,daoRead}
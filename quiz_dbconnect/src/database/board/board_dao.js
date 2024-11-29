const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config")

oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

const con = require("../db_common")

const daoRead = {
    list : async () => { 
        const sql = `select * from board`;
        // const con = await oracledb.getConnection(dbConfig);
        const result = await(await con).execute(sql);
        return result;
    },
    content : async (no) => { 
        const sql = `select * from board where write_no = ${no}`;
        let data;
        try {
            const con = await oracledb.getConnection(dbConfig);
            data = await con.execute(sql);
            daoUpdate.hit(no)
        } catch (err) {
            console.log(err)
        }
        
        return data;
    }
}

const daoUpdate = {
    hit : async (no) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `update board set hit = hit+1 where write_no = ${no}`;
        con.execute(sql)
    }
}


const boardInsert = {
    write : async(body) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql = `insert into board(write_no,title,content,save_date,hit,origin_file_name,change_file_name,id) values(
board_seq.nextval, :title, :content,sysdate,0,:origin,:change,:id)`;
        let result = 0;
        try{
            result = await con.execute(sql,body);
        }catch(err){
            console.log(err)
        }
        console.log("dao_resul : ",result)
        return result;
    },
    delete : async(no) => {
        const con = await oracledb.getConnection(dbConfig);
        const sql =`delete from board where write_no='${no}'`;
        let result = 0 ;
        try{
            let con = await oracledb.getConnection( dbConfig );
            result = await con.execute( sql );
        }catch(err){
            console.log(err)
        }
        return result;
    }
}

module.exports = {daoRead,boardInsert}
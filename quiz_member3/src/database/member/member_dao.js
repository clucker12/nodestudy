const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config")
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

const loginCheck = async ( username ) => {
    //console.log("dao : ", username )
    const sql = `select * from members where id='${username}'`;
    let member;
    try{
        let con = await oracledb.getConnection( dbConfig );
        member = await con.execute(sql)
    }catch(err){
        console.log("catch dao : ", err)
    }
    //console.log(member)
    return member;
}
const getList = async () => {
    const sql = `select * from members`;
    let result;
    try{
        const con = await oracledb.getConnection(dbConfig)
        result = await con.execute( sql )
    }catch(err) {
        console.log( err )
    }
    return result;
}
const register = async (body) => {
    const sql = `insert into 
            members values(:id, :pwd, :name, :addr)`;
    let result;
    try{
        const con = await oracledb.getConnection(dbConfig);
        result = await con.execute(sql, body);
    }catch(err){
        console.log(err)
    }
    return result;
}
const del = async (id) =>{
    const sql = `delete from members where id='${id}'`;
    try{
        const con = await oracledb.getConnection(dbConfig);
        await con.execute(sql);
    }catch(err){
        console.log(err)
    }
}
const modify = async ( body ) => {
    const sql = `update members set pwd=:pwd, name=:name, addr=:addr
                                                        where id=:id`;
    try{
        const con = await oracledb.getConnection(dbConfig);
        await con.execute(sql, body);
    }catch(err){
        console.log(err)
    }
}
module.exports = {modify, del, register, getList, loginCheck }
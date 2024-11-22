const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

const getMember = async ( id ) => {
    const con = await oracledb.getConnection(dbConfig);
    const sql = `select * from members where id='${id}'`;
    let member;
    try{
        member = await con.execute(sql);
    }catch(err){
        console.log( err );
    }
    return member;
}
const memberList = async ( ) => {
    const con = await oracledb.getConnection(dbConfig);
    const sql = "select * from members";
    return ( await con.execute(sql) ).rows;
}
const register = async ( body ) =>{
    const con = await oracledb.getConnection(dbConfig);
    const sql = "insert into members values(:id,:pwd,:name,:addr)";
    let result;
    try{
        result = await con.execute(sql, body);
    }catch(err){
        console.log(err)
    }
    return result;
}
const deleteM = async (id) =>{
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

module.exports = { modify,deleteM,getMember , memberList , register};

    

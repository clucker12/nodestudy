const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config")
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

const con = require("../db_common")
const boardRead = {
    list : async (start) => {
        //console.log("dao 연동")
        //const sql = `select * from board`;

        const sql = `select * from board order by write_no desc
                    offset ${start} rows fetch next 3 rows only`;


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
    },
    data : async ( num ) =>{
        const sql = `select * from board where write_no='${num}'`;
        const data = (await con).execute( sql );
        return data;
    },
    totalCnt : async()=>{
        let cnt;
        try{
            const con =await oracledb.getConnection(dbConfig);
            cnt = await con.execute(`select count(*) from board`);
        }catch(err){
            console.log(err)
        }
        return cnt;
    }
}

const boardInsert = {
    write : async (body) => {
        //console.log("body : ", body)
        const sql = 
`insert into board(write_no,title,content,origin_file_name,change_file_name, id) values(board_seq.nextval,:title , :content , :origin, :change , :id  )`;
        let result = 0;
        try{
            result = await(await con).execute(sql, body);
        }catch(err){
            console.log(err)
        }
        return result;
    }
}


const boardUpdate = {
    upHit : async ( num ) => {
        const sql = 
        `update board set hit = hit + 1 where write_no=${num}`;
        (await con).execute( sql );
    },
    delete : async ( writeNo ) =>{
        const sql = `delete from board where write_no=${writeNo}`;
        (await con).execute( sql );
    },
    modify : async ( body )=>{
        const sql = `update board set title=:title, content=:content, 
                origin_file_name=:origin_file_name, 
                change_file_name=:change_file_name where write_no=:write_no`;
        return (await con).execute( sql, body );
    }
}
module.exports = { boardRead , boardInsert , boardUpdate };
 


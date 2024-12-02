const dao = require("../../database/board/board_dao")
const serCom = require("../ser_common");
const boardRead = {
    list : async (start) => {

        if( start == undefined )
            start = 1;
        start = Number(start);

        const totalCnt = await dao.boardRead.totalCnt();
        const num = totalCnt.rows[0]['COUNT(*)'];
        const result = (num % 3 == 0 )? 0 : 1;
        const page = parseInt(num / 3 + result);

        const startNum = ( start - 1 ) * 3;

        //console.log("service 연동")
        let list = await dao.boardRead.list( startNum );
        //console.log("ser list : ", list)
        list = serCom.timeModify( list.rows )
        return {list , start, page};
    },
    data : async ( num ) => {
        boardUpdate.upHit( num );
        let data = await dao.boardRead.data( num );
        data = serCom.timeModify( data.rows );
        return data[0];
    }
}
const boardInsert = {
    write : async ( body, file, fileValidation ) =>{
        console.log( file )
        let msg, url;
        if( fileValidation ){
            msg = fileValidation;
            url = "/board/write_form"
            return serCom.getMessage(msg, url);
        }
        if( file != undefined ){ // 파일을 선택
            body.origin = file.originalname;
            body.change = file.filename;
        }else{ // 파일 없는 경우
            body.origin = "nan";
            body.change = "nan";
        }
        const result = await dao.boardInsert.write( body );
        if( result != 0 ){
            msg = "등록성공";
            url = "/board/list";
        }else{
            msg = "문제 발생";
            url = "/board/write_form";
        }
        return serCom.getMessage(msg, url);
    }
}
const boardUpdate = {
    upHit : ( num ) =>{
        dao.boardUpdate.upHit( num );
    },
    delete : ( writeNo ) =>{
        dao.boardUpdate.delete( writeNo );
    },
    modify : async ( body , file )=>{
        if(file !== undefined){//file === undefined
            body.origin_file_name = file.originalname;
            body.change_file_name = file.filename;
        }
        const result = await dao.boardUpdate.modify( body );
        let msg, url;
        let message = {}
        //ctrl에서 이미지를 지우기 위해 성공,실패 여부 저장
        message.result = result.rowsAffected;
        if(message.result === 1){
            msg = "수정 되었습니다"; 
            url = `/board/data/${body.write_no}`;
        }else{
            msg = "문제가 발생했습니다"; 
            url = `/board/modify_form/${body.write_no}`;
            message.result = 0;
        }
        message.msg = serCom.getMessage(msg, url);
        return message;
    }
        
}
    
module.exports = {boardUpdate, boardInsert, boardRead }
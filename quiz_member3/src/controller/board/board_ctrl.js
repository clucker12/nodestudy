const ser = require("../../service/board/board_service")
const serCom = require( "../../service/ser_common" )
const views = {
    list : async (req, res) => {
        //res.send("ctrl")
        const data = await ser.boardRead.list( req.query.start );
        //console.log("ctrl list : ", list)
        res.render( "board/list" , { list : data.list, start:data.start, page : data.page } )
    },
    writeForm : (req, res) =>{
        const msg = serCom.sessionCheck( req.session );
        if( msg != 0 ){
            return res.send( msg );
        }
        res.render("board/wirte_form",
                            {username : req.session.username})
    },
    data : async (req, res) => {
        const data = await ser.boardRead.data( req.params.num ); 
        const username = req.session.username;
        res.render("board/data", { data , username } );
    },
    modifyForm : async (req, res) => {
        const data = 
            await ser.boardRead.data( req.params.writeNo );
        res.render("board/modify_form", { data } );
    }     
}
const process = {
    write : async (req, res) => {
        //console.log("body : ", req.body)
        //console.log("file : ", req.file)
        const msg = await ser.boardInsert.write(
            req.body, req.file, req.fileValidation
        );
        res.send( msg )
    },
    delete : (req, res) => {
        file_process.delete( req.params.imgName );
        ser.boardUpdate.delete( req.params.writeNo );
        res.redirect("/board/list");
    },
    modify : async (req, res) => {
    //나중에 처리하면 데이터베이스 내용이 변경되어 body.change이름도 같이 변경되
    //파일 삭제시 문제가 발생한다. 그래서 먼저 삭제파일 이름을 저장하고 진행한다
        const deleteFile = req.body.change_file_name;
        const message = await ser.boardUpdate.modify( req.body, req.file ); 
    //파일 수정이 되었고, 데이터베이스 수정이 성공이라면 파일 삭제        
        if( req.file !== undefined && message.result === 1 ){
            file_process.delete( deleteFile );
        }
        res.send(message.msg);
    }    
}

const fs = require("fs");
const file_process = {
    download : (req, res)=>{
        const filePath = `./upload_file/${req.params.imgName}`;
        res.download( filePath )
    }, 
    delete : ( imgName ) => {
        if( imgName !== 'nan' ){
            fs.unlinkSync(`./upload_file/${ imgName }`);
        }
    }   
}
    
module.exports = {file_process, process, views }
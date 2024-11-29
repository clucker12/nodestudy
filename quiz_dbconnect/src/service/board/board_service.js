const dao = require("../../database/board/board_dao")
const serCom = require("../ser_common");
const fs = require("fs")
const pageRead = {
    list : async() => {
        let list = await dao.daoRead.list();
        list = serCom.timeModify(list.rows)
        return list;
    },
    content : async(no) => {
        const data = await dao.daoRead.content(no);
        console.log("data : ", data)
        return data.rows[0];
    },
}
const boardProcess = {
    write : async(body,file,fileValidation) => {
        // console.log("body :",body)
        // const result = await dao.daoInsert.write(body);
        // console.log("ser_result : ",result);
        let msg,url;
        if(fileValidation){
            msg = fileValidation;
            url = "/board/write_form"
            return getMessage(msg, url);
        }
        if(file != undefined){ //파일을 선택
            body.origin = file.originalname;
            body.change = file.filename;
        }else{ //파일 없는 경우
            body.orgin = "nan";
            body.change = "nan";
        }
        const result = await dao.boardInsert.write(body)
        if(result !=0){
            msg = "등록성공"
            url = "/board/list"
        }else{
            msg = "등록실패"
            url = "/board/list"
        }
        return serCom.getMessage(msg,url);
        
    },
    delete : async(query) => {
        const result = await dao.boardInsert.delete(query.no)
        if(result !=0){
            fs.unlinkSync(`./upload_file/${query.filename}`)
            msg = "삭제성공"
            url = "/board/list"
        }else{
            msg = "삭제실패"
            url = "/board/content/"+query.no
        }
        return serCom.getMessage(msg,url);
    },
}

const getMessage = (msg, url) => {
    return `<script>alert("${msg}");location.href="${url}";</script>`;
}

module.exports = {pageRead,boardProcess}
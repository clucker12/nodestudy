const ser = require("../../service/board/board_service")
const serCom = require("../../service/ser_common")
const fs = require("fs")
const views = {
    list : async(req,res) => {
        const data = await ser.pageRead.list();
        console.log("data : ",data)
        res.render("board/list",{list : data})
    },
    writeForm : (req,res) => {
        console.log("session : ", req.session.name)
        const msg = serCom.sessionCheck(req.session);
        console.log("msg ctrl : ",msg)
        if(msg != 0){
            return res.send(msg);
        }
        res.render("board/write_form",{ username : req.session.name, userid : req.session.userid  })
        // console.log("username : ",username)
    },
    content  : async(req,res) => {
        const fileList = fs.readdirSync("./upload_file")
        // console.log("fileList :",fileList )
        const data = await ser.pageRead.content(req.params.no);
        res.render("board/content",{data,userid : req.session.userid })
    },
    download : (req,res) => {
        const path = `./upload_file/${req.params.fileName}`;
        res.download(path)
    },
}
const process = {
    write : async(req,res) => {
        console.log("file1 : ", req.file)
        // console.log("ctrl_req : ",req)
        // console.log("ctrl_req.fileValidation : ",req.fileValidation)
        // console.log("file : ", req.file.originalname)
        // req.body['originalname'] = req.file.originalname;
        // req.body['filename']  = req.file.filename;
        const msg = await ser.boardProcess.write(req.body,req.file,req.fileValidation);
        res.send(msg);
    },
    delete : async(req,res) => {
        console.log( "req.query : ",req.query );
        let msg = await ser.boardProcess.delete(req.query)
        res.send(msg);
    },
}

module.exports = {process,views}
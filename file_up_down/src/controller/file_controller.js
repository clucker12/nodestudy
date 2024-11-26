const fs = require("fs")
const views = {
    num : 1000,
    index : (req,res) => {
        res.render("file_index");
    },
    list : (req,res) => {
        // res.render("file_index");
        const fileList = fs.readdirSync("./upload_file")
        res.render("file_list", {files : fileList});
    },
    download : (req,res) => {
        const path = `./upload_file/${req.params.fileName}`;
        res.download(path)
    },
    modifyForm : (req,res) => {
        res.render("modify_form", {fileName : req.params.fileName})
    },
}

const process = {
    upload : (req,res) => {
        console.log(req.file)
        console.log("---------")
        console.log(req.body)
        console.log("req.test_msg : ",req.test_msg)
        if(req.fileValidation )
            return res.send(req.fileValidation)
        res.send("upload 성공")
    },
    del : (req,res) => {
        fs.unlinkSync(`./upload_file/${req.params.fileName}`)
        res.redirect("/file/list")
    },
    modify : (req,res) => {
        if(req.file){ //파일이 선택되면
            console.log("새로운 파일 선택")
            return res.redirect("/file/del/"+req.body.originFileName)
        }
        res.redirect("/file/list")
    },
}

module.exports = {process,views}

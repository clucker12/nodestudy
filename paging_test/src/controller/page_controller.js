const ser = require("../service/page_service")
const views = {
    index : (req,res) => {
        res.render("index")
    },
    list : async(req,res) => {
        console.log("start : ", req.query.start)
        // list = {list : list.rows, page};
        const data = await ser.pageRead.list(req.query.start);
        // console.log("list : ",data)
        // console.log("start2 : ", req.query.start)
        // console.log("start22 : ", data.start)
        res.render("list",{list : data.list, page : data.page,start : data.start})
    },
    writeForm : (req,res) => {
        res.render("write_form")
    },
    content : async (req,res) => {
        const data = await ser.pageRead.content(req.params.num);
        res.render("content",{data})
    },
}
const process = {
    write : async(req,res) => {
        const msg = await ser.pageInsert.write(req.body);
        res.redirect("/page/list")
    },
}

module.exports = {process,views}
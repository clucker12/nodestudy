module.exports = ( app ) => {
    const boardRouter = require("./board/board_router");
    app.use("/board", boardRouter )

    const memberRouter = require("./member/member_router");
    app.use("/member", memberRouter )

    const router = require("express").Router();

    router.get("/",(req, res)=>{
        //res.send("connect")
        res.render("index" ,{id : req.session.username});//src/views/index.ejs
    })

    return router;
}
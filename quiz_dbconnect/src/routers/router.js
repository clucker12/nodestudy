module.exports = (app) => {
    const memberRouter = require("./member/member_router");
    app.use("/member", memberRouter);


    const router = require("express").Router();
    router.get("/",(req, res) => {
        //req.session.userid = "";
        //req.session.name = "";
        console.log("req.session => ",req.session.name )
        res.render("index",{ username : req.session.name })
    })
    return router;
}
module.exports = (app) => {
    const router = require("express").Router();
    const fileRouter = require("./file_router")
    app.use("/file",fileRouter)

    router.get("/",(req,res) => {
        const msg = `<h3>기본 페이지</h3>
                        <a href="/file">file_index</a>`;
        res.send(msg);
    })
    return router;
}
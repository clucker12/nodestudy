const express = require("express")
const router = require("./src/routes/common_router");

const memberRouter = require("./src/routes/member/member_router")

const app = express();
app.set("view engine", "ejs")
app.set("views", "./src/views")
app.use("/", router)
app.use("/member", memberRouter)

app.listen(3000, ()=> console.log("3000 서버 실행"))
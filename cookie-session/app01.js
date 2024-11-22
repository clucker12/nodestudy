const express = require("express")
const cookieRouter = require("./src/routers/cookie/cookie_router");

const cookieParser = require("cookie-parser")
const app = express();
app.set("views", "./src/views")
app.set("view engine", "ejs")
app.use(cookieParser("아무값이나"))
app.use("/cookie", cookieRouter)

app.listen(3000, ()=> console.log("3000 서버 실행"))
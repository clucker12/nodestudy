const express = require("express")
const router = require("./src/session_router");
const session = require("express-session");
const config = require("./src/config")
const bodyParser = require("body-parser")

const app = express();
app.use(session(config.sessionConfig));
app.use(bodyParser.urlencoded()); //post방식을 인코딩해서 받아주는 기능
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/session",router)
app.listen(3000,()=>{console.log("3000 서버 실행")})
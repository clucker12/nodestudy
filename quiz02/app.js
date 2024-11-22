const express = require("express")
const router = require("./src/routes/common_router");
const memberRouter = require("./src/routes/member/member_router")
const cartRouter = require("./src/routes/cart/cart_router")
const session = require("express-session");
const config = require("./src/config/config")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser") //Express 애플리케이션에서 쿠키를 쉽게 다룰 수 있게 해주는 미들웨어 
//npm install cookie-parser 설치 필수

const app = express();
app.use(session(config.sessionConfig));
app.use(bodyParser.urlencoded()); //post방식을 인코딩해서 받아주는 기능
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(cookieParser("아무값이나"))
app.use("/cart",cartRouter)
app.use("/member", memberRouter)
app.use("/",router)

app.listen(3000,()=>{console.log("3000 서버 실행")})
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const config = require("./config/cookie_session/cookie_session_config")
const app = express();
app.use( bodyParser.urlencoded() );
app.use(session(config.sessionConfig));

app.set("views","./src/views")
app.set("view engine","ejs");

const router = require("./src/routers/router")(app)
app.use("/", router);

app.listen(3000,()=>console.log("3000 서버 실행"))
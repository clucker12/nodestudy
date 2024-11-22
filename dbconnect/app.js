const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use( bodyParser.urlencoded() );

app.set("views","./src/views")
app.set("view engine","ejs");

const router = require("./src/routers/router")(app)
app.use("/", router);

app.listen(3000,()=>console.log("3000 서버 실행"))
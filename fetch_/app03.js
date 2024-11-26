const express = require("express");
const app = express();

const bodyParser = require("body-parser")
app.use(bodyParser.json());


const router = require("./router")(app);
app.set("views","./views")
app.set("view engine","ejs")

app.use("/", router)

app.listen(3000,()=>console.log("3000실행"))
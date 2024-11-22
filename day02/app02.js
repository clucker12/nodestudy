const experss = require("express");
const m = require("./db/memberDAO");
const router = require("./routes/test_router");


const app = experss();

app.set("view engine","ejs")
app.set("views","./views")

app.use("/",router)

app.listen(3000, ()=> console.log("3000server"))
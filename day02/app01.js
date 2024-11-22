const experss = require("express");
const m = require("./db/memberDAO");


const app = experss();

app.set("view engine","ejs")
app.set("views","./views")

const router = experss.Router();
app.use("/",router); // / /test /mem /meme/info
router.get("/", (req,res) => {
    // res.send("기본 페이지")
    console.log("router")
    res.render("index",{mem : m})
})

const router2 = experss.Router();
app.use("/member",router2); // / /test /mem /meme/info
router2.get("/list", (req,res) => {
    // res.send("기본 페이지")
    res.send("요청 =>" + req.url)
})

// app.get("/", (req,res) => {
//     // res.send("기본 페이지")
//     res.render("index")
// })

//실행 : npx supervisor app01
app.listen(3000, ()=> console.log("3000server"))
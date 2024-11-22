const experss = require("express");
const app = experss();

app.set("view engine","ejs")
app.set("views","./")

app.get("/", (req,res) => {
    // res.send("기본 페이지")
    res.render("index")
})

app.get("/test", (req,res) => {
    res.send("test 페이지")
})
// npm i ejs --save 
app.listen(3000, ()=> console.log("3000server"))
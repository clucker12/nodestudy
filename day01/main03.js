const experss = require("express");
const app = experss();

app.set("view engine","ejs")
app.set("views","./views")

app.get("/", (req,res) => {
    // res.send("기본 페이지")
    res.render("index")
})

app.get("/login", (req,res) => {
    // res.send("기본 페이지")
    res.render("login")
})

app.get("/logout", (req,res) => {
    // res.send("기본 페이지")
    res.render("logout")
})

app.get("/if", (req,res) => {
    // res.send("기본 페이지")
    res.render("if", {num : 100})
})
// npm i ejs --save 
app.listen(3000, ()=> console.log("3000server"))
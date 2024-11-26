const express = require("express")
const app = express();
console.log("__dirname : ", __dirname)
app.set("views",__dirname+"/views")
app.set("view engine","ejs")

app.get("/non_fetch", (req,res)=>{
    res.render("non_fetch")
})
let count = 0;
app.get("/get_count",(req,res)=>{
    count++;
    res.json({cnt : count})
})
app.get("/fetch01", (req,res)=>{
    console.log("fetch01 요청 ~")
    res.render("fetch01");
})
app.get("/rest", (req,res) =>{
    res.render("rest")
})
app.get("/test", (req,res) =>{
    res.json("get 데이터 요청!!!")
})
app.post("/test", (req,res) =>{
    res.json("post 데이터 추가!!!")
})
app.put("/test", (req,res) =>{
    res.json("put 데이터 수정!!!")
})
app.delete("/test", (req,res) =>{
    res.json("delete 데이터 삭제!!!")
})

app.listen(3000, ()=>console.log("3000 서버 연동"))
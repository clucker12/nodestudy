/*
    import Arraylist;
    변수 = Arraylist;
    변수.기능

*/

const http = require("http"); // import http
const fs = require("fs")

const app = http.createServer((request, respone)=>{
    console.log("test : ", request.url);
    respone.writeHead(200,{"Content-Type":"text/html; charset=utf-8"})
    if(request.url == "/")
        respone.end("<h1>기본 페이지 입니다</h1>")
    else if(request.url == "/member")
        respone.end(`<a href="/board">게시판</a>
                    회원페이지입니다.`)
    else if(request.url == "/board"){
       const data = fs.readFileSync("./test.html")
       respone.end(data)
    }
    
})
app.listen(3000, () => {console.log("port start")})

// npm i express --save
// npm install supervisor --save
// npx supervisor main
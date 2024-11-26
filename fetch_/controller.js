let list = [
    {id : "aaa", pwd : "aaa", name : "db홍길동a", addr : "db산골짜기a"},
    {id : "bbb", pwd : "bbb", name : "db홍길동b", addr : "db산골짜기b"},
    {id : "ccc", pwd : "ccc", name : "db홍길동c", addr : "db산골짜기c"},
    {id : "aaa1", pwd : "aaa", name : "db홍길동a", addr : "db산골짜기a"},
    {id : "bbb2", pwd : "bbb", name : "db홍길동b", addr : "db산골짜기b"},
    {id : "ccc3", pwd : "ccc", name : "db홍길동c", addr : "db산골짜기c"},
    {id : "aaa2", pwd : "aaa", name : "db홍길동a", addr : "db산골짜기a"},
    {id : "bbb1", pwd : "bbb", name : "db홍길동b", addr : "db산골짜기b"},
    {id : "ccc1", pwd : "ccc", name : "db홍길동c", addr : "db산골짜기c"},
];
const index = (req,res) => {
    console.log("요청 요청")
    res.render("index")

}
const members = (req,res) => {
    res.json(list);
}
const reg = (req,res) => {
    console.log(req.body)
    list = list.concat(req.body)
    res.json(1);
}

const member = (req,res) => {
    const result = list.filter(mem => mem.id === req.params.uId)
    res.json(result[0]);
}
const modify = (req,res) => {
    list = list.filter(mem => mem.id != req.body.id);
    list = list.concat(req.body)
    res.json(1)
}
const del = (req,res) => {
    list = list.filter(mem => mem.id != req.params.id);
    res.json(1)
}

const registerView = (req,res) => {
    res.render("register_View")
}
const idCheck = (req,res) => {
    console.log(req.query);
    const result = list.filter(mem => mem.id == req.query.id);
    res.json(result.length);
}
let cnt = 0;
const viewMember = (req,res) => {
    cnt = 0;
    res.render("view_member")
}

const quizMembers = (req,res) => {
    let number = cnt;
    cnt += 3;
    let result = [];
    for( ; number < cnt; number++){
        result = result.concat(list[number])
    }
    res.json(result);
}
module.exports = {quizMembers,viewMember,idCheck,registerView,del,modify,member,reg,members,index}
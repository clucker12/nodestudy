const sessionConfig = {
    secret : "암호화 키",
    resave : false,
    saveUninitialized : true
};

const cookieConfig = {
    httpOnly : true,
    maxAge : 10000,
    signed : true
}
module.exports = {sessionConfig,cookieConfig};
const config = require("../../../config/cookie_session/config")
const ser = require("../../service/cookie/cookie_service")

const index = (req,res) => {
    // const userCookie = req.cookies.myCookie;
    const userCookie = req.signedCookies.myCookie;
    console.log("userCookie : ", userCookie )
    // res.cookie("myCookie", "valueCookie",cookieConfig)
    res.render("cookie/cookie01", {userCookie});
}

const popup = (req,res) => {
    res.render("cookie/popup")
}

const makeCookie = (req,res) => {
    res.cookie("myCookie", "valueCookie",config.cookieConfig)
    res.send("<script>window.close();</script>");
}

const cart = (req,res) =>{
    res.render("cookie/cart",{list : ser.getCart()})
}

const save = (req,res) => {
    const goods_id = req.params.goods;

    let cart_list = req.signedCookies.cart_list;
    if(cart_list == undefined){
        cart_list = {};
    }
    cart_list = ser.save(cart_list,goods_id)
    res.cookie("cart_list",cart_list, config.cookieConfig);
    // const msg = "aaa : " + goods_id;
    const msg  = `<script>
        alert("${goods_id} 상품이 저장!!!")
        location.href = "/cookie/cart";
    </script>`
    res.send(msg);
}

const viewList = (req, res )=>{
    const cart_list = req.signedCookies.cart_list;
    if( !cart_list ){ //cart_list === undefined
        const msg = `<script>
            alert("저장된 목록 없음!!!!");
            location.href="/cookie/cart";
        </script>`
        res.send( msg );
        return;
    }
    res.render("cookie/view_list", { list : ser.view_list( cart_list ) });
}


module.exports = {index,popup,makeCookie,cart,save,viewList}
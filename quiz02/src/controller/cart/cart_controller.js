const config = require("../../config/config")
const ser = require("../../service/cart/cart_service")
const list = (req, res )=>{
    res.render("cart/cart",{list : ser.getCart()});
}

const save = (req, res) => {
    // 1. URL 파라미터에서 goods_id를 가져옵니다.
    // 예를 들어, /save/:goods 형태로 요청이 오면 `goods_id`는 그 파라미터 값을 의미합니다.
    const goods_id = req.params.goods;

    // 2. 요청된 쿠키에서 'cart_list'라는 이름의 서명된 쿠키를 가져옵니다.
    // 'signedCookies'는 서명된 쿠키들만 저장되며, 여기서는 cart_list라는 쿠키를 가져옵니다.
    let cart_list = req.signedCookies.cart_list;
    // console.log(cart_list)

    // 3. 만약 'cart_list' 쿠키가 없다면 (undefined이면) 빈 객체로 초기화합니다.
    // cart_list가 처음이라면 빈 객체를 할당하여 장바구니의 내용이 없음을 표시합니다.
    if (cart_list == undefined) {
        cart_list = {};
    }

    // 4. `ser.save`는 어떤 객체에 상품을 추가하는 함수로 보입니다.
    // 여기서는 장바구니에 상품을 추가하는 로직으로 추측됩니다.
    // goods_id는 추가하려는 상품의 고유 식별자입니다.
    cart_list = ser.save(cart_list, goods_id);

    // 5. 수정된 장바구니(cart_list)를 다시 'cart_list'라는 이름의 서명된 쿠키로 저장합니다.
    // 쿠키에 저장할 때 config.cookieConfig에는 쿠키에 대한 설정 정보(예: 만료 시간, httpOnly 설정 등)가 들어있습니다.
    res.cookie("cart_list", cart_list, config.cookieConfig);

    // 6. 사용자에게 상품이 장바구니에 저장되었다는 알림을 띄우는 HTML을 반환합니다.
    // 상품이 추가된 후 사용자가 확인할 수 있도록 alert 메시지를 출력하고, 장바구니 페이지로 리다이렉션합니다.
    const msg = `<script>
        alert("${goods_id} 상품이 저장!!!")
        location.href = "/cart/cart"; // 장바구니 페이지로 이동
    </script>`;

    // 7. HTML 형태로 응답을 클라이언트에 전송하여 상품 저장 완료 메시지를 보여주고 장바구니 페이지로 이동합니다.
    res.send(msg);
}

const viewList = (req, res )=>{
    const cart_list = req.signedCookies.cart_list;
    if( !cart_list ){ //cart_list === undefined
        const msg = `<script>
            alert("저장된 목록 없음!!!!");
            location.href="/cart/cart";
        </script>`
        res.send( msg );
        return;
    }
    res.render("cart/view_list", { list : ser.view_list( cart_list ) });
}


module.exports = {list,viewList,save}
const cart = require("../../database/cart/user_cart");
const getCart = () =>{
    return cart;
}
const save = (cart_list, goods_id)=>{
    //cart_list[goods_id] === undefined
    //처음 상품이 선택되면 if문 실행
    if( !cart_list[goods_id] ){//값이 없으면 false로 처리도 가능하다
        //상품선택이 처음인 상품은 해당 id에 0개로 등록
        cart_list[goods_id] = 0;
        // 예) 2번 상품 선택시 : cart_list = { 2 : 0 }
        // 3번 상품 선택 시 : cart_list = { 2 : 0 , 3 : 0 }
    }
	//해당 상품의 개수를 1 증가해서 저장
    cart_list[goods_id] = cart_list[goods_id] + 1;
    //위의 if문에 의해서 지정된 키 : 값에 의해 해당 키의 값을 1증가
    //예) 2번 선택 시 : cart_list = { 2 : 1 }
    return cart_list;

    /*
    const goods = cart.filter( data => data.goods_id == goods_id )
    cart_list = goods[0];
    return cart_list;
    */
}

const view_list = (cart_list) =>{
    let list = [];
    console.log("cart_list : ", cart_list)
    console.log("cart_list.keys() : ", Object.keys(cart_list) )
    for(i in cart_list){ //키만 얻어옴. 또는 위의 Object.keys 활용 가능
        let item = {};
        console.log("i : ", i);//키값 확인
        item["goods_id"] = i; //키가 사용자가 선택한 id이므로 goods에 저장
        item["title"] = cart[i-1].title;//cart의 id는 1부터 시작. 인덱스는 0부터 시작. 사용자가 선택한 id-1을 하면 인덱스로 사용가능
        item["price"] = cart[i-1].price;
        item["number"] = cart_list[i]; //save에 의해 저장된 값의 개수. 상품 개수
        item["total"] = cart[i-1].price * cart_list[i];// 총가격
        list = list.concat(item);//list배열의 마지막에 사용자 선택한 item 추가
    }
    // console.log("list : ",list);
    return list;
}
module.exports = {getCart,save,view_list}
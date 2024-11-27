const dao = require("../database/pageDAO")
const pageRead = {
    list : async (start) => {
        if( !start || isNaN(start)){
            start = 1;
        }
        // start = Number(start);   
        const totalCnt = await dao.daoRead.totalCnt();
        console.log("totalCnt : ",totalCnt)
        // totalCnt.rows[0]['COUNT(*)'] = 10
        console.log("totalCntrows : ",totalCnt.rows)
        console.log("totalCntrows[0] : ",totalCnt.rows[0])
        const num = totalCnt.rows[0]['COUNT(*)']; // 점 표기법을 사용할 수 없는 이유는 COUNT(*)가 유효한 변수 이름이 아니기 때문입니다. 점 표기법은 obj.key 형태로 사용되며, 키가 숫자나 특수 문자를 포함하면 사용할 수 없습니다. 따라서 ['COUNT(*)']와 같은 대괄호 표기법을 사용해야 합니다

        const result = (num % 3 == 0) ? 0 : 1;
        const page = parseInt(num/3 + result);

        const startNum = (start - 1) * 3 ;
        // console.log("s_start : ", start)
        const list = await dao.daoRead.list(startNum);
        // console.log("s_start2 : ", start)
        return {list : list.rows, page,start};
    },
    content : async(num) => {
        const data = await dao.daoRead.content(num);
        return data.rows[0];
    }
}


const pageInsert = {
    write : async(body) => {
        const result = await dao.daoInsert.write(body);
        return "성공?실패?";
    }
}

module.exports = {pageInsert,pageRead}
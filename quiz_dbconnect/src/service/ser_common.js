const sessionCheck = ( session ) => {
    if( session == undefined || session.name == undefined ){
        msg = `로그인 사용자만 접근 가능`;
        url = '/member/login_form'
        return getMessage(msg, url);
    }
    return 0;
}
const getMessage = (msg, url) => {
    return `<script>
        alert('${msg}');
        location.href = '${url}';
    </script>`;
}

const timeModify = (list) => {
    // console.log("time modi : ",list)
    // for(let i=0; i<list.length; i++){
    //     list[i]['SAVE_DATE'] =  list[i]['SAVE_DATE'].toLocaleString();
    // }
    list = list.map(data => {
        data['SAVE_DATE'] =  data['SAVE_DATE'].toLocaleString();
        return data;
    })
    return list;
}
module.exports = { timeModify,sessionCheck, getMessage }
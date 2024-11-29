const sessionCheck = ( session ) => {
    if( session == undefined || session.username == undefined ){
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
module.exports = { sessionCheck, getMessage }
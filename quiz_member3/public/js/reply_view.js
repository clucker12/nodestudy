async function init(groupNum){
    console.log("init groupNum : ",groupNum)
    const res = await fetch("/board_rep/"+groupNum)
    const data = await res.json();
    let html = "";
    data.forEach( d => {
        html += `<div align="left"><b> 아이디 : </b>${d.ID}님/`;
        html += `<b>작성일</b> : ${d.SAVE_DATE}<br>`;
        html += `<b>제목</b> : ${d.TITLE}<br>`;
        html += `<b>내용</b> : ${d.CONTENT}<HR></div>`;
    })
    const content = document.getElementById("content")
    content.innerHTML = html;
}
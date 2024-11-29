const ser = require("../../service/board/board_service")
const serCom = require( "../../service/ser_common" )
const views = {
    list : async (req, res) => {
        //res.send("ctrl")
        const list = await ser.boardRead.list();
        //console.log("ctrl list : ", list)
        res.render( "board/list" , { list : list } )
    },
    writeForm : (req, res) =>{
        const msg = serCom.sessionCheck( req.session );
        if( msg != 0 ){
            return res.send( msg );
        }
        res.render("board/wirte_form",
                            {username : req.session.username})
    }
}
module.exports = { views }
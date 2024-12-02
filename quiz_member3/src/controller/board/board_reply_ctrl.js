const ser = require("../../service/board/board_reply_service")
const process = {
    register : async(req,res) => {
        console.log(req.body)
        const result = await(ser.insert.register(req.body))
        res.json(1);
    }
}
const views = {
    data : async(req,res) => {
        console.log("group : ", req.params.groupNum)
        const result = await(ser.repRead.data(req.params.groupNum))
        res.json(result);
    }
}

module.exports = {process,views}
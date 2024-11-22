const router = require("express").Router();
const ctrl = require("../../controller/member/member_ctrl")

router.get("/list", ctrl.list )
router.get("/register_form", ctrl.regForm )
router.post("/register", ctrl.register )
router.get("/member_view/:id", ctrl.memberView )

router.get("/modify_form", ctrl.modifyForm )
router.get("/delete/:id", ctrl.deleteM )

router.post("/modify", ctrl.modify )

module.exports = router;
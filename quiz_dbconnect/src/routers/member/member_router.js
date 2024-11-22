const router = require("express").Router();
const ctrl = require("../../controller/member/member_ctrl")

router.get("/login_form", ctrl.loginForm )
router.post("/login",ctrl.login)
router.get("/member_list",ctrl.memberList)
router.get("/register_form", ctrl.regForm )
router.post("/register", ctrl.register )
router.get("/logout",ctrl.logout)
router.get("/member_view/:id", ctrl.memberView )
router.get("/modify_form", ctrl.modifyForm )
router.post("/modify", ctrl.modify )
router.get("/delete/:id", ctrl.deleteM )
module.exports = router;
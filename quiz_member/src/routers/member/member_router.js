const router = require("express").Router();
const memberCtrl = require("../../controller/member/member_ctrl");
router.get("/login", memberCtrl.login );
router.post("/login_check", memberCtrl.loginCheck );
router.get("/logout", memberCtrl.logout );
router.get("/list", memberCtrl.memberList );
router.get("/register_view", memberCtrl.registerView );
router.post("/register", memberCtrl.register );
router.get("/info/:id", memberCtrl.info )
router.get("/del", memberCtrl.deleteM )
router.get("/modify_form", memberCtrl.modifyForm )
router.post("/modify", memberCtrl.modify )
module.exports = router;

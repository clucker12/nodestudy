const express = require("express")
const ctrl = require("../../controller/member/member_controller");
const router = express.Router();
router.get("/login", ctrl.loginform);
router.post("/login_check",ctrl.loginCheck)

router.get("/main", ctrl.main)
router.get("/logout", ctrl.logout)


module.exports = router;
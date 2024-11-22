const express = require("express")
const ctrl = require("../../controller/member/member_controller");
const router = express.Router();
router.get("/login", ctrl.login);
router.get("/login_check", ctrl.loginCheck);
router.get("/list", ctrl.list);
router.get("/info", ctrl.info);
module.exports = router;
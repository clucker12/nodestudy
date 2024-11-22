const express = require("express")
const router = express.Router();
const ctrl = require("./session_ctrl")

router.get("/",ctrl.index)
router.get("/get_session",ctrl.getSession)
router.get("/del_session",ctrl.delSession)

router.get("/login",ctrl.loginFrom)
router.post("/login_check",ctrl.loginCheck)

router.get("/main", ctrl.main)
router.get("/logout", ctrl.logout)

module.exports = router;
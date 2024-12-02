const router = require("express").Router();

const ctrl = require("../../controller/member/member_ctrl")

// /member/login_form
router.get("/login_form", ctrl.loginForm )
router.post("/login_check", ctrl.loginCheck )
router.get("/logout", ctrl.logout )
router.get("/list", ctrl.list )
router.get("/register_form", ctrl.registerForm )

router.post("/register", ctrl.register )
router.get("/info/:id", ctrl.info )
router.get("/del", ctrl.del )
router.get("/modify_form", ctrl.modifyForm )

router.post("/modify", ctrl.modify )

module.exports = router;
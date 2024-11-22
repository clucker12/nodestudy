const express = require("express")
const ctrl = require("../../controller/cart/cart_controller");
const router = express.Router();
router.get("/cart",ctrl.list)
router.get("/view_list",ctrl.viewList)
router.get("/save/:goods",ctrl.save)

module.exports = router;
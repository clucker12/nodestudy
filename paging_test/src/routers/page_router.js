const router = require("express").Router();
const ctrl = require("../controller/page_controller")

router.get("/", ctrl.views.index);
router.get("/list", ctrl.views.list);
router.get("/write_form", ctrl.views.writeForm);

router.post("/write",ctrl.process.write)
router.get("/content/:num", ctrl.views.content);

module.exports = router;
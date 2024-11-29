const router = require("express").Router();
const ctrl = require("../../controller/board/board_ctrl")
const upload = require("../../../config/file/file_config")

router.get("/list", ctrl.views.list);
router.get("/write_form",ctrl.views.writeForm)
router.post("/write",upload.single("file_name"),ctrl.process.write)
router.get("/content/:no",ctrl.views.content)
router.get("/download/:fileName",ctrl.views.download)
router.get("/delete",ctrl.process.delete)


module.exports = router;
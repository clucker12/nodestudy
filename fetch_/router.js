module.exports = (app) => {
    const ctrl = require("./controller");
    const router = require("express").Router();

    router.get("/index", ctrl.index);
    router.get("/members", ctrl.members);
    router.get("/members/:uId", ctrl.member);

    router.post("/members", ctrl.reg);
    router.put("/members", ctrl.modify);
    router.delete("/members/:id", ctrl.del);

    router.get("/register_View",ctrl.registerView)
    router.get("/id_check",ctrl.idCheck)

    router.get("/view_member", ctrl.viewMember)
    router.get("/quiz_members",ctrl.quizMembers)

    return router;
}
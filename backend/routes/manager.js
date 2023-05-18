const { Router } = require("express");

const isAuth = require("../middleware/is-manager");
const ManagerController = require("../controllers/manager");

const router = Router({ strict: true });

router.post("/login", ManagerController.login);
router.get("/auth-Manager", isAuth, ManagerController.getAuthManager);
router.get("/users", isAuth, ManagerController.getUsers);
router.get("/user", isAuth, ManagerController.getUser);

router.get("/event", isAuth, ManagerController.getEvent);
// router.post("/createEvent", isAuth, upload.single("imagePath"), ManagerController.createEvent);
// router.patch("/event/:id", isAuth, ManagerController.updateEvent);
router.delete("/event/:id", isAuth, ManagerController.deleteEvent);

router.get("/jobEvents", isAuth, ManagerController.getJobEvents);
router.post("/createJobEvent", isAuth, ManagerController.createNewJobEvent);
router.put("/jobEvent/:id", isAuth, ManagerController.updateJobEvent);
router.delete("/jobEvent/:id", isAuth, ManagerController.deleteJobEvent);

router.get("/jobUserApply", isAuth, ManagerController.getJobUserApply);

router.get("/ctv", isAuth, ManagerController.getCTV);
router.put("/coefficient/:eventId/:userApplyId", isAuth, ManagerController.updateCoefficient);


router.put("/approveUser/:eventId/:userApplyId", isAuth, ManagerController.approveUserApplyJob);
router.put("/unapproveUser/:eventId/:userApplyId", isAuth, ManagerController.unapproveUserApplyJob);

router.put("/acceptCTV/:eventId/:userApplyId", isAuth, ManagerController.acceptCTV);
router.put("/unAcceptCTV/:eventId/:userApplyId", isAuth, ManagerController.unAcceptCTV);

router.get("/test/:id", isAuth, ManagerController.test);


module.exports = router;

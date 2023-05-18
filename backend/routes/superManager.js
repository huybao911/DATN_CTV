const { Router } = require("express");

const isAuth = require("../middleware/is-superManager");
const sManagerController = require("../controllers/superManager");


const router = Router({ strict: true });

router.post("/login", sManagerController.login);
router.get("/auth-SManager", isAuth, sManagerController.getAuthsuperManager);
router.get("/user", isAuth, sManagerController.getUser);
router.get("/users", isAuth, sManagerController.getUsers);
router.get("/departments", isAuth, sManagerController.getDepartments);

router.get("/eventApprove", isAuth, sManagerController.getEventApprove);
router.put("/event/:id", isAuth, sManagerController.approveEvent);

router.put("/comment/:id", isAuth, sManagerController.commentEvent);
router.put("/comment/:eventId/:id", isAuth, sManagerController.deleteCommentEvent);

router.get("/events", isAuth, sManagerController.getEvents);
router.post("/createEvent", isAuth, sManagerController.createEvent);
router.patch("/event/:id", isAuth, sManagerController.updateEvent);
router.delete("/event/:id", isAuth, sManagerController.deleteEvent);

router.get("/jobEvents", isAuth, sManagerController.getJobEvents);
router.post("/createJobEvent", isAuth, sManagerController.createNewJobEvent);
router.patch("/jobEvent/:id", isAuth, sManagerController.updateJobEvent);
router.delete("/jobEvent/:id", isAuth, sManagerController.deleteJobEvent);
// router
//   .route("/users/:id")
//   .patch(isAuth, sManagerController.updateUser)
//   .delete(isAuth, sManagerController.deleteUser);

// router.delete("/users/:id", isAuth, adminController.deleteUser);
// router.patch("/users/:id", isAuth, adminController.updateUser);

module.exports = router;

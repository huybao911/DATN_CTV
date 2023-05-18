const { Router } = require("express");

const isAuth = require("../middleware/is-user");
const userController = require("../controllers/user");

const router = Router({ strict: true });

router.post("/login", userController.login);
router.post("/register", userController.register);
router.put("/resetPass", isAuth, userController.resetPassword);
router.get("/auth-user", isAuth, userController.getAuthUser);

router.get("/events", userController.getEvents);
router.get("/departments", userController.getDepartments);

router.get("/eventStorager", isAuth, userController.getEventStorager);
router.put("/storager/:id", isAuth, userController.createStorager);
router.put("/unstorager/:id", isAuth, userController.deleteStorager);

router.get("/jobUserApply", isAuth, userController.getJobApply);
router.put("/userApply/:eventId/:jobId", isAuth, userController.createUserApplyJob);
router.put("/userUnApply/:eventId/:jobId", isAuth, userController.deleteUserApplyJob);

router.get("/profile", isAuth, userController.getProfileUser);
router.put("/profile/:id", isAuth, userController.updateProfile);

module.exports = router;

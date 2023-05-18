const { Router } = require("express");

const isAuth = require("../middleware/is-admin");
const adminController = require("../controllers/admin");

const router = Router({ strict: true });

router.post("/login", adminController.login);
router.get("/auth-admin", isAuth, adminController.getAuthAdmin);
router.get("/users", isAuth, adminController.getUsers);
router.get("/user", isAuth, adminController.getUser);

router.get("/roles", isAuth, adminController.getRoles);
router.post("/addRole", isAuth, adminController.addRole);

router.get("/departments", isAuth, adminController.getDepartments);
router.post("/addDepartment", isAuth, adminController.addDepartment);
router.patch("/department/:id", isAuth, adminController.updateDepartment);
router.delete("/department/:id", isAuth, adminController.deleteDepartment);

router.get("/events", isAuth, adminController.getEvents);
router.get("/jobEvents", isAuth, adminController.getJobEvents);

router
  .route("/users/:id")
  .patch(isAuth, adminController.updateUser)
  .delete(isAuth, adminController.deleteUser);

// router.delete("/users/:id", isAuth, adminController.deleteUser);
// router.patch("/users/:id", isAuth, adminController.updateUser);

module.exports = router;

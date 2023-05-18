const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const User = require("../models/User");
const Department = require("../models/Department");
const Role = require("../models/Role");
const Event = require("../models/Event");
const JobEvent = require("../models/JobEvent");

exports.register = async (req, res, next) => {
  const { username, email, password, role, department, fullName, birthday, mssv, classUser, phone, address, avatar } = req.body;

  if (!username || !email || !password || !role)
    return res.status(400).send("Please fill in all the required fields!")
  try {
    const userObj = { username, email, role, department, fullName, birthday, mssv, classUser, phone, address, };
    const hashedPwd = await hash(password, 12);
    userObj.password = hashedPwd;
    const user = await new User(userObj).save();
    let getRole = await Role.findById(userObj.role);

    let getDepartment = await Department.findById(userObj.department);

    const token = sign({ user, getRole, getDepartment }, process.env.JWT_SECRET, { expiresIn: 360000 });
    return res
      .status(200)
      .json(getRole.keyRole === "user" ? { token, user: { ...user._doc, password: null, fullName: null, birthday: null, mssv: null, classUser: null, phone: null, address: null, avatar: null }, getRole } : getRole.keyRole === "admin" ? { token, admin: { ...user._doc, password: null }, getRole } : getRole.keyRole === "smanager" ? { token, smanager: { ...user._doc, password: null }, getRole } : { token, manager: { ...user._doc, password: null }, getRole }) //role: getRole, department: getDepartment

  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).lean();
    let getRole = await Role.findById(user.role);
    let getDepartment = await Department.findById(user.department);

    if (!user) return res.status(404).send("Invalid credentials");
    if (getRole.keyRole !== "user")
      return res.status(404).send("Invalid credentials..");
    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");
    const token = sign({ user, getRole }, process.env.JWT_SECRET, { expiresIn: 360000 });
    return res.status(200).json({ token, user: { ...user, password: null }, getRole, getDepartment });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.resetPassword = async (req, res, next) => {
  const { password, resetPass, confirmPass } = req.body;
  const user = await User.findById(req?.user?._id).populate("role").populate("department");
  if ( !password || !resetPass)
    return res.status(400).send("Please fill in all the required fields!")
  try {
    if (!req.user) return res.status(400).send("You dont have permission");
    const isMatchPass = await compare(confirmPass, user.password);
    if (!isMatchPass) return res.status(400).send("Mật khẩu cũ không trùng khớp");
    const hashedPwd = await hash(password, 12);
    const passwordObj = {
      password: hashedPwd,
    };
    const isMatch = await compare(resetPass, passwordObj.password);
    if (!isMatch) return res.status(400).send("Mật khẩu không trùng khớp");
    const newPass = await User.findByIdAndUpdate(
      { _id: user._id },
      { password: passwordObj.password },
      { new: true }
    );
    return res.status(200).json(newPass);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.getEvents = async (req, res) => {
  const smanagerRole = await User.find({ role: "640cc3c229937ffacc4359f8" });
  const smanagerEvent = await Event.find({ approver: smanagerRole }).populate("poster").populate("departmentEvent").populate({ path: "storagers", populate: [{ path: "storager" }]}).populate({ path: "usersApplyJob", populate: [{ path: "userApply" }]}).populate({ path: "usersApplyJob", populate: [{ path: "userApply" }]}).populate({ path: "usersApplyJob", populate: [{ path: "jobEvent", populate: [{ path: "event" }] }] });
  try {
    return res.status(200).json(smanagerEvent);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getEventStorager = async (req, res) => {
  const userStorage = await User.findById(req?.user?._id).populate("role").populate("department");
  const findEvent = await Event.find({ storagers: { $elemMatch: { storager: userStorage._id } } }).populate("poster").populate("departmentEvent").populate({ path: "storagers", populate: [{ path: "storager" }]}).populate({ path: "usersApplyJob", populate: [{ path: "userApply" }]}).populate({ path: "usersApplyJob", populate: [{ path: "userApply" }]}).populate({ path: "usersApplyJob", populate: [{ path: "jobEvent", populate: [{ path: "event" }] }] });
  try {
    return res.status(200).json(findEvent);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.createStorager = async (req, res) => {
  const { id } = req.params;
  const userStorage = await User.findById(req?.user?._id).populate("role").populate("department");
  const { created } = req.body;
  try {
    if (!req.user) return res.status(400).send("You dont have permission");
    const event = await Event.findById(id).lean();
    if (!event) return res.status(400).send("Event does not exist");
    const eventObj = {
      storager: userStorage,
      created:created,
    };
    const newStorager = await Event.findByIdAndUpdate(
      { _id: id },
      {
        $push: {
          storagers: [{
            storager: eventObj.storager,
            created: eventObj.created,
          }]
        }
      },
      { new: true }
    );
    return res.status(200).json(newStorager);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};
exports.deleteStorager = async (req, res) => {
  const { id } = req.params;
  const userStorage = await User.findById(req?.user?._id).populate("role").populate("department");
  try {
    if (!req.user) return res.status(400).send("You dont have permission");
    const newStorager = await Event.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          storagers: {
            storager: userStorage._id,
          }
        }
      },
      { new: true }
    );
    return res.status(200).json(newStorager);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.getJobApply = async (req, res) => {
  const userApplyJob = await User.findById(req?.user?._id).populate("role").populate("department");
  const findEvent = await Event.find({ usersApplyJob: { $elemMatch: { userApply: userApplyJob._id }}}).populate("poster").populate("departmentEvent").populate({ path: "storagers", populate: [{ path: "storager" }]}).populate({ path: "usersApplyJob", populate: [{ path: "userApply" }]}).populate({ path: "usersApplyJob", populate: [{ path: "userApply" }]}).populate({ path: "usersApplyJob", populate: [{ path: "jobEvent", populate: [{ path: "event" }] }] });
  // const findJobUserApply = findEvent.map((userapply) => userapply.usersApplyJob.filter((userapply) => userapply.userApply.username === userApplyJob.username));
  try {
    return res.status(200).json(findEvent);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createUserApplyJob = async (req, res) => {
  const { eventId, jobId } = req.params;
  const userApplyJob = await User.findById(req?.user?._id).populate("role").populate("department");
  try {
    if (!req.user) return res.status(400).send("You dont have permission");
    const event = await Event.findById(eventId).lean();
    if (!event) return res.status(400).send("Event does not exist");
    const job = await JobEvent.findById(jobId).populate("event");
    if (!job) return res.status(400).send("Job does not exist");
    const eventObj = {
      userApply: userApplyJob,
      jobEvent: job,
      total: job.unitPrice,
    };
    const newUserApply = await Event.findByIdAndUpdate(
      { _id: eventId },
      {
        $push: {
          usersApplyJob: [{
            userApply: eventObj.userApply,
            jobEvent: eventObj.jobEvent,
            total: eventObj.total,
          }]
        },
      },
      { new: true }
    );
    return res.status(200).json(newUserApply);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.deleteUserApplyJob = async (req, res) => {
  const { eventId, jobId } = req.params;
  const userStorage = await User.findById(req?.user?._id).populate("role").populate("department");
  try {
    if (!req.user) return res.status(400).send("You dont have permission");
    const newUserApply = await Event.findOneAndUpdate(
      { _id: eventId },
      {
        $pull: {
          usersApplyJob: {
            userApply: userStorage._id,
            jobEvent: jobId,
          }
        }
      },
      { new: true }
    );
    return res.status(200).json(newUserApply);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.getProfileUser = async (req, res, next) => {
  const userProfile = await User.findById(req?.user?._id).populate("role").populate("department");
  try {
    if (!req.user) return res.status(400).send("You dont have permission");
    return res.status(200).json([userProfile]);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const { username, email, department, fullName, birthday, mssv, classUser, phone, address } = req.body;
  try {
    if (!req.user) return res.status(400).send("You dont have permission");
    const user = await User.findById(id).lean();
    if (!user) return res.status(400).send("User does not exist");
    const profileUserObj = {
      username: username,
      email: email,
      department: department,
      fullName: fullName,
      birthday: birthday,
      mssv: mssv,
      classUser: classUser,
      phone: phone,
      address: address,
    };
    const newProfileUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        username: profileUserObj.username,
        email: profileUserObj.email,
        department: profileUserObj.department,
        fullName: profileUserObj.fullName,
        birthday: profileUserObj.birthday,
        mssv: profileUserObj.mssv,
        classUser: profileUserObj.classUser,
        phone: profileUserObj.phone,
        address: profileUserObj.address,
      },
      { new: true }
    );
    return res.status(200).json(newProfileUser);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.getDepartments = async (req, res, next) => {
  try {
    return res.status(200).json(await Department.find().lean());
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getAuthUser = async (req, res, next) => {
  try {
    const user = await User.findById(req?.user?._id).select("-password").lean();
    let getRole = await Role.findById(user.role);
    let getDepartment = await Department.findById(user.department);
    if (!user)
      return res.status(400).send("User not found, Authorization denied..");
    return res.status(200).json({ user: { ...user }, getRole, getDepartment });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
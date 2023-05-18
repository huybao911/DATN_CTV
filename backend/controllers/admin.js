const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const User = require("../models/User");
const Department = require("../models/Department");
const Role = require("../models/Role");
const Event = require("../models/Event");
const JobEvent = require("../models/JobEvent");


exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  
  try {
    const admin = await User.findOne({ username }).lean();
    //Load danh sách role 
    let getRole = await Role.findById(admin.role);

    //So sánh check
    if (!admin) return res.status(404).send("Invalid credentials");
    if (getRole.keyRole !== "admin")
      return res.status(404).send("Invalid credentials..");
    const isMatch = await compare(password, admin.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");
    const token = sign({ admin, getRole }, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });
    return res.status(200).json({ token, admin, getRole });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


exports.addRole = async (req, res) => {
  const { nameRole, keyRole } = req.body;
  try {
    if (!nameRole || !keyRole) {
      return res.status(400).send("Please fill in all the required fields!")
    }
    if (!req.admin) {
      return res.status(400).send("You dont have permission");
    }
    const roleObj = { nameRole, keyRole }
    const role = await new Role(roleObj).save();
    return res
      .status(201)
      .json(role)
  }
  catch (error) {
    return res.status(500).send(error.message);
  }
}

exports.getUsers = async (req, res, next) => {
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    return res.status(200).json(await User.find().populate("role").populate("department"));//.populate("department")
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    return res.status(200).json([await User.findOne().populate("role").populate("department")]);//.populate("department")
  } catch (error) {
    return res.status(500).json(error);
  }
};


exports.getDepartments = async (req, res, next) => {
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    return res.status(200).json(await Department.find().lean());
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.addDepartment = async (req, res) => {
  const { nameDepartment, keyDepartment } = req.body;
  try {
    if (!nameDepartment || !keyDepartment) {
      return res.status(400).send("Please fill in all the required fields!")
    }
    if (!req.admin) {
      return res.status(400).send("You dont have permission");
    }
    const departmentObj = { nameDepartment, keyDepartment }
    const department = await new Department(departmentObj).save();
    return res
      .status(201)
      .json(department)
  }
  catch (error) {
    return res.status(500).send(error.message);
  }
}

exports.updateDepartment = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    const department = await Department.findById(id).lean();
    if (!department) return res.status(400).send("Department does not exist");
    const departmentObj = { ...req.body };
    const newDepartment = await Department.findByIdAndUpdate(
      { _id: id },
      { ...departmentObj },
      { new: true }
    );
    return res.status(200).json(newDepartment);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.deleteDepartment = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    await Department.deleteOne({ _id: id });
    return res.status(200).send("Deparment has been deleted");
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getRoles = async (req, res, next) => {
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    return res.status(200).json(await Role.find().lean());
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    const user = await User.findById(id).lean();
    if (!user) return res.status(400).send("User does not exist");
    const userObj = { ...req.body };
    if (req.body.password) {
      const hashedPWD = await hash(req.body.password, 12);
      userObj.password = hashedPWD;
    }
    const newUser = await User.findByIdAndUpdate(
      { _id: id },
      { ...userObj },
      { new: true }
    );
    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    const deleteUser = await User.deleteOne({ _id: id });
    return res.status(200).send("User has been deleted");
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getEvents = async (req, res) => {
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    return res.status(200).json(await Event.find().populate("departmentEvent"));
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getJobEvents = async (req, res) => {
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    return res.status(200).json(await JobEvent.find().populate("event"));
  } catch (error) {
    return res.status(500).json(error);
  }
};


exports.getAuthAdmin = async (req, res, next) => {
  try {
    const admin = await User.findById(req?.admin?._id).select("-password").lean();
    let getRole = await Role.findById(admin.role);
    if (!admin)
      return res.status(400).send("Admin not found, Authorization denied..");
    return res.status(200).json({ admin: { ...admin }, getRole });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

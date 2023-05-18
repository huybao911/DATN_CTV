const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const User = require("../models/User");
const Role = require("../models/Role");
const Department = require("../models/Department");
const Event = require("../models/Event");
const JobEvent = require("../models/JobEvent");

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const smanager = await User.findOne({ username }).lean();
    let getRole = await Role.findById(smanager.role);

    if (!smanager) return res.status(404).send("Invalid credentials");
    if (getRole.keyRole !== "smanager")
      return res.status(404).send("Invalid credentials..");
    const isMatch = await compare(password, smanager.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");
    const token = sign({ smanager, getRole }, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });
    return res.status(200).json({ token, smanager, getRole });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getUser = async (req, res) => {
  const smanagerUser = await User.findById(req?.smanager?._id).populate("role").populate("department");
  try {
    if (!req.smanager) return res.status(400).send("You dont have permission");
    return res.status(200).json([smanagerUser]);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getUsers = async (req, res, next) => {
  const smanagerUser = await User.findById(req?.smanager?._id);
  const smanagerDepartment = await User.find({ department: smanagerUser.department }).populate("role").populate("department");
  try {
    if (!req.smanager) return res.status(400).send("You dont have permission");
    return res.status(200).json(smanagerDepartment);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getDepartments = async (req, res, next) => {
  try {
    if (!req.smanager) return res.status(400).send("You dont have permission");
    return res.status(200).json(await Department.find().lean());
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getEventApprove = async (req, res) => {
  const smanagerUser = await User.findById(req?.smanager?._id);
  const smanagerDepartment = await User.find({ department: smanagerUser.department });
  const smanagerPost = await Event.find({ poster: smanagerDepartment, approver: null }).populate("poster").populate({ path: "comments", populate: [{ path: "commenter" }] });
  try {
    if (!req.smanager) return res.status(400).send("You dont have permission");
    return res.status(200).json(smanagerPost);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.approveEvent = async (req, res) => {
  const { id } = req.params;
  const userApprove = await User.findById(req?.smanager?._id);
  try {
    if (!req.smanager) return res.status(400).send("You dont have permission");
    const event = await Event.findById(id).lean();
    if (!event) return res.status(400).send("Event does not exist");
    const eventObj = {
      approver: userApprove,
    };
    const newEvent = await Event.findByIdAndUpdate(
      { _id: id },
      {
        approver: eventObj.approver,
      },
      { new: true }
    );
    return res.status(200).json(newEvent);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.commentEvent = async (req, res) => {
  const { id } = req.params;
  const userComment = await User.findById(req?.smanager?._id);
  const { contentComment, created } = req.body;
  try {
    if (!req.smanager) return res.status(400).send("You dont have permission");
    const event = await Event.findById(id).lean();
    if (!event) return res.status(400).send("Event does not exist");
    const eventObj = {
      commenter: userComment,
      contentComment: contentComment,
      created: created,
    };
    const newComment = await Event.findByIdAndUpdate(
      { _id: id },
      {
        $push:{comments: [{
          commenter: eventObj.commenter,
          contentComment: eventObj.contentComment,
          created: eventObj.created,
      }]}
      },
      { new: true }
    );
    return res.status(200).json(newComment);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.deleteCommentEvent = async (req, res) => {
  const { id, eventId } = req.params;
  try {
    if (!req.smanager) return res.status(400).send("You dont have permission");
    const newComment = await Event.updateOne(
      { _id: eventId },
      {
        $pull:{comments: {
          _id:id,
      }}
      },
      { new: true }
    );
    return res.status(200).json(newComment);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.getEvents = async (req, res) => {
  const smanagerUser = await User.findById(req?.smanager?._id);
  const smanagerEvent = await Event.find({ departmentEvent: smanagerUser.department}).populate("departmentEvent");
  try {
    if (!req.smanager) return res.status(400).send("You dont have permission");
    return res.status(200).json(smanagerEvent);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createEvent = async (req, res) => {
  const { nameEvent, quantityUser, job, location, costs, dayStart, dayEnd } = req.body;
  const smanagerUser = await User.findById(req?.smanager?._id);
  const smanagerDepartment = await Department.findOne({ _id: smanagerUser.department });
  try {
    if (!req.smanager) return res.status(400).send("You dont have permission");
    if (!nameEvent || !quantityUser || !location || !costs || !dayStart || !dayEnd)
    return res.status(400).send("Please fill in all the required fields!")
    const newEvent = new Event({
      nameEvent,
      quantityUser,
      job,
      location,
      departmentEvent:smanagerDepartment,
      costs,
      dayStart,
      dayEnd,
    });
    await newEvent.save();

    return res
      .status(200)
      .json(newEvent)
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const getJobEvent = await JobEvent.find({eventId:id});
  const { nameEvent, quantityUser, location, costs, dayStart, dayEnd } = req.body;
  try {
    if (!req.smanager) return res.status(400).send("You dont have permission");
    const event = await Event.findById(id).lean();
    if (!event) return res.status(400).send("Event does not exist");
    const eventObj = {
      nameEvent: nameEvent,
      quantityUser: quantityUser,
      job: getJobEvent,
      location: location,
      costs: costs,
      dayStart: dayStart,
      dayEnd: dayEnd,
    };
    const newEvent = await Event.findByIdAndUpdate(
      { _id: id },
      {
        nameEvent: eventObj.nameEvent,
        quantityUser: eventObj.quantityUser,
        job: eventObj.job,
        location: eventObj.location,
        costs: eventObj.costs,
        dayStart: eventObj.dayStart,
        dayEnd: eventObj.dayEnd,
      },
      { new: true }
    );
    return res.status(200).json(newEvent);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.smanager) return res.status(400).send("You dont have permission");
    await Event.deleteOne({ _id: id });
    return res.status(200).send("Event has been deleted");
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getJobEvents = async (req, res) => {
  const smanagerUser = await User.findById(req?.smanager?._id);
  const smanagerEvent = await Event.find({ departmentEvent: smanagerUser.department}).populate("departmentEvent");
  const smanagerJobEvent = await JobEvent.find({ event: smanagerEvent}).populate("event");
  try {
    if (!req.smanager) return res.status(400).send("You dont have permission");
    return res.status(200).json(smanagerJobEvent);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createNewJobEvent = async (req, res) => {
  const { nameJob,event, quantity} = req.body;
  try {
    if (!req.smanager) return res.status(400).send("You dont have permission");
    if (!nameJob || !event || !quantity) {
      return res.status(400).send("Please fill in all the required fields!")
    }
    const NewJobEvent = new JobEvent({
      nameJob: nameJob,
      event: event,
      quantity: quantity,
    });
    await NewJobEvent.save();

    res.status(200).json(NewJobEvent);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.updateJobEvent = async (req, res, next) => {
  const { id } = req.params;
  const { nameJob, event, quantity} = req.body;
  try {
    if (!req.smanager) return res.status(400).send("You dont have permission");
    const jobEvent = await JobEvent.findById(id).lean();
    if (!jobEvent) return res.status(400).send("JobEvent does not exist");
    const jobEventObj = { 
      nameJob: nameJob,
      event: event,
      quantity:quantity,
     };
    const newJobEvent = await JobEvent.findByIdAndUpdate(
      { _id: id },
      { 
        nameJob: jobEventObj.nameJob,
        event: jobEventObj.event,
        quantity: jobEventObj.quantity,
       },
      { new: true }
    );
    return res.status(200).json(newJobEvent);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

exports.deleteJobEvent = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.smanager) return res.status(400).send("You dont have permission");
    await JobEvent.deleteOne({ _id: id });
    return res.status(200).send("JobEvent has been deleted");
  } catch (error) {
    return res.status(500).json(error);
  }
};



exports.getAuthsuperManager = async (req, res, next) => {
  try {
    const smanager = await User.findById(req?.smanager?._id).select("-password").lean();
    let getRole = await Role.findById(smanager.role);
    let getDepartment = await Department.findById(smanager.department);
    if (!smanager)
      return res.status(400).send("Supermanager not found, Authorization denied..");
    return res.status(200).json({ smanager: { ...smanager }, getRole, getDepartment });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

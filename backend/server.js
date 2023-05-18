const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const cors = require("cors");
require("colors");

const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

const isAuth = require("./middleware/is-manager");
const isAuthUser = require("./middleware/is-user");
const User = require("./models/User");
const Department = require("./models/Department");
const Event = require("./models/Event");
const JobEvent = require("./models/JobEvent");


const db = require("./config/db");

const app = express();

dotenv.config({ path: "./config/config.env" });

const cloudinary = require("cloudinary").v2;

const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_HOST,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storages = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "CTV",
        format: async () => "jpg",
        public_id: (req, file) => file.filename
    },
})

if (process.env.NODE_ENV === "production") console.log = function () { };

if (process.env.NODE_ENV === "development") app.use(logger("dev"));

app.use(cors());

// DB Connection
db(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Upload 
app.use("/images", express.static(path.join(__dirname, "public/images")));
// app.use(express.static(path.join('public/images')));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storages });
app.post("/api/v1/manager/createEvent", upload.single("image"), isAuth, async (req, res) => {
    const { nameEvent, comments, job, location, dayStart, dayEnd, storagers, usersApplyJob, image, contentEvent, ggSheet } = req.body;
    const managerUser = await User.findById(req?.manager?._id);
    const managerDepartment = await Department.findOne({ _id: managerUser.department });
    try {
        if (!req.manager) return res.status(400).send("You dont have permission");
        if (!nameEvent || !location || !dayStart || !dayEnd || !contentEvent || !ggSheet)
            return res.status(400).send("Please fill in all the required fields!")
        const newEvent = new Event({
            nameEvent,
            poster: managerUser,
            approver: null,
            comments,
            job,
            location,
            departmentEvent: managerDepartment,
            dayStart,
            dayEnd,
            contentEvent,
            storagers,
            usersApplyJob,
            ggSheet,
            image: req.file.path,
        });
        await newEvent.save();

        return res
            .status(200)
            .json(newEvent)
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

app.put("/api/v1/manager/event/:id", upload.single("image"), isAuth, async (req, res) => {
    const { id } = req.params;
    const getJobEvent = await JobEvent.find({ event: id });
    const getQuantity = getJobEvent.map((job) => job.quantity);
    const sumQuantity = getQuantity.reduce((a, b) => a + b);

    const getTotalJob = getJobEvent.map((job) => job.total);
    const sumTotalJob = getTotalJob.reduce((a, b) => a + b);

    const { nameEvent, poster, approver, location, dayStart, dayEnd, ggSheet, contentEvent } = req.body;
    try {
        if (!req.manager) return res.status(400).send("You dont have permission");
        const event = await Event.findById(id).lean();
        if (!event) return res.status(400).send("Event does not exist");
        if (req.file) {
            const eventObj = {
                nameEvent: nameEvent,
                poster: poster,
                approver: approver,
                quantityUser: sumQuantity,
                job: getJobEvent,
                location: location,
                costs: sumTotalJob,
                dayStart: dayStart,
                dayEnd: dayEnd,
                contentEvent: contentEvent,
                image: req.file.path,
                ggSheet: ggSheet,
            };
            const newEvent = await Event.findByIdAndUpdate(
                { _id: id },
                {
                    nameEvent: eventObj.nameEvent,
                    poster: eventObj.poster,
                    approver: eventObj.approver,
                    quantityUser: eventObj.quantityUser,
                    job: eventObj.job,
                    location: eventObj.location,
                    costs: eventObj.costs,
                    dayStart: eventObj.dayStart,
                    dayEnd: eventObj.dayEnd,
                    contentEvent: eventObj.contentEvent,
                    ggSheet: eventObj.ggSheet,
                    image: eventObj.image,
                },
                { new: true }
            );
            return res.status(200).json(newEvent);
        }
        else {
            const eventObj = {
                nameEvent: nameEvent,
                poster: poster,
                approver: approver,
                quantityUser: sumQuantity,
                job: getJobEvent,
                location: location,
                costs: sumTotalJob,
                dayStart: dayStart,
                dayEnd: dayEnd,
                contentEvent: contentEvent,
                ggSheet: ggSheet,
            };
            const newEvent = await Event.findByIdAndUpdate(
                { _id: id },
                {
                    nameEvent: eventObj.nameEvent,
                    poster: eventObj.poster,
                    approver: eventObj.approver,
                    quantityUser: eventObj.quantityUser,
                    job: eventObj.job,
                    location: eventObj.location,
                    costs: eventObj.costs,
                    dayStart: eventObj.dayStart,
                    dayEnd: eventObj.dayEnd,
                    contentEvent: eventObj.contentEvent,
                    ggSheet: eventObj.ggSheet,
                },
                { new: true }
            );
            return res.status(200).json(newEvent);
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error);
    }

});

app.put("/api/v1/user/profile/:id", upload.single("avatar"), isAuthUser, async (req, res) => {
    const { id } = req.params;
    const { username, email, department, fullName, birthday, mssv, classUser, phone, address } = req.body;
    try {
        if (!req.user) return res.status(400).send("You dont have permission");
        const user = await User.findById(id).lean();
        if (!user) return res.status(400).send("User does not exist");
        if (req.file) {
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
                avatar: req.file.path,
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
                    avatar: profileUserObj.avatar,
                },
                { new: true }
            );
            return res.status(200).json(newProfileUser);
        }
        else {
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
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error);
    }
});

app.use("/api/v1/user", require("./routes/user"));
app.use("/api/v1/smanager", require("./routes/superManager"));
app.use("/api/v1/manager", require("./routes/Manager"));
app.use("/api/v1/admin", require("./routes/admin"));

module.exports = app;
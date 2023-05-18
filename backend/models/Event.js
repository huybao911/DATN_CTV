const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        nameEvent: {
            type: String,
            trim: true,
            required: [true, "NameEvent is required"],
        },
        poster: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        approver: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        comments: [
            {
                commenter: {
                    type: mongoose.Types.ObjectId,
                    ref: "User",
                },
                contentComment: {
                    type: String,
                    trim: true,
                },
                created: { type: Date, default: Date.now }
            },
        ],
        quantityUser: {
            type: Number,
            default: 0,
        },
        job: {
            type: Array,
            required: [true, "Job is required"],
            default: [],
        },
        location: {
            type: String,
            trim: true,
            required: [true, "Location is required"],
        },
        departmentEvent:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
        },
        costs: {
            type: Number,
            default: 0,
        },
        image: {
            type: String,
            required: true,
        },
        ggSheet : {
            type: String,
        },
        dayStart: {
            type: String,
            trim: true,
            required: [true, "DayStart is required"],
        },
        dayEnd: {
            type: String,
            trim: true,
            required: [true, "DayEnd is required"],
        },
        contentEvent: {
            type: String,
            required: true,
            maxLength: [8000, "Must be no more than 8000 characters"],
          },
        storagers: [
            {
                storager: {
                    type: mongoose.Types.ObjectId,
                    ref: "User",
                },
                created: { type: Date, default: Date.now }
            },
        ],
        usersApplyJob: [
            {
                jobEvent: {
                    type: mongoose.Types.ObjectId,
                    ref: "JobEvent",
                },
                userApply: {
                    type: mongoose.Types.ObjectId,
                    ref: "User",
                },
                applyStatus: {
                    type: String,
                    default: "Chờ phê duyệt",
                },
                notiApplyJob: {
                    type: String,
                    default: "Chờ phê duyệt",
                },
                acceptStatus: {
                    type: String,
                    default: "Chờ phê duyệt",
                },
                notiAccept: {
                    type: String,
                    default: "Chờ phê duyệt",
                },
                coefficient : {
                    type: Number,
                    default: 1,
                },
                total : {
                    type: Number,
                },
            },
        ],
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);


module.exports = mongoose.model("Event", eventSchema);

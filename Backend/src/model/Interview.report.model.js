const mongoose = require("mongoose");

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical Question required."]
    },
    intention: {
        type: String,
        required: [true, "Intention required."]
    },
    answer: {
        type: String,
        required: [true, "Answer is required."]
    },
},
    { _id: false }
)

const behaviouralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical Question required."]
    },
    intention: {
        type: String,
        required: [true, "Intention required."]
    },
    answer: {
        type: String,
        required: [true, "Answer is required."]
    },
},
    { _id: false }
)

const skill_GapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skills are required."]
    },
    serverity: {
        type: String,
        enum:["low","medium","high"],
        required: [true, "Serverity is required."]
    },
},
    { _id: false }
)

const preparationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:[true,"Day is required."]
    },
    focus:{
        type:String,
        required:[true,"Focus  is required."]
    },
    task:[{
        type:String,
        required:[true,"tasks are required."]
    }]
})

// Schema creation.
const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "Job description required."]
    },
    resume: {
        type: String
    },
    selfDescription: {
        type: String
    },
    match_Score: {
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestions : [technicalQuestionSchema],
    behaviouralQuestion : [behaviouralQuestionSchema],
    skill_Gap : [skill_GapSchema],
    preparationPlan : [preparationPlanSchema],
    user:{
        type :mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    title:{
        type:String,
        required: [true, "Job tittle required."]
    }
},{
    timestamps:true
});

module.exports = mongoose.model("Interview_Report",interviewReportSchema);


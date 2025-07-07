const mongoose = require("mongoose");

const garbageSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    garbageType:{
        type:String,
        enum:["Organic","Plastic","E-Waste","Mixed","Metal"],
        required:true
    },
    state:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    taluk:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    landMark:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    depositedOn:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Pending","Approved","Rejected","Scheduled"],
        default:"Pending"
    },
    disposed:{
        type:Boolean,
        required:true,
        default:false
    },
    weight:{
        type:String,
        required:true
    }

},
{
    timestamps:true
})

module.exports = mongoose.model("Garbage",garbageSchema);
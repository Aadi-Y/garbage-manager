const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema({
    areaName:{
        type:String,
        required:true
    },
    areaLocation:{
        type:String,
        required:true
    },
    areaPincode:{
        type:Number,
        required:true
    },
    assignedDrivers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Driver"
    }],
})

module.exports = mongoose.model("Area",areaSchema);
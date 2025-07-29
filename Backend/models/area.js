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
    areaId:{
        type:String,
        required:true,
        unique:true
    },
    // assignedDrivers:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Driver"
    // }],
    assignedDrivers:[{
        type:String,
    }],
})

module.exports = mongoose.model("Area",areaSchema);
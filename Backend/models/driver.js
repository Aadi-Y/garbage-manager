const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    name:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    licence:{
        type:String,
    },
    aadharId:{
        type:Number,
        required:true
    },
    vehicle:{
        type:String,
        required:true
    },
    vehicleNumber:{
        type:String,
        required:true
    },
    availability:{
        type:Boolean,
        required:true
    },
    assignedRequest:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Garbage"
    }],
    currentLocation:{
        type:String,
        required:true
    },
    driverId:{
        type:String,
        required:true,
        unique:true
    }
})

module.exports = mongoose.model("Driver",driverSchema);
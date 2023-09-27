import mongoose from "mongoose";

const propertySchema = mongoose.Schema({
    propertyName: {
        type: String,
        required:true
    },
    propertyType: {
        type: String,
        required:true
    },
    propertyPrice: {
        type: Number,
        required : true
    },
    propertyLocation: {
        type: String,
        required:true
    },
    propertyAvailDate: {
        type: Date,
        required:true
    },
    propertyOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:true
    }
}, { timestamp: true })

export default mongoose.model('property', propertySchema);
import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        required: true,
        enum: ["AVAILABLE", "UNAVAILABLE"]
    },
    categorys: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    }
}, 
{
    timestamps: true,
    versionKey: false
});

export default model('Product', productSchema);
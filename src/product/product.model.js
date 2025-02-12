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
    status: {
        type: String,
        required: true,
        enum: ["AVAILABLE", "UNAVAILABLE"]
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        default: "64d5e1b0c7a8d1b6789abcd0"
    },
    categorys: [{ type: Schema.Types.ObjectId, ref: "Category" }]
}, {
    timestamps: true,
    versionKey: false
});

export default model('Product', productSchema);
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
    categorys: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        default: "67ad0a98a2a5eeaa2dd27999"
    }
}, 
{
    timestamps: true,
    versionKey: false
});

export default model('Product', productSchema);
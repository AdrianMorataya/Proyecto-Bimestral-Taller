import { Schema, model} from "mongoose";

const CategorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }]
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Category", CategorySchema);

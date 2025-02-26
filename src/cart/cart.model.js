import { Schema, model} from "mongoose";

const cartSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      products: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
          },
          quantity: {
            type: Number,
            default: 1
          },
          totalPrice: {
            type: Number,
            required: true
          }
        }
      ]
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  export default model("Cart", cartSchema);
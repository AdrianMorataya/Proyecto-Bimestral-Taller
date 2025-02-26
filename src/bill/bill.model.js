import { Schema, model } from "mongoose";

const invoiceSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    nit: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
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
          required: true
        },
        totalPrice: {
          type: Number,
          required: true
        }
      }
    ],
    totalAmount: {
      type: Number,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false
  }
);

export default model("Invoice", invoiceSchema);

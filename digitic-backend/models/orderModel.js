const mongoose = require("mongoose"); // Erase if already required
const { string } = require("sharp/lib/is");

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    shippingInfo: {
      firstname: {
        type: String,
        required: true
      },
      lastname: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      addressDetail: {
        type: String,
        required: true
      },
      pincode: {
        type: Number,
        required: true
      }
    },
    paymentInfo: {
      jsonResponse: {
        type: String,
        required: true
      },
      httpStatusCode: {
        type: String,
        required: true
      }
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        color: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Color',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        price: {
          type: Number,
          required: true
        }
      }
    ],
    payAt: {
      type: Date,
      default: Date.now()
    },
    totalPrice: {
      type: Number,
      required: true
    },
    totalPriceAfterDiscount: {
      type: Number,
      required: true
    },
    orderStatus: {
      type: String,
      default: 'Comfirming'
    }
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true
    },
    itemQuantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    }
  },
  { timestamps: true }
);

export const Order = mongoose.model('order', orderSchema);

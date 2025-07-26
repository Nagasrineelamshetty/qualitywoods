// models/Order.ts

import mongoose, { Document, Schema } from 'mongoose';

interface IItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customizations: {
    wood?: string;
    finish?: string;
    dimensions?: string;
  };
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  razorpayOrderId: string;
  items: IItem[];
  status: 'Received' | 'In Production' | 'Shipped' | 'Delivered';
  total: number;
  estimatedDelivery: Date;
  orderDate: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    razorpayOrderId: { type: String, required: true },
    items: [
      {
        id: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String,
        customizations: {
          wood: String,
          finish: String,
          dimensions: String,
        },
      },
    ],
    status: {
      type: String,
      enum: ['Received', 'In Production', 'Shipped', 'Delivered'],
      default: 'Received',
    },
    total: { type: Number, required: true },
    estimatedDelivery: { type: Date, required: true },
    orderDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>('Order', OrderSchema);
export default Order;

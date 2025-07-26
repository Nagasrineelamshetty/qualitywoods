import mongoose, { Schema, Document, Model } from 'mongoose';

interface Customizations {
  wood?: string;
  finish?: string;
  dimensions?: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  customizations: Customizations;
}

export interface CartDocument extends Document {
  userId: string;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const cartItemSchema = new Schema<CartItem>(
  {
    productId: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    customizations: {
      wood: { type: String, default: '', trim: true },
      finish: { type: String, default: '', trim: true },
      dimensions: { type: String, default: '', trim: true },
    },
  },
  { _id: false }
);

const cartSchema = new Schema<CartDocument>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true, // Improves lookup speed
      trim: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

const Cart: Model<CartDocument> = mongoose.model<CartDocument>('Cart', cartSchema);

export default Cart;

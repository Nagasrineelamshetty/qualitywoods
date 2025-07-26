import mongoose, { Schema, Document } from 'mongoose';

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
}

const cartItemSchema = new Schema<CartItem>(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true },
    customizations: {
      wood: { type: String, default: null },
      finish: { type: String, default: null },
      dimensions: { type: String, default: null },
    },
  },
  { _id: false }
);

const cartSchema = new Schema<CartDocument>({
  userId: { type: String, required: true, unique: true },
  items: [cartItemSchema],
});

const Cart = mongoose.model<CartDocument>('Cart', cartSchema);
export default Cart;

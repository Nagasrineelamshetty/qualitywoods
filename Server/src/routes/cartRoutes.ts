import express from 'express';
import Cart from '../models/Cart';
import { verifyToken, AuthenticatedRequest } from '../middleware/authmiddleware';

const router = express.Router();

// ✅ Save or update user's cart
router.post('/', verifyToken, async (req: AuthenticatedRequest, res) => {
  const { items } = req.body;
  const userId = req.user!.id;

  try {
    // Validate each cart item has required fields
    for (const item of items) {
      if (
        !item.productId ||
        !item.name ||
        typeof item.price !== 'number' ||
        !item.image ||
        typeof item.quantity !== 'number'
      ) {
        return res.status(400).json({ error: 'Invalid cart item format' });
      }
    }

    let cart = await Cart.findOne({ userId });

    if (cart) {
      cart.items = items;
    } else {
      cart = new Cart({ userId, items });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error('❌ Error saving cart:', err);
    res.status(500).json({ error: 'Failed to save cart' });
  }
});

// ✅ Fetch user's cart
router.get('/', verifyToken, async (req: AuthenticatedRequest, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user!.id });
    res.status(200).json(cart || { items: [] });
  } catch (err) {
    console.error('❌ Error fetching cart:', err);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

export default router;

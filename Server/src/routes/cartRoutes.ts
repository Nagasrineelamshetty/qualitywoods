import express from 'express';
import Cart from '../models/Cart';
import { verifyToken, AuthenticatedRequest } from '../middleware/authmiddleware';

const router = express.Router();

// ✅ Save or update user's cart
router.post('/', verifyToken, async (req: AuthenticatedRequest, res) => {
  try {
    const { items } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    console.log('📥 Incoming cart data:', items);

    // 🧪 Validate each cart item
    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'Items must be an array' });
    }

    for (const item of items) {
      if (
        typeof item.productId !== 'string' ||
        typeof item.name !== 'string' ||
        typeof item.image !== 'string' ||
        typeof item.price !== 'number' ||
        typeof item.quantity !== 'number'
      ) {
        return res.status(400).json({ error: 'Invalid cart item format' });
      }
    }

    // 🛠 Update or create the user's cart
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { items },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json(updatedCart);
  } catch (err) {
    console.error('❌ Error saving cart:', err);
    res.status(500).json({ error: 'Failed to save cart' });
  }
});

// ✅ Fetch user's cart
router.get('/', verifyToken, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const cart = await Cart.findOne({ userId });
    res.status(200).json(cart || { items: [] });
  } catch (err) {
    console.error('❌ Error fetching cart:', err);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

export default router;

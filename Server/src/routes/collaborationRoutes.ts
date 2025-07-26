import express from 'express';
import CollaborationModel from '../models/Collaboration';
import { verifyToken, AuthenticatedRequest } from '../middleware/authmiddleware';

const router = express.Router();

// ✅ POST or update a vote
router.post('/vote', verifyToken, async (req: AuthenticatedRequest, res) => {
  const { sessionId, itemId, voteType } = req.body;
  const userId = req.user?.id!;
  const userName = req.user?.name!;

  try {
    let session = await CollaborationModel.findOne({ sessionId });

    if (!session) {
      session = new CollaborationModel({ sessionId, items: [] });
    }

    let item = session.items.find((i: any) => i.itemId === itemId);

    if (!item) {
      // Use Mongoose subdocument creation
      const newItem = session.items.create({ itemId, votes: [], comments: [] });
      session.items.push(newItem);
      item = newItem;
    }

    // Remove previous vote if it exists
    item.votes = item.votes.filter((v: any) => v.userId !== userId) as any;

    item.votes.push(item.votes.create({
      userId,
      userName,
      vote: voteType,
      timestamp: new Date(),
    }));

    await session.save();
    res.status(200).json({ message: 'Vote recorded', session });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to record vote' });
  }
});

// ✅ POST a comment
router.post('/comment', verifyToken, async (req: AuthenticatedRequest, res) => {
  const { sessionId, itemId, text } = req.body;
  const userId = req.user?.id!;
  const userName = req.user?.name!;

  try {
    let session = await CollaborationModel.findOne({ sessionId });

    if (!session) {
      session = new CollaborationModel({ sessionId, items: [] });
    }

    let item = session.items.find((i: any) => i.itemId === itemId);

    if (!item) {
      const newItem = session.items.create({ itemId, votes: [], comments: [] });
      session.items.push(newItem);
      item = newItem;
    }

    item.comments.push(item.comments.create({
      id: Date.now().toString(),
      userId,
      userName,
      text,
      timestamp: new Date(),
    }));

    await session.save();
    res.status(200).json({ message: 'Comment added', session });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// ✅ GET session (no auth)
router.get('/:sessionId', async (req, res) => {
  try {
    const session = await CollaborationModel.findOne({ sessionId: req.params.sessionId });
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.status(200).json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch session' });
  }
});

export default router;

import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useAuth } from '../contexts/AuthContext';

interface Vote {
  userId: string;
  vote: 'up' | 'down';
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: string;
}

interface CollaborationItem {
  itemId: string;
  votes: Vote[];
  comments: Comment[];
}

const CollaborativeCart = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<CollaborationItem[]>([]);
  const [newComments, setNewComments] = useState<{ [key: string]: string }>({});
  const [numPeople, setNumPeople] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch collaboration session items
  useEffect(() => {
    const fetchData = async () => {
      if (!user?._id) return;

      try {
        const res = await axios.get(`/collaboration/${user._id}`);
        setItems(res.data.items || []);
      } catch (err) {
        console.error('Error fetching collaboration data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleVote = async (itemId: string, voteType: 'up' | 'down') => {
    try {
      const res = await axios.post('/collaboration/vote', {
        sessionId: user?._id,
        itemId,
        voteType,
      });
      setItems(res.data.session.items); // Updated session
    } catch (err) {
      console.error('Voting failed', err);
    }
  };

  const handleAddComment = async (itemId: string) => {
    const comment = newComments[itemId]?.trim();
    if (!comment) return;

    try {
      const res = await axios.post('/collaboration/comment', {
        sessionId: user?._id,
        itemId,
        text: comment,
      });
      setItems(res.data.session.items);
      setNewComments(prev => ({ ...prev, [itemId]: '' }));
    } catch (err) {
      console.error('Comment failed', err);
    }
  };

  const totalPrice = items.length * 1000; // Replace with actual prices if needed
  const perPerson = numPeople > 0 ? (totalPrice / numPeople).toFixed(2) : '0.00';

  if (!user) {
    return <p className="text-center mt-10 text-red-600">Please login to start collaborative shopping.</p>;
  }

  if (loading) {
    return <p className="text-center mt-10">Loading collaborative session...</p>;
  }

  if (items.length === 0) {
    return <p className="text-center mt-10 text-gray-600">No items in this session yet. Start by voting or commenting.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Collaborative Cart</h2>

      {items.map(item => (
        <div key={item.itemId} className="border rounded-lg shadow p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold">{item.itemId}</h3>
            <p className="text-sm text-green-600">
              Votes: {item.votes.filter(v => v.vote === 'up').length}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded"
              onClick={() => handleVote(item.itemId, 'up')}
            >
              👍 Upvote
            </button>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded"
              onClick={() => handleVote(item.itemId, 'down')}
            >
              👎 Downvote
            </button>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold">Comments</h4>
            <ul className="text-sm text-gray-700 list-disc list-inside">
              {item.comments.map((cmt, idx) => (
                <li key={idx}>
                  <strong>{cmt.userName}:</strong> {cmt.text}
                </li>
              ))}
            </ul>
            <div className="flex mt-2 gap-2">
              <input
                type="text"
                placeholder="Add a comment"
                value={newComments[item.itemId] || ''}
                onChange={e =>
                  setNewComments(prev => ({ ...prev, [item.itemId]: e.target.value }))
                }
                className="border p-1 rounded w-full"
              />
              <button
                className="px-3 py-1 bg-green-600 text-white rounded"
                onClick={() => handleAddComment(item.itemId)}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Split Payment Section */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-xl font-semibold mb-2">Split Payment</h3>
        <p>Total Cost: ₹{totalPrice}</p>

        <div className="flex items-center gap-2 mt-2">
          <label htmlFor="numPeople" className="text-sm font-medium">Number of people:</label>
          <input
            id="numPeople"
            type="number"
            value={numPeople}
            onChange={e => setNumPeople(Number(e.target.value))}
            className="border p-1 rounded w-20"
            min={1}
          />
        </div>

        <p className="mt-2 text-green-700">Each person pays: ₹{perPerson}</p>
      </div>
    </div>
  );
};

export default CollaborativeCart;

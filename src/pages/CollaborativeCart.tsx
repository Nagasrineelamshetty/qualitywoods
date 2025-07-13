
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Users, ThumbsUp, ThumbsDown, MessageSquare, Share2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useCart } from '../contexts/CartContext';
import { toast } from '../hooks/use-toast';

interface Vote {
  userId: string;
  userName: string;
  vote: 'up' | 'down';
  timestamp: Date;
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: Date;
}

interface CollaborativeItem {
  itemId: string;
  votes: Vote[];
  comments: Comment[];
}

const CollaborativeCart = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { state } = useCart();
  const [userName, setUserName] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [collaborativeData, setCollaborativeData] = useState<Record<string, CollaborativeItem>>({});
  const [newComment, setNewComment] = useState<Record<string, string>>({});
  const [connectedUsers] = useState([
    'John (Host)', 'Sarah', 'Mom', 'Dad'
  ]);

  useEffect(() => {
    // Initialize collaborative data for each cart item
    const initialData: Record<string, CollaborativeItem> = {};
    state.items.forEach(item => {
      initialData[item.id] = {
        itemId: item.id,
        votes: [
          { userId: '1', userName: 'John', vote: 'up', timestamp: new Date() },
          { userId: '2', userName: 'Sarah', vote: 'up', timestamp: new Date() }
        ],
        comments: [
          {
            id: '1',
            userId: '1',
            userName: 'John',
            text: 'I love this design! Perfect for our living room.',
            timestamp: new Date()
          }
        ]
      };
    });
    setCollaborativeData(initialData);
  }, [state.items]);

  const handleJoinSession = () => {
    if (!userName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name to join the session.",
        variant: "destructive"
      });
      return;
    }
    setIsJoined(true);
    toast({
      title: "Joined Session!",
      description: `Welcome ${userName}! You can now vote and comment on items.`
    });
  };

  const handleVote = (itemId: string, voteType: 'up' | 'down') => {
    if (!isJoined) {
      toast({
        title: "Join Required",
        description: "Please join the session first to vote.",
        variant: "destructive"
      });
      return;
    }

    setCollaborativeData(prev => {
      const updated = { ...prev };
      if (!updated[itemId]) {
        updated[itemId] = { itemId, votes: [], comments: [] };
      }
      
      // Remove existing vote from this user
      updated[itemId].votes = updated[itemId].votes.filter(vote => vote.userName !== userName);
      
      // Add new vote
      updated[itemId].votes.push({
        userId: Date.now().toString(),
        userName,
        vote: voteType,
        timestamp: new Date()
      });
      
      return updated;
    });

    toast({
      title: `Vote ${voteType === 'up' ? 'Added' : 'Added'}`,
      description: `Your ${voteType === 'up' ? 'like' : 'dislike'} has been recorded.`
    });
  };

  const handleAddComment = (itemId: string) => {
    const comment = newComment[itemId];
    if (!comment?.trim() || !isJoined) return;

    setCollaborativeData(prev => {
      const updated = { ...prev };
      if (!updated[itemId]) {
        updated[itemId] = { itemId, votes: [], comments: [] };
      }
      
      updated[itemId].comments.push({
        id: Date.now().toString(),
        userId: Date.now().toString(),
        userName,
        text: comment,
        timestamp: new Date()
      });
      
      return updated;
    });

    setNewComment(prev => ({ ...prev, [itemId]: '' }));
    toast({
      title: "Comment Added",
      description: "Your comment has been shared with the group."
    });
  };

  const getVoteSummary = (itemId: string) => {
    const data = collaborativeData[itemId];
    if (!data) return { likes: 0, dislikes: 0 };
    
    const likes = data.votes.filter(vote => vote.vote === 'up').length;
    const dislikes = data.votes.filter(vote => vote.vote === 'down').length;
    
    return { likes, dislikes };
  };

  const shareSession = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'Join our furniture shopping session!',
        text: 'Help us choose the perfect furniture for our home',
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link Copied",
        description: "Session link copied to clipboard!"
      });
    }
  };

  if (!isJoined) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center py-12 px-4">
        <Card className="max-w-md w-full p-8 bg-white text-center">
          <Users className="mx-auto mb-6 text-amber-600" size={48} />
          <h1 className="text-2xl font-bold text-amber-900 mb-4">Join Shopping Session</h1>
          <p className="text-stone-600 mb-6">
            You've been invited to collaborate on furniture shopping! Enter your name to join the session.
          </p>
          
          <div className="space-y-4">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <Button
              onClick={handleJoinSession}
              className="w-full bg-amber-600 hover:bg-amber-700"
            >
              Join Session
            </Button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-stone-200">
            <p className="text-sm text-stone-500 mb-2">Session ID:</p>
            <code className="text-xs bg-stone-100 px-2 py-1 rounded">{sessionId}</code>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-amber-900">Collaborative Shopping</h1>
            <p className="text-stone-600 mt-1">Vote and comment on furniture choices together</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={shareSession} variant="outline" className="border-amber-600 text-amber-600">
              <Share2 size={16} className="mr-2" />
              Share Session
            </Button>
            <div className="text-sm text-stone-600">
              Connected: {connectedUsers.length} users
            </div>
          </div>
        </div>

        {/* Connected Users */}
        <Card className="p-4 mb-8 bg-white">
          <div className="flex items-center space-x-4">
            <Users className="text-amber-600" size={20} />
            <span className="font-medium text-amber-900">Connected Users:</span>
            <div className="flex flex-wrap gap-2">
              {connectedUsers.map((user, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${
                    user.includes('(Host)') 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-stone-100 text-stone-700'
                  }`}
                >
                  {user}
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Cart Items with Collaboration */}
        <div className="space-y-6">
          {state.items.map((item) => {
            const { likes, dislikes } = getVoteSummary(item.id);
            const itemData = collaborativeData[item.id];
            
            return (
              <Card key={item.id} className="p-6 bg-white">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-amber-900 mb-2">{item.name}</h3>
                        <div className="text-sm text-stone-600 space-y-1 mb-4">
                          {item.customizations.wood && (
                            <p><span className="font-medium">Wood:</span> {item.customizations.wood}</p>
                          )}
                          {item.customizations.finish && (
                            <p><span className="font-medium">Finish:</span> {item.customizations.finish}</p>
                          )}
                          {item.customizations.dimensions && (
                            <p><span className="font-medium">Size:</span> {item.customizations.dimensions}</p>
                          )}
                        </div>
                        <p className="text-2xl font-bold text-amber-600">₹{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Voting Section */}
                  <div className="lg:w-80 space-y-4">
                    {/* Vote Buttons */}
                    <div className="flex items-center justify-center space-x-4 p-4 bg-stone-50 rounded-lg">
                      <Button
                        onClick={() => handleVote(item.id, 'up')}
                        variant="outline"
                        className="flex items-center space-x-2 border-green-200 text-green-600 hover:bg-green-50"
                      >
                        <ThumbsUp size={16} />
                        <span>{likes}</span>
                      </Button>
                      <Button
                        onClick={() => handleVote(item.id, 'down')}
                        variant="outline"
                        className="flex items-center space-x-2 border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <ThumbsDown size={16} />
                        <span>{dislikes}</span>
                      </Button>
                    </div>

                    {/* Comments */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-amber-900 flex items-center">
                        <MessageSquare size={16} className="mr-2" />
                        Comments ({itemData?.comments.length || 0})
                      </h4>
                      
                      {/* Comment List */}
                      <div className="max-h-32 overflow-y-auto space-y-2">
                        {itemData?.comments.map((comment) => (
                          <div key={comment.id} className="bg-stone-50 p-3 rounded text-sm">
                            <div className="font-medium text-amber-700">{comment.userName}</div>
                            <div className="text-stone-700">{comment.text}</div>
                          </div>
                        ))}
                      </div>

                      {/* Add Comment */}
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newComment[item.id] || ''}
                          onChange={(e) => setNewComment(prev => ({ ...prev, [item.id]: e.target.value }))}
                          placeholder="Add a comment..."
                          className="flex-1 px-3 py-2 text-sm border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                          onKeyPress={(e) => e.key === 'Enter' && handleAddComment(item.id)}
                        />
                        <Button
                          onClick={() => handleAddComment(item.id)}
                          size="sm"
                          className="bg-amber-600 hover:bg-amber-700"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {state.items.length === 0 && (
          <Card className="p-8 bg-white text-center">
            <p className="text-stone-600">No items in the collaborative cart yet.</p>
          </Card>
        )}

        {/* Payment Split Section */}
        {state.items.length > 0 && (
          <Card className="mt-8 p-6 bg-amber-50 border-amber-200">
            <h3 className="text-lg font-semibold text-amber-900 mb-4">Payment Split Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
                Split Equally ({connectedUsers.length} people)
              </Button>
              <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
                Custom Split Amounts
              </Button>
            </div>
            <p className="text-sm text-amber-600 mt-4 text-center">
              Total: ₹{state.total.toLocaleString()} • Per person: ₹{Math.round(state.total / connectedUsers.length).toLocaleString()}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CollaborativeCart;

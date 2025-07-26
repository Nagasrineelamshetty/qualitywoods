import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import orderRoutes from './routes/orderRoutes'; // ✅ <-- added this
import auth from './routes/auth'; 
import cartRoutes from './routes/cartRoutes';

import collaborationRoutes from './routes/collaborationRoutes';


dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));
app.use(express.json());
//Login/Signup
app.use('/api/users', auth); 
//cart routes
app.use('/api/cart', cartRoutes);
app.use('/api/collab', collaborationRoutes);
// 🔁 Ollama chat route
app.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    const knowledgePath = path.join(__dirname, 'knowledge.txt');
    const systemPrompt = fs.readFileSync(knowledgePath, 'utf8');

    const payload = {
      model: "llama3",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      stream: false
    };

    const ollamaRes = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await ollamaRes.json();
    const responseText = result.message?.content;

    res.json({ response: responseText || "Sorry, I couldn't find an answer." });

  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to get response from Ollama' });
  }
});

// ✅ Add this line to use the orders route
app.use('/api/orders', orderRoutes);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server running on http://localhost:5000'));
  })
  .catch((err) => console.error(err));

import express from 'express';
import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Load system prompt from file
const systemPromptPath = path.join(__dirname, '../../knowledge.txt');
const systemPrompt = fs.readFileSync(systemPromptPath, 'utf-8');

router.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;

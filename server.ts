import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client
let aiInstance: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not defined.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiInstance;
}

// Fallback high-quality local wisdom teachings in case Gemini is not configured or fails
const LOCAL_WISDOM = [
  {
    quote: "You are not the body. You are not the mind. You are the infinite, immortal essence of consciousness itself.",
    author: "Ancient Wisdom",
    category: "Awaken"
  },
  {
    quote: "Quiet the winds of thought, and the lake of the mind becomes a mirror reflecting the eternal heavens.",
    author: "Zen Proverb",
    category: "Align"
  },
  {
    quote: "To transcend is not to escape this world, but to fully inhabit your divine nature within it.",
    author: "Spiritual Teachings",
    category: "Transcend"
  },
  {
    quote: "Breathing in, I calm body and mind. Breathing out, I smile. Dwelling in the present moment, I know this is the only moment.",
    author: "Thich Nhat Hanh",
    category: "Breathwork"
  },
  {
    quote: "The quieter you become, the more you are able to hear.",
    author: "Lao Tzu",
    category: "Meditation"
  }
];

// Endpoint: GET /api/wisdom
app.get("/api/wisdom", async (req, res) => {
  const category = (req.query.category as string) || "General";
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Provide an inspirational, premium spiritual wisdom quote or teaching related to the topic of: "${category}". It should sound ancient, deep, poetic, and highly elevated, similar to the Upanishads, Lao Tzu, or Zen masters. Keep it under 30 words. Also provide an author attribution (e.g., "Ancient Wisdom", "Zen Master", "Yogic Teachings").`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quote: { type: Type.STRING, description: "The deep, poetic wisdom quote" },
            author: { type: Type.STRING, description: "The attribution or source" }
          },
          required: ["quote", "author"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    res.json({
      quote: result.quote,
      author: result.author,
      category,
      source: "Gemini AI"
    });
  } catch (error: any) {
    // Graceful fallback if no API key or API fails
    const filtered = LOCAL_WISDOM.filter(w => w.category.toLowerCase() === category.toLowerCase());
    const fallback = filtered.length > 0 
      ? filtered[Math.floor(Math.random() * filtered.length)] 
      : LOCAL_WISDOM[Math.floor(Math.random() * LOCAL_WISDOM.length)];
    
    res.json({
      ...fallback,
      source: "Local Sanctuary"
    });
  }
});

// Endpoint: POST /api/reflect
app.post("/api/reflect", async (req, res) => {
  const { entry } = req.body;
  if (!entry || entry.trim().length === 0) {
    return res.status(400).json({ error: "Journal entry is required." });
  }

  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `As a wise, gentle, compassionate Zen Spiritual Guide, read the following private journal entry and provide a highly elevated reflection, a powerful focus mantra/word, and a simple 1-minute mindfulness task. Make the user feel completely understood, calm, and aligned. Keep the tone loving and deeply conscious.

Journal Entry:
"${entry}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reflection: { type: Type.STRING, description: "A compassionate, elevated 2-3 sentence spiritual reflection." },
            focusWord: { type: Type.STRING, description: "A powerful focus word or simple alignment mantra." },
            mindfulnessTask: { type: Type.STRING, description: "A simple, highly actionable 1-minute alignment practice." }
          },
          required: ["reflection", "focusWord", "mindfulnessTask"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    // Elegant local reflection fallback
    res.json({
      reflection: "Every thought is a ripple on the surface of the vast, quiet ocean of your consciousness. By writing down your feelings, you have already taken the first step of the observer—separating your true self from the transient waves.",
      focusWord: "Samanvaya (Harmony)",
      mindfulnessTask: "Place your hand over your heart. Take three deep, slow breaths. On each inhale, invite stillness. On each exhale, release the need to control the tide."
    });
  }
});

// Endpoint: POST /api/meditation-custom
app.post("/api/meditation-custom", async (req, res) => {
  const { focus, durationMinutes, technique } = req.body;
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Design a high-quality personalized guided meditation session based on the following preferences:
- Focus of meditation: ${focus || "inner peace and stillness"}
- Duration: ${durationMinutes || 5} minutes
- Selected technique: ${technique || "Mindful Breathing"}

Please return the meditation divided into a 3-part structured visual guide:
1. Preparation (getting into the physical posture)
2. Core Practice (step-by-step instructions for the center of the session)
3. Integration (returning to outer awareness with calm intention)

Return your response in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "An elegant, evocative title for this session." },
            preparation: { type: Type.STRING, description: "1-2 sentences on posture and settling in." },
            steps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 highly structured, atmospheric steps for the core focus of the practice."
            },
            integration: { type: Type.STRING, description: "A beautiful, concluding focus to carry into the day." }
          },
          required: ["title", "preparation", "steps", "integration"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    // Beautiful local meditation fallback
    res.json({
      title: "The Silent Forest within You",
      preparation: "Find a comfortable, upright seat. Rest your hands gently on your thighs. Let your shoulders drop, and slightly tuck your chin to lengthen your spine.",
      steps: [
        "Visualize an ancient, quiet forest. With each breath, feel the roots of your being sinking deep into the quiet earth below.",
        "Allow your thoughts to pass like birds flying through the high canopy—observed, but completely untouched.",
        "Inhale the clean, clear air of pure presence. Feel your heart center gently expanding with natural warmth."
      ],
      integration: "Gently wiggle your fingers and toes. Bring your hands to your heart. Carry this grounded, immovable peace with you into every walk of your day."
    });
  }
});

// Setup Vite Dev Server / Production Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Immortal Walks Server] Sanctuary open at http://localhost:${PORT}`);
  });
}

export default app;

if (!process.env.VERCEL) {
  startServer();
}

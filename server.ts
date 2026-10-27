import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI if key is present
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

function generateSimulatedCoachFeedback(
  tactics: any,
  opponent: string,
  ourCountry: string,
  coachName: string
): string {
  const batting = tactics?.battingStrategy || 'Aggressive Batting';
  const field = tactics?.fieldPlacement || 'Defensive Field Placement';
  const bowling = tactics?.bowlingBias || 'Pace Bias';

  return `**Tactical Verdict**: The combination of ${batting} and ${bowling} presents an assertive, high-reward blueprint against ${opponent}, though our ${field.toLowerCase()} requires disciplined execution.

**Why This Plan Succeeds**:
1. Applying ${batting.toLowerCase()} will immediately push ${opponent}'s opening bowlers off their standard hard lengths, preventing them from settling into a metronomic channel outside off stump.
2. Leaning into ${bowling} directly challenges ${opponent}'s top-order habits, generating variable bounce and forcing hurried pull shots against short-pitched deliveries.

**Key Hazard & Points of Failure**:
If ${opponent}'s middle order stabilizes after the first six overs, ${field.toLowerCase()} risks conceding uncontested singles, allowing their set batters to manipulate the strike and construct a match-defining partnership.

**Coach's Executive Recommendation**:
Instruct the bowlers to maintain tight fifth-stump corridors during the middle overs before switching to wider yorker lengths at the death.`;
}

// Tactical Feedback API endpoint
app.post('/api/tactical-feedback', async (req, res) => {
  try {
    const { tactics, opponent, ourCountry, coachName, coachSpecialty, venue, format } = req.body;

    const prompt = `You are ${coachName || 'the National Head Coach'} of ${ourCountry || 'the national team'}, a world-class international cricket tactician known for "${coachSpecialty || 'Tactical Acumen & High-Pressure Mentality'}".

The Board Chairman and Director have submitted the official tactical blueprint for our upcoming ${format || 'international'} clash against ${opponent || 'the touring squad'} at ${venue || 'our home ground'}.

Selected Team Tactical Blueprint:
- Batting Strategy: ${tactics?.battingStrategy || 'Aggressive Batting'}
- Field Placement Geometry: ${tactics?.fieldPlacement || 'Defensive Field Placement'}
- Bowling Attack Bias: ${tactics?.bowlingBias || 'Pace Bias'}
- Powerplay Risk Intent: ${tactics?.powerplayRisk || 'Measured'}
- DRS Appeal Stance: ${tactics?.drsStance || 'Cautious / Critical Only'}

Provide a rigorous, realistic simulated coach's justification structured in clean markdown:
**Tactical Verdict**: (1 sharp sentence evaluating whether this setup holds the edge or carries fatal flaws against ${opponent})
**Why This Plan Succeeds**: (2 bullet points explaining how these tactics exploit ${opponent}'s specific weaknesses and playing style)
**Key Hazards & Points of Failure**: (1-2 bullet points highlighting specific match scenarios where this plan could crumble against ${opponent})
**Coach's Executive Recommendation**: (1 actionable modification or strict in-game guideline for the captain)

Use authentic international cricket terminology (line and length, swing release, boundary sweepers, reverse swing, strike rotation, dot-ball pressure). Keep it between 160-220 words.`;

    if (ai && process.env.GEMINI_API_KEY) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      return res.json({
        feedback: response.text,
        source: 'gemini-3.8-flash',
        coachName: coachName || 'Head Coach',
      });
    }

    const simulated = generateSimulatedCoachFeedback(tactics, opponent, ourCountry, coachName);
    return res.json({
      feedback: simulated,
      source: 'simulated-expert',
      coachName: coachName || 'Head Coach',
    });
  } catch (error) {
    console.error('Gemini tactical feedback error:', error);
    const { tactics, opponent, ourCountry, coachName } = req.body;
    const simulated = generateSimulatedCoachFeedback(tactics, opponent, ourCountry, coachName);
    return res.json({
      feedback: simulated,
      source: 'simulated-fallback',
      coachName: coachName || 'Head Coach',
    });
  }
});

// Vite middleware or static serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Global Cricket Chairman Pro Server running on port ${PORT}`);
  });
}

startServer();

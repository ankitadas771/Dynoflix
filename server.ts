import express from 'express';
import cors from 'cors';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { db } from './server/db.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Healthcheck API
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'Pulse Platform', timestamp: new Date().toISOString() });
  });

  // Leads API Routes
  app.get('/api/leads', (req, res) => {
    try {
      const leads = db.getLeads();
      res.json({ success: true, count: leads.length, data: leads });
    } catch (error) {
      console.error('Error fetching leads:', error);
      res.status(500).json({ success: false, error: 'Failed to retrieve leads' });
    }
  });

  app.post('/api/leads', (req, res) => {
    try {
      const { name, email, details, budget, company, phone, serviceInterest } = req.body;

      if (!name || !email || !details || !budget) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: Name, Email, Project Details, and Budget are required.',
        });
      }

      const newLead = db.addLead({
        name,
        email,
        details,
        budget,
        company: company || '',
        phone: phone || '',
        serviceInterest: serviceInterest || 'General Inquiry',
      });

      console.log(`[Pulse DB] New lead captured: ${newLead.id} - ${newLead.name} (${newLead.email})`);
      return res.status(201).json({
        success: true,
        message: 'Lead submission saved successfully to database.',
        data: newLead,
      });
    } catch (error) {
      console.error('Error creating lead:', error);
      return res.status(500).json({ success: false, error: 'Failed to save lead submission.' });
    }
  });

  app.patch('/api/leads/:id', (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['new', 'contacted', 'scheduled', 'closed'].includes(status)) {
        return res.status(400).json({ success: false, error: 'Invalid status value' });
      }

      const updated = db.updateLeadStatus(id, status);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Lead not found' });
      }

      return res.json({ success: true, data: updated });
    } catch (error) {
      console.error('Error updating lead status:', error);
      return res.status(500).json({ success: false, error: 'Failed to update lead status' });
    }
  });

  app.delete('/api/leads/:id', (req, res) => {
    try {
      const { id } = req.params;
      const deleted = db.deleteLead(id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Lead not found' });
      }
      return res.json({ success: true, message: 'Lead deleted' });
    } catch (error) {
      console.error('Error deleting lead:', error);
      return res.status(500).json({ success: false, error: 'Failed to delete lead' });
    }
  });

  // Bookings API Routes
  app.get('/api/bookings', (req, res) => {
    try {
      const bookings = db.getBookings();
      res.json({ success: true, count: bookings.length, data: bookings });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to retrieve bookings' });
    }
  });

  app.post('/api/bookings', async (req, res) => {
    try {
      const { name, email, date, timeSlot, meetingType, company, durationMinutes, notes, web3AccessKey } = req.body;

      if (!name || !email || !date || !timeSlot || !meetingType) {
        return res.status(400).json({
          success: false,
          error: 'Missing required meeting parameters (Name, Email, Date, Time Slot, Meeting Type).',
        });
      }

      const newBooking = db.addBooking({
        name,
        email,
        date,
        timeSlot,
        meetingType,
        company: company || '',
        durationMinutes: durationMinutes || 30,
        notes: notes || '',
      });

      console.log(`[Pulse DB] New meeting scheduled: ${newBooking.id} for ${newBooking.name} on ${newBooking.date} at ${newBooking.timeSlot}`);

      // Attempt server-side Web3Forms email dispatch
      let emailDispatched = false;
      const apiKeyToUse = web3AccessKey || process.env.WEB3FORMS_ACCESS_KEY || 'a004ed0a-4a25-4c6f-a892-0b7b3b3a3c1e';
      
      try {
        const web3Res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
          body: JSON.stringify({
            access_key: apiKeyToUse,
            subject: `New Call Booking: ${meetingType} from ${name}`,
            from_name: 'Pulse Agency Calendar System',
            to_email: 'anjishnubiswasgogol@gmail.com',
            recipient_email: 'anjishnubiswasgogol@gmail.com',
            name,
            email,
            company: company || 'N/A',
            date,
            timeSlot,
            meetingType,
            agenda_notes: notes || 'None',
            message: `New Call Booking Form Submission:\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nDate: ${date}\nTime: ${timeSlot}\nMeeting Type: ${meetingType}\nAgenda Notes: ${notes || 'None'}\n\nRecipient: anjishnubiswasgogol@gmail.com`,
          }),
        });

        const rawText = await web3Res.text();
        let web3Data: any = {};
        try {
          web3Data = JSON.parse(rawText);
        } catch (parseErr) {
          console.warn('[Web3Forms Non-JSON Response]:', rawText.slice(0, 300));
        }

        console.log('[Web3Forms Email Result]', web3Data);
        if (web3Res.ok && web3Data.success) {
          emailDispatched = true;
        }
      } catch (err) {
        console.error('Server Web3Forms dispatch caught exception:', err);
      }

      return res.status(201).json({
        success: true,
        message: emailDispatched
          ? 'Meeting scheduled and confirmation email sent to anjishnubiswasgogol@gmail.com.'
          : 'Meeting saved to Admin Portal database.',
        emailDispatched,
        data: newBooking,
      });
    } catch (error) {
      console.error('Error scheduling booking:', error);
      return res.status(500).json({ success: false, error: 'Failed to schedule meeting.' });
    }
  });

  // AI Scope Estimator API Route
  app.post('/api/ai/estimate', async (req, res) => {
    try {
      const { projectType, description, budgetRange, timeline } = req.body;

      if (!description) {
        return res.status(400).json({ success: false, error: 'Project description is required.' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // High quality fallback estimation if no API key is injected
        return res.json({
          success: true,
          fallback: true,
          data: {
            summary: `High-impact technical proposal for a ${projectType || 'Software'} initiative. Based on your goals ("${description.substring(0, 100)}..."), we recommend a micro-service backend paired with a high-performance React front-end.`,
            recommendedArchitecture: [
              'React + Vite single page / SSR app shell',
              'Node.js + Express backend with cached REST & WebSockets',
              'PostgreSQL / Supabase with row-level security',
              'Tailwind CSS design system & Motion animation',
              'Dockerized deployment on Google Cloud Run',
            ],
            estimatedTimelineWeeks: timeline || '6-8 Weeks',
            suggestedPhasePlan: [
              { phase: 'Phase 1', title: 'Discovery & System Design', duration: '1-2 Weeks', details: 'Figma wireframes, database ERD, API schemas, security audit.' },
              { phase: 'Phase 2', title: 'Core MVP Development', duration: '3-4 Weeks', details: 'Front-end components, auth engine, database models, CRUD routes.' },
              { phase: 'Phase 3', title: 'AI & Performance Tuning', duration: '1-2 Weeks', details: 'Gemini integration, response caching, WCAG compliance, load testing.' },
              { phase: 'Phase 4', title: 'Deployment & Launch', duration: '1 Week', details: 'CI/CD pipeline setup, analytics, staging verification, prod release.' },
            ],
            keyRisksAndMitigations: [
              'Third-party API rate limits -> Mitigated via Redis caching & exponential backoff.',
              'Data compliance & security -> Mitigated via encrypted payloads and TLS 1.3.',
            ],
            estimatedBudgetMatch: budgetRange || '$25,000 - $50,000',
          },
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are the Principal Lead Architect at Pulse, a elite AI-powered digital agency.
Analyze the following client project request and generate a detailed structured JSON technical estimate.

Client Project Details:
- Project Type: ${projectType || 'Custom Software'}
- Description: ${description}
- Stated Budget: ${budgetRange || 'Flexible'}
- Target Timeline: ${timeline || 'Optimal'}

Return ONLY valid JSON matching this exact structure:
{
  "summary": "2-3 concise sentences detailing technical feasibility and vision.",
  "recommendedArchitecture": ["4-5 key stack components and cloud infra"],
  "estimatedTimelineWeeks": "e.g., 6-8 Weeks",
  "suggestedPhasePlan": [
    { "phase": "Phase 1", "title": "Phase Name", "duration": "1-2 Weeks", "details": "Key deliverables" },
    { "phase": "Phase 2", "title": "Phase Name", "duration": "3-4 Weeks", "details": "Key deliverables" },
    { "phase": "Phase 3", "title": "Phase Name", "duration": "1-2 Weeks", "details": "Key deliverables" }
  ],
  "keyRisksAndMitigations": ["2-3 technical risks and proactive engineering solutions"],
  "estimatedBudgetMatch": "Realistic budget bracket based on scope"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const responseText = response.text || '';
      const parsedData = JSON.parse(responseText);

      return res.json({
        success: true,
        data: parsedData,
      });
    } catch (error) {
      console.error('Error generating AI estimate:', error);
      return res.status(500).json({
        success: false,
        error: 'AI Estimation service encountered an error. Please try again.',
      });
    }
  });

  // Vite middleware for development vs static build for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`⚡ [Pulse Agency Backend] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

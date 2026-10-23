import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

const FREE_EMAIL_DOMAINS = new Set([
  'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.in', 'ymail.com',
  'outlook.com', 'outlook.in', 'hotmail.com', 'hotmail.in', 'live.com', 'live.in', 'msn.com',
  'aol.com', 'icloud.com', 'me.com', 'protonmail.com', 'proton.me',
  'gmx.com', 'gmx.net', 'mail.com', 'zoho.com', 'yandex.com', 'yandex.ru',
  'rediffmail.com', 'qq.com', '163.com', '126.com',
]);

const INTENTS = ['assessment', 'trial', 'contact', 'partner'];
const NOTIFY_EMAILS = ['mohantyanshuman21@gmail.com', 'contact@jshield.com'];

function clean(value, max) {
  return String(value || '').trim().slice(0, max);
}

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    let body = {};
    try {
      body = await req.json();
    } catch (_) {
      return Response.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const name = clean(body?.name, 120);
    const work_email = clean(body?.work_email, 160).toLowerCase();
    const intent = clean(body?.intent, 40);

    if (!name || !work_email) {
      return Response.json({ error: 'Name and work email are required' }, { status: 400 });
    }
    if (!INTENTS.includes(intent)) {
      return Response.json({ error: 'Invalid request' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(work_email)) {
      return Response.json({ error: 'Enter a valid email address.' }, { status: 400 });
    }
    if (FREE_EMAIL_DOMAINS.has(work_email.split('@')[1])) {
      return Response.json({ error: 'Please use your work email.' }, { status: 422 });
    }

    const leadData = {
      name,
      work_email,
      intent,
      company: clean(body?.company, 160),
      designation: clean(body?.designation, 120),
      company_size: clean(body?.company_size, 40),
      source_page: clean(body?.source_page, 60),
    };

    let message = clean(body?.message, 2000);
    if (intent === 'partner') {
      const partnerBits = [
        body?.partner_type ? `Partner type: ${clean(body.partner_type, 80)}` : '',
        body?.city ? `City: ${clean(body.city, 80)}` : '',
        body?.clients_served ? `Clients served: ${clean(body.clients_served, 80)}` : '',
      ].filter(Boolean);
      message = [message, ...partnerBits].filter(Boolean).join('\n');
    }
    if (message) leadData.message = message;

    if (Number.isFinite(Number(body?.readiness_score))) {
      leadData.readiness_score = Math.max(0, Math.min(100, Math.round(Number(body.readiness_score))));
    }

    const existing = await base44.asServiceRole.entities.Lead.filter({ work_email, intent });
    let lead;
    if (existing && existing.length > 0) {
      lead = await base44.asServiceRole.entities.Lead.update(existing[0].id, leadData);
    } else {
      lead = await base44.asServiceRole.entities.Lead.create(leadData);
    }

    let notified = true;
    try {
      const lines = [`Intent: ${intent}`, `Name: ${leadData.name}`, `Work email: ${leadData.work_email}`];
      if (leadData.company) lines.push(`Company: ${leadData.company}`);
      if (leadData.designation) lines.push(`Designation: ${leadData.designation}`);
      if (leadData.company_size) lines.push(`Company size: ${leadData.company_size}`);
      if (leadData.readiness_score !== undefined) lines.push(`Readiness score: ${leadData.readiness_score}`);
      if (leadData.source_page) lines.push(`Source page: ${leadData.source_page}`);
      if (leadData.message) lines.push(`Message: ${leadData.message}`);
      const subject = `New ${intent} lead: ${leadData.name}${leadData.company ? ' (' + leadData.company + ')' : ''}`;
      for (const to of NOTIFY_EMAILS) {
        await base44.asServiceRole.integrations.Core.SendEmail({
          to,
          from_name: 'JShield',
          subject,
          text: lines.join('\n'),
        });
      }
    } catch (_) {
      notified = false;
    }

    return Response.json({ ok: true, id: lead.id, notified });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
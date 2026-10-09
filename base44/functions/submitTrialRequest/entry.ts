import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

const FREE_EMAIL_DOMAINS = new Set([
  'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.in', 'ymail.com',
  'outlook.com', 'outlook.in', 'hotmail.com', 'hotmail.in', 'live.com', 'live.in', 'msn.com',
  'aol.com', 'icloud.com', 'me.com', 'protonmail.com', 'proton.me',
  'gmx.com', 'gmx.net', 'mail.com', 'zoho.com', 'yandex.com', 'yandex.ru',
  'rediffmail.com', 'qq.com', '163.com', '126.com',
]);

const SOURCES = ['Trial Page', 'Assessment'];

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    let body = {};
    try {
      body = await req.json();
    } catch (_) {
      return Response.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const full_name = String(body?.full_name || '').trim().slice(0, 120);
    const work_email = String(body?.work_email || '').trim().toLowerCase().slice(0, 120);
    const company_name = String(body?.company_name || '').trim().slice(0, 120);
    const designation = String(body?.designation || '').trim().slice(0, 120);

    if (!full_name || !work_email || !company_name || !designation) {
      return Response.json({ error: 'Full name, work email, company name and designation are required' }, { status: 400 });
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(work_email);
    if (!emailOk) {
      return Response.json({ error: 'A valid work email is required' }, { status: 400 });
    }
    const domain = work_email.split('@')[1];
    if (FREE_EMAIL_DOMAINS.has(domain)) {
      return Response.json(
        { error: 'Please use your work email. Personal email providers such as Gmail are not accepted.' },
        { status: 422 }
      );
    }

    const source = SOURCES.includes(body?.source) ? body.source : 'Trial Page';
    const leadData = { full_name, work_email, company_name, designation, source };

    if (Number.isFinite(body?.score)) {
      leadData.score = Math.max(0, Math.min(100, Math.round(body.score)));
    }
    const tier = String(body?.tier || '').slice(0, 40);
    if (tier) leadData.tier = tier;
    const summary = String(body?.summary || '').slice(0, 2000);
    if (summary) leadData.summary = summary;

    const existing = await base44.asServiceRole.entities.Lead.filter({ work_email });
    if (existing && existing.length > 0) {
      const lead = await base44.asServiceRole.entities.Lead.update(existing[0].id, leadData);
      return Response.json({ ok: true, id: lead.id, updated: true });
    }
    const lead = await base44.asServiceRole.entities.Lead.create(leadData);
    return Response.json({ ok: true, id: lead.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
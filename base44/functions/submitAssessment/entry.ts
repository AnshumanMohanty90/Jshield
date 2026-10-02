import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    let body = {};
    try {
      body = await req.json();
    } catch (_) {
      return Response.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const work_email = String(body?.work_email || '').trim().toLowerCase().slice(0, 120);
    const company_name = String(body?.company_name || '').trim().slice(0, 120);
    const designation = String(body?.designation || '').trim().slice(0, 120);

    if (!work_email || !company_name || !designation) {
      return Response.json({ error: 'Work email, company name and designation are required' }, { status: 400 });
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(work_email);
    if (!emailOk) {
      return Response.json({ error: 'A valid work email is required' }, { status: 400 });
    }

    const score = Number.isFinite(body?.score) ? Math.max(0, Math.min(100, Math.round(body.score))) : 0;
    const tier = String(body?.tier || '').slice(0, 40);
    const summary = String(body?.summary || '').slice(0, 1200);

    const lead = await base44.asServiceRole.entities.Lead.create({
      work_email,
      company_name,
      designation,
      score,
      tier,
      summary,
    });

    return Response.json({ ok: true, id: lead.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}